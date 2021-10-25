import React, { useState } from 'react';
import './App.css';

function calendarCellId(dayNumber: number) { return `cd${dayNumber}`; }

interface PopupProps {
    cellId: string | null;
    onClosed: () => void;
}

function Popup({ cellId, onClosed }: PopupProps) {
    let style: React.CSSProperties = {
        visibility: cellId ? 'visible' : 'hidden'
    };

    if (cellId) {
        const cell = document.getElementById(cellId)!;
        const cellRect = cell.getBoundingClientRect();
        style = {
            ...style,
            left: cellRect.x,
            top: cellRect.y,
            width: cellRect.width + 'px',
            height: cellRect.height + 'px'
        };
        console.log(style);
    }

    return (
        <div id="popup" className="popup" style={style} onClick={() => onClosed()}>
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
