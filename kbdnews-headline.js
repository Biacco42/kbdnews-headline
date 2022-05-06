'use strict';

export function addHeadline() {
    const headlinesContainer = document.getElementById("headlines-container")
    const count = Array.from(headlinesContainer.children).length

    const headlineContainer = document.createElement("div")
    const scaleFactor = count + 2
    headlineContainer.style.transitionDelay = (1400 + 12 * (scaleFactor * scaleFactor)) + "ms"

    const headlineBox = document.createElement("div")
    headlineBox.setAttribute("class", "headline-box")

    const textarea = document.createElement("textarea")
    textarea.setAttribute("spellcheck", "false")
    headlineBox.appendChild(textarea)
    headlineBox.addEventListener("keyup", () => {
        updateTextareaHeight(textarea)
    })

    headlineContainer.appendChild(headlineBox)

    headlinesContainer.appendChild(headlineContainer)
}

export function removeHeadline() {
    const headlinesContainer = document.getElementById("headlines-container")
    const lastElement = headlinesContainer.lastElementChild
    headlinesContainer.removeChild(lastElement)
}

export function rewind() {
    const headImageContainer = document.getElementById("head-image-container")
    headImageContainer.setAttribute("class", "opacity-0")

    const headlineContainers = Array.from(document.getElementById("headlines-container").children)
    headlineContainers.forEach(headlineContainer => {
        const delay = headlineContainer.style.transitionDelay
        headlineContainer.style.transitionDelay = "0ms"
        headlineContainer.setAttribute("class", "headline-out")
        headlineContainer.firstElementChild.setAttribute("class", "headline-box")

        window.setTimeout(() => {
            headlineContainer.style.transitionDelay = delay
        }, 20)
    });
}

export function start() {
    const headImageContainer = document.getElementById("head-image-container")
    headImageContainer.setAttribute("class", "fade-in")

    const headlineContainers = Array.from(document.getElementById("headlines-container").children)
    headlineContainers.forEach((element) => {
        element.setAttribute("class", "headline-in")
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
    }, 20)
}

document.addEventListener("keydown", (event) => {
    const targetTag = event.target.tagName.toLowerCase()
    if (targetTag == "input" || targetTag == "textarea") {
        return
    }

    if ("0123456789".includes(event.key)) {
        const index = parseInt(event.key) - 1

        const headlineBoxies =
            Array.from(document.getElementById("headlines-container").children)
                .map((container) => { return container.lastElementChild })

        if (0 <= index && index < headlineBoxies.length) {
            const focusTarget = headlineBoxies[index]
            const focused = focusTarget.classList.contains("headline-box-focus")

            headlineBoxies.forEach((headlineBox) => {
                headlineBox.setAttribute("class", "headline-box")
            })

            if (!focused) {
                focusTarget.setAttribute("class", "headline-box headline-box-focus")
            }
        } else {
            headlineBoxies.forEach((headlineBox) => {
                headlineBox.setAttribute("class", "headline-box")
            })
        }
    } else if (event.key == "a") {
        addHeadline()
    } else if (event.key == "d") {
        removeHeadline()
    } else if (event.key == "r") {
        rewind()
    } else if (event.key == "s") {
        start()
    }
})
