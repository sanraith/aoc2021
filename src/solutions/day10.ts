import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

const chunkPairs = { '(': ')', '[': ']', '{': '}', '<': '>' } as Record<string, string>;
const errorPoints = { ')': 3, ']': 57, '}': 1197, '>': 25137 } as Record<string, number>;
const completePoints = { ')': 1, ']': 2, '}': 3, '>': 4 } as Record<string, number>;

@solutionInfo({
    day: 10,
    title: 'Syntax Scoring'
})
export class Day10 extends SolutionBase {

    protected part1(): number {
        const errorScore = this.inputLines.reduce((a, l) => a + this.score(l, 'check'), 0);
        return errorScore;
    }

    protected part2(): number {
        const incompleteLines = this.inputLines.filter(l => !this.score(l, 'check'));
        const completeScores = incompleteLines.map(l => this.score(l, 'complete'));
        const middleScore = completeScores.sort((a, b) => a - b)[Math.floor(completeScores.length / 2)];

        return middleScore;
    }

    private score(line: string, mode: 'check' | 'complete'): number {
        const stack = [];
        for (const actual of line.split('')) {
            if (chunkPairs[actual]) {
                stack.push(actual);
            } else {
                const chunkStart = stack.pop()!;
                const expected = chunkPairs[chunkStart];
                if (expected !== actual) {
                    return errorPoints[actual];
                }
            }
        }

        let score = 0;
        if (mode === 'complete') {
            score = stack.reduceRight((a, x) => a * 5 + completePoints[chunkPairs[x]], 0);
        }

        return score;
    }
}
