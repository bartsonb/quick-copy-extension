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
    description: document.getElementById('description')[0],
    message: document.getElementById('overlay__message')[0],
    overlay: document.getElementsByClassName('overlay')[0],
    target: document.getElementsByClassName('char-group')[0]
}

const templates = {
    wrapper: '<div class=\'char-group\'><p class=\'chargroup__title\'></p></div>',
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
            notify(character + " " + chrome.i18n.getMessage("copied_successfully"));
        })
        .catch(err => {
            console.log(err)
        });
}

characters.forEach(el => {
    DOM.target.insertAdjacentElement("afterbegin", createButton(templates.button.replace(/~code~/g, el)));
});

DOM.description.innerHTML = chrome.i18n.getMessage("popup_description");