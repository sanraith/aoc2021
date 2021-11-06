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

export function getPopupStyle(
    day: number | null, prevDay: number | null, state: 'start' | 'end',
    popupGrid: HTMLDivElement | null
): React.CSSProperties {
    // Skip invalid case.
    if (!day && !prevDay) { return { visibility: 'hidden' }; }

    // If we switch between cells, pretend that we closed the previous one.
    if (day && prevDay) { prevDay = null; }

    const cellId = day ? calendarCellId(day) : calendarCellId(prevDay as number);
    const cell = document.getElementById(cellId) as HTMLDivElement;
    const cellRect = cell.getBoundingClientRect();
    const isOpenDirection = state === 'start' && day || state === 'end' && prevDay;
    if (isOpenDirection) {
        return {
            visibility: 'hidden',
            left: px(cellRect.x),
            top: px(cellRect.y),
            width: px(cellRect.width),
            height: px(cellRect.height)
        };
    } else {
        if (!popupGrid) {
            console.log('This should not have happened...');
            return {};
        }

        const popupGridMargin = parseInt(getComputedStyle(popupGrid).getPropertyValue('--margin')?.match(/\d+/g)![0]);
        const popupGridRect = popupGrid.getBoundingClientRect();
        const { vw/*, vh*/ } = getViewportSize();
        const width = popupGridRect.width + 2 * popupGridMargin;
        const height = popupGridRect.height + 2 * popupGridMargin;
        const left = (vw - width) / 2;
        const top = 100;//(vh - height) / 2;

        return {
            visibility: 'visible',
            width: px(width),
            height: px(height),
            left: px(left),
            top: px(top)
        };
    }
}

export function openPuzzleDescriptionInNewTab(day: number | null): void {
    if (!day) { return; }
    window.open(`https://adventofcode.com/2020/day/${day}`);
}

export function openSourceCodeInNewTab(day: number | null): void {
    if (!day) { return; }
    window.open(`https://github.com/sanraith/aoc2021/blob/dev/src/solutions/day${day?.toString().padStart(2, '0')}.ts`);
}