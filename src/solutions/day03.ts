import { xor } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type KeepMode = 'most_common' | 'least_common';

@solutionInfo({
    day: 3,
    title: 'Binary Diagnostic'
})
export class Day03 extends SolutionBase {

    protected part1(): number {
        const binaryNumbers = this.inputLines;
        const halfCount = binaryNumbers.length / 2;
        const bitCounts = binaryNumbers[0].split('').map((_, pos) =>
            binaryNumbers.reduce((a, bNumber) => a + parseInt(bNumber[pos]), 0)
        );

        const gamma = parseInt(bitCounts.map(x => x >= halfCount ? '1' : '0').join(''), 2);
        const epsilon = parseInt(bitCounts.map(x => x < halfCount ? '1' : '0').join(''), 2);

        return gamma * epsilon;
    }

    protected part2(): number {
        const binaryNumbers = this.inputLines;
        const oxygenGeneratorRating = this.getRating(binaryNumbers, 'most_common');
        const co2ScrubberRating = this.getRating(binaryNumbers, 'least_common');

        return oxygenGeneratorRating * co2ScrubberRating;
    }

    private getRating(bNumbers: string[], keep: KeepMode): number {
        for (let pos = 0; pos < bNumbers[0].length; pos++) {
            bNumbers = this.filter(bNumbers, pos, keep);
            if (bNumbers.length === 1) { break; }
        }

        return parseInt(bNumbers[0], 2);
    }

    private filter(bNumbers: string[], position: number, keep: KeepMode): string[] {
        const bitCount = bNumbers.reduce((a, x) => a + parseInt(x[position]), 0);
        const keepBit = xor(bitCount >= bNumbers.length / 2, keep === 'least_common') ? '1' : '0';

        return bNumbers.filter(x => x[position] === keepBit);
    }
}
