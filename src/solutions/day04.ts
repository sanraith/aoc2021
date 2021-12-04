import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

const boardSize = 5;

@solutionInfo({
    day: 4,
    title: 'Giant Squid'
})
export class Day04 extends SolutionBase {

    protected part1(): number {
        return this.playBingo('play to win');
    }

    protected part2(): number {
        return this.playBingo('let the giant squid win');
    }

    private playBingo(strategy: 'play to win' | 'let the giant squid win'): number {
        const { numbers, boards, lookup } = this.parseInput();
        const marks: boolean[][][] = boards.map(() => Array(boardSize).fill(0).map(() => Array(boardSize).fill(false)));
        const wins: Set<number> = new Set();
        const targetWinCount = strategy === 'play to win' ? 1 : boards.length;

        for (const calledNumber of numbers) {
            const hits = lookup.get(calledNumber);
            if (!hits) { continue; }

            for (const { ti, tj, tk } of hits) {
                marks[ti][tj][tk] = true;

                if (!wins.has(ti) && this.isBingo(marks[ti], tj, tk)) {
                    wins.add(ti);
                    if (wins.size === targetWinCount) {
                        const sum = boards[ti].reduce((boardSum, rowNumbers, row) =>
                            boardSum + rowNumbers.reduce((rowSum, aNumber, col) =>
                                rowSum + (marks[ti][row][col] ? 0 : aNumber), 0), 0);

                        return sum * calledNumber;
                    }
                }
            }
        }

        this.noSolution();
    }

    private isBingo(board: boolean[][], hitRow: number, hitCol: number): boolean {
        let row = true;
        let col = true;
        for (let i = 0; i < boardSize; i++) {
            row &&= board[i][hitCol];
            col &&= board[hitRow][i];
            if (!row && !col) { return false; }
        }

        return true;
    }

    private parseInput() {
        const numbers = this.parseNumbersInLine(this.inputLines[0]);
        const boards: number[][][] = [];
        const lookup = new Map<number, { ti: number, tj: number, tk: number; }[]>();

        let lineIndex = 1;
        while (lineIndex < this.inputLines.length) {
            const board: number[][] = [];
            const ti = boards.push(board) - 1;

            let line: string;
            while ((line = this.inputLines[++lineIndex])) {
                const rowNumbers = this.parseNumbersInLine(line);
                const tj = board.push(rowNumbers) - 1;
                rowNumbers.map((n, tk) => {
                    let lookupEntry = lookup.get(n);
                    if (!lookupEntry) { lookup.set(n, (lookupEntry = [])); }
                    lookupEntry.push({ ti, tj, tk });
                });
            }
        }

        return { numbers, boards, lookup };
    }

    private parseNumbersInLine(line: string): number[] {
        return regexMatches(/\d+/g, line).map(match => parseInt(match[0]));
    }
}
