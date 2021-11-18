import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import './Calendar.css';
import CalendarCell from './CalendarCell';
import Popup from './CalendarPopup';
import solutionManager from '../core/solutionManager';
import { EventDay } from './calendarHelpers';
import { ContainerContext } from '../services/container';

const solutionsByDay = solutionManager.getSolutionsByDay();
const rows = Array(5).fill(0).map((_, i) => Array(7).fill(0).map((_, j) => {
    const day = i * 7 + j - 1;
    const solution = solutionsByDay.get(day);
    return { day, solution };
}));

export default function Calendar(): JSX.Element {
    const { runtimeSolutionService } = useContext(ContainerContext);
    const [openedDay, setOpenedDay] = useState<EventDay | null>(null);
    const history = useHistory();
    const onCellClick = (day: EventDay | null) => {
        const newDay = openedDay === day ? null : day;
        history.push(newDay ? `/day/${newDay.toString().padStart(2, '0')}` : '/');
        setOpenedDay(newDay);
    };

    const onSolveAllClick = useCallback(() => {
        for (const runtimeSolution of runtimeSolutionService.runtimeSolutions.values()) {
            runtimeSolution.start();
        }
    }, [runtimeSolutionService.runtimeSolutions]);

    return (<React.Fragment>
        <Popup day={openedDay} onClosed={() => onCellClick(null)} />
        <div id="calendar" className="calendar">
            {rows.map(row => row.map(cell => (
                <CalendarCell key={cell.day} day={cell.day} hasSolution={!!cell.solution} onCellClick={day => onCellClick(day as EventDay)} />
            )))}
        </div>
        <button onClick={() => onSolveAllClick()}>Solve all</button>
    </React.Fragment >);
}
