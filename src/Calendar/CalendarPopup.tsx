import React, { useEffect, useRef } from 'react';
import CalendarCell from './CalendarCell';
import { calendarCellId, px, getViewportSize } from './helpers';

function getPopupStyle(
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

interface PopupProps {
    day: number | null;
    onClosed: () => void;
}

export default function CalendarPopup({ day, onClosed }: PopupProps): JSX.Element {
    const prevDayRef = useRef<number | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const popupGridRef = useRef<HTMLDivElement>(null);
    const style = getPopupStyle(day, prevDayRef.current, 'start', popupGridRef.current);

    // After the initial render, turn on transitions and enlarge popup.
    useEffect(() => {
        if (!popupRef.current) { return; }
        popupRef.current.classList.remove('notransition');
        if (day) {
            popupRef.current.classList.add('open');
        } else {
            popupRef.current.classList.remove('open');
        }
        Object.assign(popupRef.current.style, getPopupStyle(day, prevDayRef.current, 'end', popupGridRef.current));
        prevDayRef.current = day;
    }, [day]);

    // Close popup when user clicks outside or an empty inside area
    useEffect(() => {
        if (!day) { return; }

        function onDocumentClick(e: MouseEvent) {
            const isOutsideClick = !(popupRef.current?.contains(e.target as Node) ?? false);
            const isEmptyInsideClick = e.target === popupRef.current || e.target === popupGridRef.current;
            const isSelectionEvent = !!window.getSelection()?.toString();
            if (!isSelectionEvent && (isOutsideClick || isEmptyInsideClick)) {
                onClosed();
            }
        }
        document.addEventListener('click', onDocumentClick);
        return () => document.removeEventListener('click', onDocumentClick);
    }, [day, onClosed]);

    return (
        <div key={day} ref={popupRef} className={'popup notransition' + (day ? '' : ' open')} style={style}>
            <div ref={popupGridRef} className='popup-grid'>
                <div className='popup-number'>
                    <CalendarCell day={day ?? prevDayRef.current} isCopy={true} />
                </div>
                <div className='popup-title fade'>
                    The Tyranny of the Rocket Equation
                </div>
                <div className='spacer'></div>

                {Array(2).fill(0).map((_, partIndex) => (<React.Fragment key={partIndex}>
                    <div className='popup-part-label fade'>
                        Part {partIndex + 1}:
                    </div>
                    <div className='popup-part-result fade'>
                        849272349
                    </div>
                    <div className='popup-part-performance fade'>
                        123 ms 🕑
                    </div>
                </React.Fragment>))}

                <div style={{ height: '10px' }}></div>
                <div className='popup-part-footer fade'>
                    <div className='collapsible'>
                        <button className='secondary'><span>💽</span> Input</button>
                        <button className='secondary'><span>💻</span> Source</button>
                        <button className='secondary'><span>📜</span> Puzzle</button>
                    </div>
                    <button className='primary'>Solve 📈</button >
                </div>
            </div>
        </div>
    );
}
