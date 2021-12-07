import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 7,
    title: 'The Treachery of Whales'
})
export class Day07 extends SolutionBase {

    protected part1(): number {
        const { crabs, minPos, maxPos } = this.parseInput();

        let minMoves = Number.MAX_VALUE;
        for (let target = minPos; target <= maxPos; target++) {
            const moves = crabs.reduce((a, x) => a + Math.abs(x - target), 0);
            minMoves = Math.min(minMoves, moves);
        }

        return minMoves;
    }

    protected part2(): number {
        const { crabs, minPos, maxPos } = this.parseInput();

        let minMoves = Number.MAX_VALUE;
        for (let target = minPos; target <= maxPos; target++) {
            const moves = crabs.reduce((a, x) => {
                const delta = Math.abs(x - target);
                const fuel = delta * (delta + 1) / 2;
                return a + fuel;
            }, 0);
            minMoves = Math.min(minMoves, moves);
        }

        return minMoves;
    }

    private parseInput() {
        let minPos = Number.MAX_VALUE;
        let maxPos = Number.MIN_VALUE;

        const crabs = regexMatches(/\d+/g, this.input).map(x => {
            const pos = parseInt(x[0]);
            minPos = Math.min(minPos, pos);
            maxPos = Math.max(maxPos, pos);
            return pos;
        });

        return { crabs, minPos, maxPos };
    }
}
