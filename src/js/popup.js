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
    ],
    "de": [
        'szlig',
        'auml',
        'ouml',
        'uuml',
        'Auml',
        'Ouml',
        'Uuml'
    ]
}

const countryCodes = {
    "no": ['Norwegian', 'Norsk'],
    "de": ['German', 'Deutsch']
}

const DOM = {
    overlay: document.querySelector('.overlay'),
    message: document.querySelector('.overlay__message'),
    description: document.querySelector('.description'),
    target: document.querySelector('.char-group-wrapper'),
    optionsPageLink: document.querySelector('.header__options-page-link')
}

const templates = {
    characterGroup: "<div class='char-group ~language~'><p class='char-group__title'>~language~</p><div class='char-group__content'></div></div>",
    character: "<button class='char-group__content__button ~code~'>&~code~;</button>"
}

let notify = ( msg, close, duration = null ) => {
    DOM.message.innerHTML = msg;
    DOM.overlay.style.display = "flex";

    setTimeout(() => {
        DOM.overlay.style.opacity = 1;

        if (duration) setTimeout(() => { 
            if (close) window.close();

            DOM.overlay.style.opacity = 0;
        }, duration);
    }, 30);
}

let clickHandler = ({ target }) => {
    let character = target.innerHTML;

    target.style.background = "#3466d6";
    target.style.color = "#fff";

    navigator.clipboard.writeText(character)
        .then(() => {
            notify(character + " " + chrome.i18n.getMessage("copiedSuccessfully"), false, 1000);
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
chrome.storage.sync.set({ selectedLanguages: ["de", "no"] });

chrome.storage.sync.get(['selectedLanguages'], ({ selectedLanguages }) => {
    if (selectedLanguages) {
        selectedLanguages.forEach(lang => {
            let [ language ] = countryCodes[lang];

            DOM.target.insertAdjacentElement(
                "beforeEnd", 
                createFromTemplate(templates.characterGroup.replace(/~language~/g, language))
            );

            characters[lang].map(char => {
                document.querySelector(`.char-group.${language} > .char-group__content`).insertAdjacentElement(
                    "afterBegin", 
                    createFromTemplate(templates.character.replace(/~code~/g, char), clickHandler)
                );
            });
        });
    } else {
        DOM.description.innerText = "Please select a language in the configuration page.";
    }
});