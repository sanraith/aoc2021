import { EventDay } from '../calendar/calendarHelpers';

class RouterService {

    _day: EventDay | null = null;
    get day(): EventDay | null {
        return this._day;
    }
    set day(value: EventDay | null) {
        this._day = value;
    }

    clearRoute(): void {
        this._day = null;
    }
}

export default RouterService;
