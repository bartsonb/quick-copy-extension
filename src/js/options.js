const characterList = require('../../assets/characters/characters');
const { createFromTemplate } = require('./modules/create');
require('./modules/localize').localize();

const templates = {
    checkbox: '<label class="options__form__input"><input type="checkbox" name="~countryCode~" data-code="~countryCode~" value="~countryCode~" ~checked~>~language~</label>'
}

const DOM = {
    form: document.querySelector('.options__form'),
    formMessage: document.querySelector('.options__form__message')
}

chrome.storage.sync.get(['selectedLanguages'], ({ selectedLanguages }) => {
    if (selectedLanguages) {
        for (let countryCode in characterList) {     
            DOM.form.insertAdjacentElement(
                "afterBegin", 
                createFromTemplate(
                    templates.checkbox
                        .replace(/~countryCode~/g, countryCode)
                        .replace(/~language~/g, characterList[countryCode].language)
                        .replace(/~checked~/g, selectedLanguages.includes(countryCode) ? 'checked' : '')
                )
            );
        }
    }
});

DOM.form.addEventListener("submit", (event) => {
    event.preventDefault();
    let checkedLanguages = [];

    [...document.querySelectorAll('.options__form__input > input')].forEach((el) => {
        if (el.checked) checkedLanguages.push(el.value);
    });

    chrome.storage.sync.set({ selectedLanguages: checkedLanguages });

    DOM.formMessage.innerHTML = chrome.i18n.getMessage("optionsPageSaved");
    DOM.formMessage.style.display = "inline";
    
    setTimeout(() =>  {
        DOM.formMessage.style.transform = "translateY(-25px)";
        DOM.formMessage.style.opacity = 1;

        setTimeout(() => { window.close() }, 2000);
    }, 30)
});
