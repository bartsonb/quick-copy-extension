const { createFromTemplate } = require('./modules/create');

const characters = [
    'Aring',
    'AElig',
    'Oslash',
    'aring',
    'aelig',
    'oslash'
];

const DOM = {
    overlay: document.getElementsByClassName('overlay')[0],
    message: document.getElementsByClassName('overlay__message')[0],
    target: document.getElementsByClassName('char-group-wrapper')[0]
}

const templates = {
    wrapper: '<div class=\'char-group\'><p class=\'char-group__title\'>~language~</p></div>',
    character: '<button class=\'char-group__character ~code~\'>&~code~;</button>'
}

const regex = {
    localizationString: /(?<=__MSG_).*(?=__)/
}

let notify = msg => {
    DOM.message.innerHTML = msg;
    DOM.overlay.style.display = "flex";

    setTimeout(() => {
        DOM.overlay.style.opacity = 1;

        setTimeout(() => {
            window.close();
        }, 1000);
    }, 100);
}

let clickHandler = ({ target }) => {
    let character = target.innerHTML;

    target.style.background = "#3466d6";
    target.style.color = "#fff";

    navigator.clipboard.writeText(character)
        .then(() => {
            notify(character + " " + chrome.i18n.getMessage("copiedSuccessfully"));
        })
        .catch(err => {
            console.log(err)
        });
}

characters.forEach(el => {
    DOM.target.insertAdjacentElement(
        "afterbegin", 
        createFromTemplate(templates.character.replace(/~code~/g, el))
    );
});

chrome.storage.sync.set({ languages: ['no'] });


// Localization
[...document.querySelectorAll('title, p, h1, h2, h3, h4')]
    .forEach(el => {
        let match = el.innerText.match(regex.localizationString);

        if (match) {
            el.innerText = chrome.i18n.getMessage(match[0]); 
        }
    });