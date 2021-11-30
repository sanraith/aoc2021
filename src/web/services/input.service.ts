import { get2DigitDay } from '../../core/helpers';
import { webPath } from '../../webHelpers';

export default class InputService {
    private cache = new Map<number, string>();

    async getInput(day: number): Promise<string | null> {
        if (!this.cache.has(day)) {
            try {
                const response = await fetch(webPath(`/input/day${get2DigitDay(day)}.txt`));
                const result = await response.text();
                this.cache.set(day, result);
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        return this.cache.get(day) ?? null;
    }
}
