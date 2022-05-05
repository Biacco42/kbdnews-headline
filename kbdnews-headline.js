'use strict';

export function addHeadline() {
    const headlineBox = document.createElement("div")
    headlineBox.setAttribute("class", "headline-box")
    headlineBox.appendChild(document.createElement("textarea"))

    const headlinesContainer = document.getElementById("headlines-container")
    headlinesContainer.appendChild(headlineBox)
}

export function removeHeadline() {
    const headlinesContainer = document.getElementById("headlines-container")
    const lastElement = headlinesContainer.lastElementChild
    headlinesContainer.removeChild(lastElement)
}

window.addHeadline = addHeadline
window.removeHeadline = removeHeadline
