export function calendarCellId(dayNumber: number): string {
    return `cd${dayNumber}`;
}

export function getViewportSize(): { vw: number, vh: number; } {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    return { vw, vh };
}

export function px(x: number): string {
    return x + 'px';
}
