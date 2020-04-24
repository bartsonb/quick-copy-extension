const localizationString = /(?<=__MSG_).*(?=__)/;
const query = 'title, p, h1, h2, h3, h4';

const localize = () => {
    [...document.querySelectorAll(query)]
    .forEach(el => {
        let match = el.innerText.match(localizationString);

        if (match) el.innerText = chrome.i18n.getMessage(match[0]); 
    });
};

module.exports = { localize };