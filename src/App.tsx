import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function calendarCellId(dayNumber: number) { return `cd${dayNumber}`; }

interface PopupProps {
    cellId: string | null;
    onClosed: () => void;
}

function getPopupStyle(cellId: string | null, prevCellId: string | null, state: 'start' | 'end'): React.CSSProperties {
    // Skip invalid case.
    if (!cellId && !prevCellId) { return { visibility: 'hidden' }; }

    // If we switch between cells, pretend that we closed the previous one.
    if (cellId && prevCellId) { prevCellId = null; }

    const cell = document.getElementById(cellId ? cellId : prevCellId!)!;
    const cellRect = cell.getBoundingClientRect();
    const isOpenDirection = state === 'start' && cellId || state === 'end' && prevCellId;
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

function Popup({ cellId, onClosed }: PopupProps) {
    const prevCellIdRef = useRef<string | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const style = getPopupStyle(cellId, prevCellIdRef.current, 'start');

    // After the initial render, turn on transitions and enlarge popup.
    useEffect(() => {
        if (!popupRef.current) { return; }
        popupRef.current.classList.remove('notransition');
        Object.assign(popupRef.current.style, getPopupStyle(cellId, prevCellIdRef.current, 'end'));
        prevCellIdRef.current = cellId;
    }, [cellId]);

    return (
        <div key={cellId} className='popup notransition' style={style} ref={popupRef} onClick={() => onClosed()}>
            alma
        </div>
    );
}

function Calendar() {
    const rows = Array(5).fill(0).map((_, i) =>
        Array(7).fill(0).map((_, j) => i * 7 + j - 1));

    const [openedCell, setOpenedCell] = useState<string | null>(null);

    const onCellClick = (cellId: string) => setOpenedCell(openedCell === cellId ? null : cellId);

    return (<React.Fragment>
        <Popup cellId={openedCell} onClosed={() => setOpenedCell(null)} />
        <div className="calendar">
            {rows.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map(col => {
                        if (col >= 1 && col <= 31) {
                            return (
                                <div id={calendarCellId(col)} className="col" key={col}
                                    onClick={() => onCellClick(calendarCellId(col))}>
                                    <span>{col}</span>
                                </div>
                            );
                        } else {
                            return (<div className="col gray" key={col}><span></span></div>);
                        }
                    })}
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
