import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function calendarCellId(dayNumber: number) { return `cd${dayNumber}`; }

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
            visibility: 'visible',
            left: Math.max(11, cellRect.x - 50) + 'px',
            top: Math.max(11, cellRect.y - 50) + 'px',
            width: cellRect.width + 100 + 'px',
            height: cellRect.height + 100 + 'px'
        };
    }
}

interface CalendarCellProps {
    day?: number | null;
    isCopy?: boolean;
    isBig?: boolean;
    onCellClick?: (day: number) => void;
}
function CalendarCell({ day, isCopy, isBig, onCellClick }: CalendarCellProps) {
    if (day && day >= 1 && day <= 31) {
        const cellId = calendarCellId(day);
        return (
            <div id={(isCopy ? 'copy' : '') + cellId}
                className={'calendarCol' + (isCopy ? ' copy' : '') + (isBig ? ' big' : '')}
                onClick={() => onCellClick && onCellClick(day)}
            >
                <span>{day}</span>
            </div>
        );
    } else {
        return (<div className="calendarCol gray"><span></span></div>);
    }
}

interface PopupProps {
    day: number | null;
    onClosed: () => void;
}
function Popup({ day, onClosed }: PopupProps) {
    const prevDayRef = useRef<number | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const style = getPopupStyle(day, prevDayRef.current, 'start');

    // After the initial render, turn on transitions and enlarge popup.
    useEffect(() => {
        if (!popupRef.current) { return; }
        popupRef.current.classList.remove('notransition');
        if (day) {
            popupRef.current.classList.add('big');
        } else {
            popupRef.current.classList.remove('big');
        }
        Object.assign(popupRef.current.style, getPopupStyle(day, prevDayRef.current, 'end'));
        prevDayRef.current = day;
    }, [day]);

    return (
        <div key={day} className={'popup notransition' + (day ? '' : ' big')}
            style={style} ref={popupRef} onClick={() => onClosed()}>
            <CalendarCell day={day ?? prevDayRef.current} isCopy={true} />
        </div>
    );
}

function Calendar() {
    const rows = Array(5).fill(0).map((_, i) => Array(7).fill(0).map((_, j) => i * 7 + j - 1));
    const [openedDay, setOpenedCell] = useState<number | null>(null);
    const onCellClick = (day: number) => setOpenedCell(openedDay === day ? null : day);

    return (<React.Fragment>
        <Popup day={openedDay} onClosed={() => setOpenedCell(null)} />
        <div className="calendar">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map(day =>
                        (<CalendarCell key={day} day={day} onCellClick={day => onCellClick(day)} />)
                    )}
                </div>
            ))}
        </div>
    </React.Fragment>);
}

function App(): JSX.Element {
    return (
        <div className="App">
            <Calendar />
        </div>
    );
}

export default App;
