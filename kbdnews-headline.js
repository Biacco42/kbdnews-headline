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

export function rewind() {
    const headImageContainer = document.getElementById("head-image-container")
    headImageContainer.setAttribute("class", "opacity-0")
}

export function start() {
    const headImageContainer = document.getElementById("head-image-container")
    headImageContainer.setAttribute("class", "opacity-100")
}

window.addHeadline = addHeadline
window.removeHeadline = removeHeadline
window.rewind = rewind
window.start = start
