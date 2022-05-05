'use strict';

export function addHeadline() {
    const headlineBox = document.createElement("div")
    headlineBox.setAttribute("class", "headline-box")
    const textarea = document.createElement("textarea")
    headlineBox.appendChild(textarea)
    headlineBox.addEventListener("keyup", () => {
        updateTextareaHeight(textarea)
    })

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
    headImageContainer.setAttribute("class", "fade-in")
}

function updateTextareaHeight(textarea) {
	let line = textarea.value.split('\n').length;
	textarea.style.height = (4.6 * line) + "vh";
}

window.addHeadline = addHeadline
window.removeHeadline = removeHeadline
window.rewind = rewind
window.start = start
