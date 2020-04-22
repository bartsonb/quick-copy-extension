const characters = [
    'Aring',
    'AElig',
    'Oslash',
    'aring', 
    'aelig',
    'oslash'
];

const DOM = {
    message: document.getElementById('message'),
    description: document.getElementById('description'),
    overlay: document.getElementsByClassName('overlay')[0],
    target: document.getElementsByClassName('characters')[0]
}

const template = '<button class=\'button character ~code~\'>&~code~;</button>';

let createButton = (template) => {
    let element = document.createElement('button');

    element.innerHTML = template.trim();
    element.firstChild.addEventListener("click", clickHandler);

    return element.firstChild;
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
    DOM.target.insertAdjacentElement("afterbegin", createButton(template.replace(/~code~/g, el)));
});

DOM.description.innerHTML = chrome.i18n.getMessage("popup_description");