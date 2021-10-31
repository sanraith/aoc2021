/**
 * Turns off style transitions for the given element for the duration of the given func.
 * @param {HTMLElement} element 
 * @param {(element: HTMLElement) => void} func 
 */
function withoutTransition(element, func) {
    element.classList.add('notransition');
    func(element);
    element.offsetHeight; // Trigger a reflow, flushing the CSS changes
    element.classList.remove('notransition'); // Re-enable transitions
}

/**
 * Waits until transitions for the given style changes have ended on the given element, 
 * provided that each change triggered a transition.
 * @param {HTMLElement} element 
 * @param {CSSStyleDeclaration} styleChanges 
 * @param {number} timeout 
 * @returns {Promise<void>}
 */
function styleTransitionAsync(element, styleChanges, timeout = 5000) {
    return new Promise((resolve, reject) => {
        let transitionCount = Object.keys(styleChanges).length;

        /** @param {TransitionEvent} event */
        function onTransition(event) {
            if (--transitionCount > 0) { return; }
            element.removeEventListener('transitionend', onTransition, false);
            resolve();
        }
        element.addEventListener('transitionend', onTransition);

        Object.assign(element.style, styleChanges);

        setTimeout(() => {
            if (transitionCount === 0) { return; }
            element.removeEventListener('transitionend', onTransition, false);
            reject(`Transition did not end after ${timeout} millis.`);
        }, timeout);
    });
}

function viewPortSize() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    return { vw, vh };
}

function px(x) {
    return x + 'px';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function openPopup() {
    const dayBox = document.getElementById('8box');
    const dayPos = dayBox.getBoundingClientRect();
    dayBox.style.visibility = 'hidden';

    const popup = document.getElementById('popup');
    withoutTransition(popup, () => {
        popup.style.visibility = 'visible';
        popup.style.width = dayPos.width - 2 + 'px';
        popup.style.height = dayPos.height - 2 + 'px';
        popup.style.left = dayPos.x + 'px';
        popup.style.top = dayPos.y + 'px';
    });
    popup.getElementsByClassName('col2')[0].classList.add('big');

    const { vw, vh } = viewPortSize();
    const width = vw / 2;
    const height = vh / 2;

    const left = (vw - width) / 2;
    const top = (vh - height) / 2;


    await styleTransitionAsync(popup, {
        width: px(width),
        height: px(height),
        left: px(left),
        top: px(top),
        borderRadius: '15px'
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function closePopup() {
    const dayBox = document.getElementById('8box');
    const dayPos = dayBox.getBoundingClientRect();
    const popup = document.getElementById('popup');
    popup.style.width = dayPos.width - 2 + 'px';
    popup.style.height = dayPos.height - 2 + 'px';
    popup.style.left = dayPos.x + 'px';
    popup.style.top = dayPos.y + 'px';
    popup.style.visibility = 'hidden';
    popup.getElementsByClassName('col2')[0].classList.remove('big');
    dayBox.style.visibility = 'visible';
}

window.onload = function () {
    openPopup();
};