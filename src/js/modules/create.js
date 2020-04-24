const createFromTemplate = (template, eventHandler = null) => {
    let element = document.createElement('div');

    element.innerHTML = template.trim();
    if (eventHandler) element.firstChild.addEventListener("click", eventHandler);

    return element.firstChild;
}

module.exports = { createFromTemplate };