const { createButton } = require('./modules/create');

const characters = [
    'Aring',
    'AElig',
    'Oslash',
    'aring',
    'aelig',
    'oslash'
];

const DOM = {
    message: document.getElementById('overlay__message')[0],
    overlay: document.getElementsByClassName('overlay')[0],
    target: document.getElementsByClassName('char-group-wrapper')[0]
}

const templates = {
    wrapper: '<div class=\'char-group\'><p class=\'char-group__title\'>~language~</p></div>',
    character: '<button class=\'button char-group__character ~code~\'>&~code~;</button>'
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
            notify(character + " " + chrome.i18n.getMessage("__MSG_copiedSuccessfully__"));
        })
        .catch(err => {
            console.log(err)
        });
}

characters.forEach(el => {
    DOM.target.insertAdjacentElement("afterbegin", createButton(templates.button.replace(/~code~/g, el)));
});

chrome.storage.sync.set({ languages: ['no'] });


// Localization
[...document.querySelectorAll('title, p, h1, h2, h3, h4')]
    .filter(el => /__MSG_.__/.test(el.innerText))
    .forEach(el => { console.log(el) });