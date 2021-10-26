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
            left: cellRect.x,
            top: cellRect.y,
            width: cellRect.width + 'px',
            height: cellRect.height + 'px'
        };
    } else {
        return {
            visibility: 'visible',
            left: Math.max(11, cellRect.x - 50),
            top: Math.max(11, cellRect.y - 50),
            width: cellRect.width + 100,
            height: cellRect.height + 100
        };
    }
}

function Popup({ cellId, onClosed }: PopupProps) {
    console.log(cellId + ' render in');
    const prevCellIdRef = useRef<string | null>(null);
    const [style, setStyle] = useState<React.CSSProperties>();
    const [hasTransition, setHasTransition] = useState(false);
    const [animationStep, setAnimationStep] = useState(0);

    // If cellId changes, turn off transition and position popup.
    useEffect(() => {
        console.log(cellId + ' anim-0 in');
        const localStyle = getPopupStyle(cellId, prevCellIdRef.current, 'start');
        setHasTransition(false);
        setStyle(localStyle);
        setAnimationStep(1);
        console.log(cellId + ' anim-0 out');
    }, [cellId]);

    // After initial render, turn on transition and zoom in.
    useEffect(() => {
        if (animationStep !== 1) { return; }
        console.log(cellId + ' anim-1 in');
        setHasTransition(true);
        setStyle(getPopupStyle(cellId, prevCellIdRef.current, 'end'));
        setAnimationStep(0);
        console.log(cellId + ' anim-1 out');
        prevCellIdRef.current = cellId;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationStep]);

    console.log(cellId + ' render out');
    return (
        <div id="popup" className={'popup' + (hasTransition ? '' : ' notransition')} style={style} onClick={() => onClosed()}>
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
