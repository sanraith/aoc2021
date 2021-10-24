/**
 * 
 * @param {HTMLElement} element 
 * @param {()=>void} func 
 */
function withoutTransitions(element, func) {
    element.classList.add('notransition');
    func();
    element.offsetHeight; // Trigger a reflow, flushing the CSS changes
    element.classList.remove('notransition'); // Re-enable transitions
}

function boxClick() {
    const dayBox = document.getElementById('8box');
    const dayPos = dayBox.getBoundingClientRect();
    dayBox.style.visibility = 'hidden';

    const popup = document.getElementById('popup');
    withoutTransitions(popup, () => {
        popup.style.visibility = 'visible';
        popup.style.width = dayPos.width + 'px';
        popup.style.height = dayPos.height + 'px';
        popup.style.left = dayPos.x + 'px';
        popup.style.top = dayPos.y + 'px';
    });

    popup.style.width = '400px';
    popup.style.height = '400px';
    popup.style.left = '20px';
    popup.style.top = '20px';
}

window.onload = function () {
    // init();
};