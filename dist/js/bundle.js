(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const createButton = (template, eventHandler) => {
    let element = document.createElement('div');

    element.innerHTML = template.trim();
    element.firstChild.addEventListener("click", eventHandler);

    return element.firstChild;
}

module.exports = { createButton };
},{}],2:[function(require,module,exports){
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
},{"./modules/create":1}]},{},[2]);
