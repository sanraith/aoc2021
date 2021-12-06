import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

const restartAge = 6;
const newBornAge = 8;

@solutionInfo({
    day: 6,
    title: 'Lanternfish'
})
export class Day06 extends SolutionBase {

    protected part1(): number {
        return this.simulateLanternfish(80);
    }

    protected part2(): number {
        return this.simulateLanternfish(256);
    }

    private simulateLanternfish(dayCount: number): number {
        const ages: number[] = Array(newBornAge + 1).fill(0);
        const fishes = regexMatches(/\d/g, this.input).map(x => parseInt(x[0]));
        fishes.forEach(x => ages[x]++);

        for (let day = 0; day < dayCount; day++) {
            const count = ages.shift() as number;
            ages[newBornAge] = count;
            ages[restartAge] += count;
        }

        const population = ages.reduce((a, x) => a + x, 0);
        return population;
    }
}
