const AI_MODE_TAB_CLASSNAME = "data-ai-mode-tab"
const AI_OVERVIEW_CLASSNAME = "data-ai-overview-div"


const hideAndMarkAITabNode = (spanElement: HTMLElement) => {

    let nthParent: HTMLElement | null = spanElement

    for (let i = 0; i < 6; i++) {
        nthParent = nthParent.parentElement
        if (!nthParent) return false;
    }

    const nPlus1thParent = nthParent.parentElement


    if (nthParent.getAttribute('role') === 'listitem' &&
        nPlus1thParent?.getAttribute('role') === 'list') {
        nthParent.style.display = 'none'
        nthParent.classList.add(AI_MODE_TAB_CLASSNAME)

        return true
    }
    return false

}

const hideAndMarkAIOverviewNode = (spanElement: HTMLElement) => {

    let nthParent: HTMLElement | null = spanElement

    for (let i = 0; i < 14; i++) {
        nthParent = nthParent.parentElement
        if (!nthParent) return false;
    }

    const nPlus1thParent = nthParent.parentElement


    if (true) {
        nthParent.style.display = 'none'
        nthParent.classList.add(AI_OVERVIEW_CLASSNAME)


        console.log("making hidden:", nthParent)
        return true
    }
    return false

}
const isAITabNode = (node: Node): node is HTMLElement => {
    return node instanceof HTMLElement && node.tagName === "SPAN" && node.innerText?.trim() ==="AI Mode"
}


const isAIOverviewNode = (node: Node): node is HTMLElement => {
    return node instanceof HTMLElement && node.tagName == "SPAN" && node.innerText?.trim() === "An AI Overview is not available for this search"
}

const observer = new MutationObserver(mutations => {
    let didHideAITabNode = false
    let didHideAIOverviewNode = false


    for (const mutation of mutations) {
        for (const addedNode of Array.from(mutation.addedNodes)) {
            if (!didHideAITabNode && isAITabNode(addedNode)) {
                didHideAITabNode = hideAndMarkAITabNode(addedNode)
            }

            if (!didHideAIOverviewNode && isAIOverviewNode(addedNode)) {
                console.log("found the cuplrit", addedNode, addedNode.textContent)
                didHideAIOverviewNode = hideAndMarkAIOverviewNode(addedNode)
            }
        }
    }



})


observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});


