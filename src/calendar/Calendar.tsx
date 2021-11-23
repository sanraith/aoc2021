import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import solutionManager from '../core/solutionManager';
import { ContainerContext } from '../services/container';
import { RuntimeSolution } from '../services/runtimeSolution.service';
import './Calendar.css';
import CalendarCell from './CalendarCell';
import { EventDay } from './calendarHelpers';
import CalendarPopup from './CalendarPopup';

const solutionsByDay = solutionManager.getSolutionsByDay();
const rows = Array(5).fill(0).map((_, i) => Array(7).fill(0).map((_, j) => {
    const day = i * 7 + j - 1;
    const solution = solutionsByDay.get(day);
    return { day, solution };
}));

export default function Calendar(): JSX.Element {
    const { runtimeSolutionService } = useContext(ContainerContext);
    const [openedDay, setOpenedDay] = useState<EventDay | null>(null);
    const [popupSolution, setPopupSolution] = useState<RuntimeSolution>();
    const history = useHistory();

    const onCellClick = useCallback((day: EventDay | null) => {
        history.push(day ? `/day/${day.toString().padStart(2, '0')}` : '/');
        if (day) {
            setPopupSolution(runtimeSolutionService.runtimeSolutions.get(day));
        }
        setOpenedDay(day);
    }, [history, runtimeSolutionService.runtimeSolutions]);

    const onSolveAllClick = useCallback(() => {
        for (const runtimeSolution of runtimeSolutionService.runtimeSolutions.values()) {
            runtimeSolution.start();
        }
    }, [runtimeSolutionService.runtimeSolutions]);

    useEffect(() => {
        if (!popupSolution) { return; }
        return popupSolution.onChange.subscribe(() => setPopupSolution(popupSolution ? { ...popupSolution } : undefined));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedDay]);

    return (<React.Fragment>
        <CalendarPopup
            runtimeSolution={popupSolution}
            isOpen={!!openedDay}
            onClose={() => onCellClick(null)}
        />
        <div id="calendar" className="calendar">
            {rows.map(row => row.map(cell => (
                <CalendarCell key={cell.day} day={cell.day} hasSolution={!!cell.solution} onCellClick={day => onCellClick(day as EventDay)} />
            )))}
        </div>
        <button onClick={() => onSolveAllClick()}>Solve all</button>
    </React.Fragment >);
}
