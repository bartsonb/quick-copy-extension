/*
let characters = [
    'Aring',
    'AElig',
    'Oslash',
    'aring', 
    'aelig',
    'oslash'
];

let target = document.getElementsByClassName('characters')[0];
let template = '<button class=\'button character ~code~\'>&~code~;</button>';

let createButton = (template) => {
    let element = document.createElement('button');

    element.innerHTML = template.trim();
    element.addEventListener("click", clickHandler);

    return element.firstChild;
}

characters.forEach(el => {
    target.insertAdjacentElement("afterbegin", createButton(template.replace(/~code~/g, el)));
});
*/

let description = document.getElementById('description');
let message = document.getElementById('message');
let overlay = document.getElementsByClassName('overlay')[0];

let notify = msg => {
    message.innerHTML = msg;
    overlay.style.display = "flex";

    setTimeout(() => {
        overlay.style.opacity = 1;

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

[...document.getElementsByClassName('character')].forEach(char => char.addEventListener('click', clickHandler));

description.innerHTML = chrome.i18n.getMessage("popup_description");