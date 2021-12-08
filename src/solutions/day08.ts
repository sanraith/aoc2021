import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

interface Record { patterns: string[], digits: string[]; }
const originalDigits = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];

@solutionInfo({
    day: 8,
    title: 'Seven Segment Search'
})
export class Day08 extends SolutionBase {

    protected part1(): number {
        const uniqueLengths = new Set([2, 3, 4, 7]);
        const records = this.parseInput();
        const uniqueCount = records.reduce((a, r) => a +
            r.digits.reduce((a, d) => a + (uniqueLengths.has(d.length) ? 1 : 0), 0), 0);

        console.log(originalDigits.length);

        return uniqueCount;
    }

    protected part2(): number {
        this.noSolution();
    }

    private parseInput(): Record[] {
        const records = regexMatches(/(.+) \| (.+)/g, this.input).map(lineMatch => {
            const [, patternsStr, digitsStr] = lineMatch;
            const patterns = regexMatches(/[a-g]+/g, patternsStr).map(x => x[0]);
            const digits = regexMatches(/[a-g]+/g, digitsStr).map(x => x[0]);
            return { patterns, digits };
        });

        return records;
    }
}
