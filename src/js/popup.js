const { createFromTemplate } = require('./modules/create');
require('./modules/localize').localize();

const characters = {
    "no": [
        'Aring',
        'AElig',
        'Oslash',
        'aring',
        'aelig',
        'oslash'
    ]
}

const countryCodes = {
    "no": "Norwegian"
}

const DOM = {
    overlay: document.querySelector('.overlay'),
    message: document.querySelector('.overlay__message'),
    description: document.querySelector('.description'),
    target: document.querySelector('.char-group-wrapper'),
    optionsPageLink: document.querySelector('.header__options-page-link')
}

const templates = {
    wrapper: '<div class=\'char-group\'><p class=\'char-group__title\'>~language~</p></div>',
    character: '<button class=\'char-group__character ~code~\'>&~code~;</button>'
}

let notify = ( msg, duration = null ) => {
    DOM.message.innerHTML = msg;
    DOM.overlay.style.display = "flex";

    setTimeout(() => {
        DOM.overlay.style.opacity = 1;

        if (duration) setTimeout(() => { window.close() }, duration);
    }, 30);
}

let clickHandler = ({ target }) => {
    let character = target.innerHTML;

    target.style.background = "#3466d6";
    target.style.color = "#fff";

    navigator.clipboard.writeText(character)
        .then(() => {
            notify(character + " " + chrome.i18n.getMessage("copiedSuccessfully"), 1000);
        })
        .catch(err => {
            console.log(err)
        });
}

// Event Listener
DOM.optionsPageLink.addEventListener("click", () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('/dist/html/options.html'));
    }
});

// Build Page
chrome.storage.sync.set({ selectedLanguages: null });

chrome.storage.sync.get(['selectedLanguages'], ({ selectedLanguages }) => {
    if (selectedLanguages) {
        selectedLanguages.forEach(lang => {
            let wrapper = createFromTemplate(templates.wrapper);
    
            characters[lang].forEach(char => {
                wrapper.insertAdjacentElement(
                    "afterbegin", 
                    createFromTemplate(templates.character.replace(/~code~/g, char))
                );
            });
    
            DOM.target.insertAdjacentElement("afterend", wrapper);
        });
    } else {
        DOM.description.innerText = "Please select a language in the configuration page.";
    }
});