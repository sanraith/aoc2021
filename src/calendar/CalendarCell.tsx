import { useContext, useEffect, useState } from 'react';
import { ContainerContext } from '../services/container';
import { calendarCellId } from './calendarHelpers';

export interface CalendarCellProps {
    day?: number | null;
    hasSolution?: boolean;
    isCopy?: boolean;
    onCellClick?: (day: number) => void;
}

export default function CalendarCell({ day, hasSolution, isCopy, onCellClick }: CalendarCellProps): JSX.Element {
    const { runtimeSolutionService } = useContext(ContainerContext);
    const runtimeSolution = day ? runtimeSolutionService.runtimeSolutions.get(day) : null;
    const [progress, setProgress] = useState<number | null>(null);

    useEffect(() => {
        if (!runtimeSolution || isCopy) { return; }
        const unsubSolution = runtimeSolution.onChange.subscribe(() => {
            if (runtimeSolution.states.every(x => x.kind !== 'progress' && x.kind !== 'result')) {
                setProgress(null);
                return;
            }
            const progress = runtimeSolution.states.reduce((a, x) => {
                switch (x.kind) {
                    case 'result': return a + 0.5;
                    case 'progress': return a + x.progress / 2;
                    default: return a;
                }
            }, 0);
            setProgress(Math.floor(progress * 100));
        });
        return () => unsubSolution();
    }, [runtimeSolution, isCopy]);

    const isDecemberDay = day && day >= 1 && day <= 31;
    if (isDecemberDay) {
        const cellId = calendarCellId(day);
        const isEventDay = day <= 25 && !isCopy;
        return (
            <div id={isCopy ? undefined : cellId}
                className={'calendar-cell' + (isEventDay && hasSolution ? ' pointer' : '')}
                onClick={() => isEventDay && onCellClick && onCellClick(day)}>
                <span>{day}</span>
                <span style={{ fontSize: '10px', marginLeft: '-40px', display: 'inline-block' }}>{progress ? progress + ' %' : ''}</span>
            </div >
        );
    } else {
        return (<div className="calendar-cell gray"><span></span></div>);
    }
}
