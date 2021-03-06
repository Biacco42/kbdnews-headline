'use strict';

let edit = true

export function addHeadline(title) {
    if (!edit) {
        return
    }

    const headlinesContainer = document.getElementById("headlines-container")
    const count = Array.from(headlinesContainer.children).length

    const headlineContainer = document.createElement("div")
    const scaleFactor = count + 2
    headlineContainer.style.transitionDelay = (1400 + 12 * (scaleFactor * scaleFactor)) + "ms"

    const headlineBox = document.createElement("div")
    headlineBox.setAttribute("class", "headline-box")

    const textarea = document.createElement("textarea")
    textarea.value = title
    textarea.setAttribute("spellcheck", "false")
    headlineBox.appendChild(textarea)
    updateTextareaHeight(textarea)
    headlineBox.addEventListener("keyup", () => {
        updateTextareaHeight(textarea)
    })

    headlineContainer.appendChild(headlineBox)

    headlinesContainer.appendChild(headlineContainer)
}

export function removeHeadline() {
    if (!edit) {
        return
    }

    const headlinesContainer = document.getElementById("headlines-container")
    const lastElement = headlinesContainer.lastElementChild
    headlinesContainer.removeChild(lastElement)
}

export function reset() {
    editModeSwitch(false)

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

    storeToQuery()
}

export function editMode() {
    editModeSwitch(true)
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

function editModeSwitch(mode) {
    edit = mode

    const editModeIndicator = document.getElementById("edit-mode-indicator")
    if (edit) {
        editModeIndicator.style.opacity = 1
    } else {
        editModeIndicator.style.opacity = 0
    }
}

function storeToQuery() {
    const headlineContainers = Array.from(document.getElementById("headlines-container").children)

    const queryObject = {}
    queryObject.titles = headlineContainers.map((headlineContainer) => {
        return headlineContainer.lastElementChild.lastElementChild.value
    }).join()

    const query = new URLSearchParams(queryObject)
    const queryString = query.toString()
    const newURL = queryString === "" ? "/" : "?" + queryString
    history.pushState(null, "Keyboard News Headlines", newURL)
}

function perseQueryToSetup() {
    const editState = edit
    edit = true

    const headlinesContainer = document.getElementById("headlines-container")
    while (headlinesContainer.firstChild) {
        headlinesContainer.removeChild(headlinesContainer.firstChild)
    }

    const params = new URLSearchParams(window.location.search)

    if (params.has("titles")) {
        const titles = params.get("titles").split(",")
        titles.forEach((title) => { addHeadline(title) })
    } else {
        for (let index = 0; index < 4; index++) {
            addHeadline("")
        }
    }

    edit = editState
}

window.addHeadline = addHeadline
window.removeHeadline = removeHeadline
window.reset = reset
window.editMode = editMode
window.start = start

window.onload = () => {
    editModeSwitch(true)
    perseQueryToSetup()
}

window.onpopstate = () => {
    perseQueryToSetup()
}

document.addEventListener("keydown", (event) => {
    const targetTag = event.target.tagName.toLowerCase()
    if (targetTag == "input" || targetTag == "textarea") {
        return
    }

    if ("0123456789".includes(event.key)) {
        const index = parseInt(event.key) - 1

        const headlineContainers = Array.from(document.getElementById("headlines-container").children)

        if (0 <= index && index < headlineContainers.length) {
            const currentFocusOn = headlineContainers[index].lastElementChild.classList.contains("headline-box-focus")

            headlineContainers.forEach((headlineContainer, idx) => {
                const headlineBox = headlineContainer.lastElementChild

                if (idx == index) {
                    if (currentFocusOn) {
                        headlineBox.setAttribute("class", "headline-box")
                        window.setTimeout(() => { headlineContainer.style.zIndex = 0 }, 200)
                    } else {
                        window.setTimeout(() => {
                            headlineContainer.style.zIndex = 10
                            headlineBox.setAttribute("class", "headline-box headline-box-focus")
                        }, 200)
                    }
                } else {
                    const defocusClass = currentFocusOn ? "headline-box" : "headline-box headline-box-nonfocus"
                    headlineBox.setAttribute("class", defocusClass)
                    window.setTimeout(() => { headlineContainer.style.zIndex = 0 }, 200)
                }
            })
        } else {
            headlineContainers.forEach((headlineContainer) => {
                const headlineBox = headlineContainer.lastElementChild
                headlineBox.setAttribute("class", "headline-box")
                window.setTimeout(() => { headlineContainer.style.zIndex = 0 }, 300)
            })
        }
    } else if (event.key == "a") {
        addHeadline("")
    } else if (event.key == "d") {
        removeHeadline()
    } else if (event.key == "w") {
        storeToQuery()
    } else if (event.key == "r") {
        reset()
    } else if (event.key == "e") {
        editMode()
    } else if (event.key == "s") {
        start()
    }
})
