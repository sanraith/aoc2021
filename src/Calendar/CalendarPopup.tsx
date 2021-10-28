import { useEffect, useRef } from 'react';
import CalendarCell from './CalendarCell';
import { calendarCellId } from './helpers';

function getPopupStyle(day: number | null, prevCellId: number | null, state: 'start' | 'end'): React.CSSProperties {
    // Skip invalid case.
    if (!day && !prevCellId) { return { visibility: 'hidden' }; }

    // If we switch between cells, pretend that we closed the previous one.
    if (day && prevCellId) { prevCellId = null; }

    const cell = document.getElementById(day ? calendarCellId(day) : calendarCellId(prevCellId!))!;
    const cellRect = cell.getBoundingClientRect();
    const isOpenDirection = state === 'start' && day || state === 'end' && prevCellId;
    if (isOpenDirection) {
        return {
            visibility: 'hidden',
            left: cellRect.x + 'px',
            top: cellRect.y + 'px',
            width: cellRect.width + 'px',
            height: cellRect.height + 'px'
        };
    } else {
        return {
            // left: '5vw',
            // top: '5vh',
            // width: '90vw',dd
            // height: '50vh',
            visibility: 'visible',
            left: Math.max(11, cellRect.x - 50) + 'px',
            top: Math.max(11, cellRect.y - 50) + 'px',
            width: cellRect.width + 100 + 'px',
            height: cellRect.height + 100 + 'px'
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
            <CalendarCell day={day ?? prevDayRef.current} isCopy={true} />
        </div>
    );
}
