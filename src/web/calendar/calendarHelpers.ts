import { get2DigitDay } from '../../core/helpers';

export function calendarCellId(dayNumber: number): string {
    return `cd${dayNumber}`;
}

export function getViewportSize(): { vw: number, vh: number; } {
    const vw = document.documentElement.clientWidth ?? window.innerWidth ?? 0;
    const vh = document.documentElement.clientHeight ?? window.innerHeight ?? 0;

    return { vw, vh };
}

export function px(x: number): string {
    return x + 'px';
}

export function getPopupRect(
    day: number,
    state: 'closed' | 'opened',
    popupGrid: HTMLDivElement
): React.CSSProperties {
    const cellId = calendarCellId(day);
    const cell = document.getElementById(cellId) as HTMLDivElement;
    const cellRect = cell.getBoundingClientRect();
    if (state === 'closed') {
        return {
            left: px(cellRect.x + window.pageXOffset),
            top: px(cellRect.y + window.pageYOffset),
            width: px(cellRect.width),
            height: px(cellRect.height)
        };
    } else {
        const popupGridMargin = parseInt(getComputedStyle(popupGrid).getPropertyValue('--margin')?.match(/\d+/g)![0]);
        const popupGridRect = popupGrid.getBoundingClientRect();
        const { vw/*, vh*/ } = getViewportSize();
        const width = popupGridRect.width + 2 * popupGridMargin;
        const height = popupGridRect.height + 2 * popupGridMargin;
        const left = (vw - width) / 2;
        const top = 200; //(vh - height) / 2;

        return {
            width: px(width),
            height: px(height),
            left: px(left),
            top: px(top)
        };
    }
}

export function openPuzzleDescriptionInNewTab(day: number | null): void {
    if (!day) { return; }
    window.open(`https://adventofcode.com/2021/day/${day}`);
}

export function openSourceCodeInNewTab(day: number | null): void {
    if (!day) { return; }
    window.open(`https://github.com/sanraith/aoc2021/blob/main/src/solutions/day${get2DigitDay(day)}.ts`);
}

export type EventDay = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
