import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './Calendar.css';
import CalendarCell from './CalendarCell';
import Popup from './CalendarPopup';

export default function Calendar(): JSX.Element {
    const rows = Array(5).fill(0).map((_, i) => Array(7).fill(0).map((_, j) => i * 7 + j - 1));
    const [openedDay, setOpenedDay] = useState<number | null>(null);
    const history = useHistory();
    const onCellClick = (day: number | null) => {
        const newDay = openedDay === day ? null : day;
        history.push(newDay ? `/day/${newDay.toString().padStart(2, '0')}` : '/');
        setOpenedDay(newDay);
    };

    return (<React.Fragment>
        <Popup day={openedDay} onClosed={() => onCellClick(null)} />
        <div className="calendar">
            {rows.map(row => row.map(day => (
                <CalendarCell key={day} day={day} onCellClick={day => onCellClick(day)} />
            )))}
        </div>
    </React.Fragment >);
}
