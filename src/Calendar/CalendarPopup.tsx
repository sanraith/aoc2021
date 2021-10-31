import React, { useEffect, useRef } from 'react';
import CalendarCell from './CalendarCell';
import { calendarCellId, px, getViewportSize } from './helpers';

function getPopupStyle(day: number | null, prevDay: number | null, state: 'start' | 'end'): React.CSSProperties {
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
        const { vw, vh } = getViewportSize();
        const width = 800;
        const height = 400;
        const left = (vw - width) / 2;
        const top = (vh - height) / 2;

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
    const style = getPopupStyle(day, prevDayRef.current, 'start');

    // After the initial render, turn on transitions and enlarge popup.
    useEffect(() => {
        if (!popupRef.current) { return; }
        popupRef.current.classList.remove('notransition');
        if (day) {
            popupRef.current.classList.add('open');
        } else {
            popupRef.current.classList.remove('open');
        }
        Object.assign(popupRef.current.style, getPopupStyle(day, prevDayRef.current, 'end'));
        prevDayRef.current = day;
    }, [day]);

    return (
        <div key={day} className={'popup notransition' + (day ? '' : ' open')}
            style={style} ref={popupRef} onClick={() => onClosed()}>
            <div className="popup-grid">
                <div className='popup-number'>
                    <CalendarCell day={day ?? prevDayRef.current} isCopy={true} />
                </div>
                <div className="popup-title fade">
                    The Tyranny of the Rocket Equation
                </div>
                {Array(2).fill(0).map((_, partIndex) => (<React.Fragment key={partIndex}>
                    <div className='popup-part-label fade'>
                        Part {partIndex + 1}:
                    </div>
                    <div className='popup-part-result fade'>
                        849272349
                    </div>
                    <div className='popup-part-performance fade'>
                        123 ms
                    </div>
                </React.Fragment>))}
            </div>
        </div>
    );
}
