import { useEffect, useRef } from 'react';
import CalendarCell from './CalendarCell';
import { calendarCellId } from './helpers';

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
            left: cellRect.x + 'px',
            top: cellRect.y + 'px',
            width: cellRect.width + 'px',
            height: cellRect.height + 'px'
        };
    } else {
        return {
            visibility: 'visible',
            left: '5vw',
            top: '5vh',
            height: '90vh',
            maxHeight: '90vh',
            width: '90vw',
            maxWidth: '90vw',
            // width: '90vw',
            // height: '50vh',
            // left: Math.max(11, cellRect.x - 50) + 'px',
            // top: Math.max(11, cellRect.y - 50) + 'px',
            // width: cellRect.width + 100 + 'px',
            // height: cellRect.height + 100 + 'px'
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
