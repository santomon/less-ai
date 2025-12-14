const AI_MODE_TAB_CLASSNAME = "data-ai-mode-tab"


const hideAndMarkAITabNode = (spanElement: HTMLElement) => {

    let nthParent: HTMLElement | null = spanElement

    for (let i = 0; i < 6; i++) {
        nthParent = nthParent.parentElement
        if (!nthParent) return false;
    }

    const nPlus1thParent = nthParent.parentElement


    if (nthParent.getAttribute('role') === 'listitem' &&
        nPlus1thParent?.getAttribute('role') === 'list') {
        nthParent.hidden = true;
        nthParent.classList.add(AI_MODE_TAB_CLASSNAME)

        return true
    }
    return false

}

const isSearchedNode = (node: Node): node is HTMLElement => {
    return node instanceof HTMLElement && node.tagName === "SPAN" && node.textContent?.trim().includes("AI Mode")
}

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const addedNode of Array.from(mutation.addedNodes)) {
            if (isSearchedNode(addedNode)) {
                const didHideNode = hideAndMarkAITabNode(addedNode)
                if (didHideNode) {
                    return
                };
            }
        }
    }



})


observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});


