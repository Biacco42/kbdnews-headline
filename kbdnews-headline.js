'use strict';

export function addHeadline() {
    const headlinesContainer = document.getElementById("headlines-container")
    const count = Array.from(headlinesContainer.children).length

    const headlineBox = document.createElement("div")
    headlineBox.setAttribute("class", "headline-box headline-out")
    headlineBox.style.transitionDelay = (3400 + 100 * count) + "ms"
    const textarea = document.createElement("textarea")
    headlineBox.appendChild(textarea)
    headlineBox.addEventListener("keyup", () => {
        updateTextareaHeight(textarea)
    })

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

    const headlineBoxies = Array.from(document.getElementById("headlines-container").children)
    headlineBoxies.forEach(element => {
        const delay = element.style.transitionDelay
        element.style.transitionDelay = "0ms"
        element.setAttribute("class", "headline-box headline-out")

        window.setTimeout(() => {
            element.style.transitionDelay = delay
        }, 1)
    });
}

export function start() {
    const headImageContainer = document.getElementById("head-image-container")
    headImageContainer.setAttribute("class", "fade-in")

    const headlineBoxies = Array.from(document.getElementById("headlines-container").children)
    headlineBoxies.forEach((element, index) => {
        element.setAttribute("class", "headline-box headline-in")
    });
}

function updateTextareaHeight(textarea) {
	let line = textarea.value.split('\n').length;
	textarea.style.height = (4.6 * line) + "vh";
}

window.addHeadline = addHeadline
window.removeHeadline = removeHeadline
window.rewind = rewind
window.start = start

window.onload = () => {
    for (let index = 0; index < 4; index++) {
        addHeadline()
    }

    window.setTimeout(() => {
        start()
    }, 10)
}
