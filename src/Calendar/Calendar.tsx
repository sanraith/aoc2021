import React, { useState } from 'react';
import CalendarCell from './CalendarCell';
import Popup from './CalendarPopup';

export default function Calendar(): JSX.Element {
    const rows = Array(5).fill(0).map((_, i) => Array(7).fill(0).map((_, j) => i * 7 + j - 1));
    const [openedDay, setOpenedCell] = useState<number | null>(null);
    const onCellClick = (day: number) => setOpenedCell(openedDay === day ? null : day);

    return (<React.Fragment>
        <Popup day={openedDay} onClosed={() => setOpenedCell(null)} />
        <div className="calendar">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map(day => (<CalendarCell key={day} day={day} onCellClick={day => onCellClick(day)} />)
                    )}
                </div>
            ))}
        </div>
    </React.Fragment>);
}
