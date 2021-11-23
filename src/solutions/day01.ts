import { toInteger } from 'lodash';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

export interface Day01Data {
    numbers: number[],
    i: number, j: number, k?: number,
    checks: number[];
}

@solutionInfo({
    day: 1,
    title: 'Report Repair'
})
export class Day01 extends SolutionBase {
    protected visualizationData?: Day01Data;

    protected part1(): number {
        const checks: number[] = [];
        const numbers = this.inputLines.map(x => toInteger(x));
        for (let i = 0; i < numbers.length; i++) {
            const a = numbers[i];
            for (let j = i + 1; j < numbers.length; j++) {
                const b = numbers[j];
                checks.push(i, j);
                if (a + b === 2020) {
                    this.visualizationData = { numbers, i, j, checks };
                    return a * b;
                }
            }
        }

        this.noSolution();
    }

    protected part2(): number {
        const checks: number[] = [];
        const numbers = this.inputLines.map(x => toInteger(x));
        for (let i = 0; i < numbers.length; i++) {
            const a = numbers[i];
            for (let j = i + 1; j < numbers.length; j++) {
                const b = numbers[j];
                for (let k = j + 1; k < numbers.length; k++) {
                    const c = numbers[k];
                    checks.push(i, j, k);

                    // Fake work
                    for (let t = 0; t < 1000; t++);

                    if (a + b + c === 2020) {
                        this.visualizationData = { numbers, i, j, k, checks };
                        return a * b * c;
                    }
                }
            }
        }

        this.noSolution();
    }
}
