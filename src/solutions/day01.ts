import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 1,
    title: 'Sonar Sweep'
})
export class Day01 extends SolutionBase {

    protected part1(): string | number {
        const values = this.inputLines.map(x => parseInt(x));

        let increaseCount = 0;
        for (let i = 1; i < values.length; i++) {
            increaseCount += values[i - 1] < values[i] ? 1 : 0;
        }

        return increaseCount;
    }

    protected part2(): string | number {
        const values = [0, 0, ...this.inputLines.map(x => parseInt(x))];
        const sumsOf3 = Array(values.length - 2).fill(0)
            .map((_, i) => values[i - 2] + values[i - 1] + values[i]);

        let increaseCount = 0;
        for (let i = 1; i < sumsOf3.length; i++) {
            increaseCount += sumsOf3[i - 1] < sumsOf3[i] ? 1 : 0;
        }

        return increaseCount;
    }
}
