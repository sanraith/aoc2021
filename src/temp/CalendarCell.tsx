import { calendarCellId } from './calendarHelpers';

export interface CalendarCellProps {
    day?: number | null;
    hasSolution?: boolean;
    isCopy?: boolean;
    onCellClick?: (day: number) => void;
}

export default function CalendarCell({ day, hasSolution, isCopy, onCellClick }: CalendarCellProps): JSX.Element {
    const isDecemberDay = day && day >= 1 && day <= 31;
    if (isDecemberDay) {
        const cellId = calendarCellId(day);
        const isEventDay = day <= 25 && !isCopy;
        return (
            <div id={isCopy ? undefined : cellId}
                className={'calendar-cell' + (isEventDay && hasSolution ? ' pointer' : '')}
                onClick={() => isEventDay && onCellClick && onCellClick(day)}>
                <span>{day}</span>
            </div>
        );
    } else {
        return (<div className="calendar-cell gray"><span></span></div>);
    }
}
