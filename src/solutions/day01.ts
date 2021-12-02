import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 1,
    title: 'Sonar Sweep'
})
export class Day01 extends SolutionBase {

    protected part1(): number {
        const values = this.inputLines.map(x => parseInt(x));
        const increaseCount = values.slice(1).reduce((a, x, i) => a + (values[i] < x ? 1 : 0), 0);

        return increaseCount;
    }

    protected part2(): number {
        const values = this.inputLines.map(x => parseInt(x));
        const sumsOf3 = values.slice(2).map((x, i) => values[i] + values[i + 1] + x);
        const increaseCount = sumsOf3.slice(1).reduce((a, x, i) => a + (sumsOf3[i] < x ? 1 : 0), 0);

        return increaseCount;
    }
}
