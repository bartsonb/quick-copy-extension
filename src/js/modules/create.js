const createButton = (template, eventHandler) => {
    let element = document.createElement('div');

    element.innerHTML = template.trim();
    element.firstChild.addEventListener("click", eventHandler);

    return element.firstChild;
}

module.exports = { createButton };