import { calendarCellId } from './helpers';

export interface CalendarCellProps {
    day?: number | null;
    isCopy?: boolean;
    onCellClick?: (day: number) => void;
}

export default function CalendarCell({ day, isCopy, onCellClick }: CalendarCellProps): JSX.Element {
    if (day && day >= 1 && day <= 31) {
        const cellId = calendarCellId(day);
        return (
            <div id={isCopy ? undefined : cellId} className={'calendar-cell'} onClick={() => onCellClick && onCellClick(day)}>
                <span>{day}</span>
            </div>
        );
    } else {
        return (<div className="calendar-cell gray"><span></span></div>);
    }
}
