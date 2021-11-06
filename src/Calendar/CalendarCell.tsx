import { calendarCellId } from './helpers';

export interface CalendarCellProps {
    day?: number | null;
    isCopy?: boolean;
    onCellClick?: (day: number) => void;
}

export default function CalendarCell({ day, isCopy, onCellClick }: CalendarCellProps): JSX.Element {
    const isDecemberDay = day && day >= 1 && day <= 31;
    if (isDecemberDay) {
        const cellId = calendarCellId(day);
        const isActiveDay = day <= 25;
        return (
            <div id={isCopy ? undefined : cellId}
                className={'calendar-cell' + (isActiveDay && !isCopy ? ' pointer' : '')}
                onClick={() => isActiveDay && onCellClick && onCellClick(day)}>
                <span>{day}</span>
            </div>
        );
    } else {
        return (<div className="calendar-cell gray"><span></span></div>);
    }
}
