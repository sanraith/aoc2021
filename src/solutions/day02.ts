import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 2,
    title: 'Password Philosophy'
})
export class Day02 extends SolutionBase {
    private regex = /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/g; // No need to reset it as we iterate over all results

    protected part1(): number {
        let validCount = 0;
        let record: RegExpExecArray;
        while ((record = this.regex.exec(this.input)!)) {
            const [, min, max, c, pass] = record;
            const cCount = pass.split(c).length - 1;
            if (cCount >= parseInt(min) && cCount <= parseInt(max)) {
                validCount++;
            }
        }

        return validCount;
    }

    protected part2(): number {
        let validCount = 0;
        let record: RegExpExecArray;
        while ((record = this.regex.exec(this.input)!)) {
            const [, first, second, c, pass] = record;
            const isValid = (pass[parseInt(first) - 1] === c) !== (pass[parseInt(second) - 1] === c);
            if (isValid) {
                validCount++;
            }
        }

        return validCount;
    }
}
