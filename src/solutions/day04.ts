import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

const boardSize = 5;

@solutionInfo({
    day: 4,
    title: 'Giant Squid'
})
export class Day04 extends SolutionBase {

    protected part1(): string | number {
        const { numbers, boards, lookup } = this.parseInput();
        const marks = boards.map(() => Array(boardSize).fill(0).map(() => Array(boardSize).fill(false)));

        for (const drawnNumber of numbers) {
            const hits = lookup.get(drawnNumber);
            if (!hits) { continue; }

            for (const { ti, tj, tk } of hits) {
                marks[ti][tj][tk] = true;
                if (this.isBingo(marks[ti], tj, tk)) {
                    const sum = boards[ti].reduce((boardSum, rowNumbers, row) =>
                        boardSum + rowNumbers.reduce((rowSum, x, col) =>
                            rowSum + (marks[ti][row][col] ? 0 : x), 0
                        ), 0
                    );

                    return sum * drawnNumber;
                }
            }
        }

        this.noSolution();
    }

    protected part2(): string | number {
        const { numbers, boards, lookup } = this.parseInput();
        const marks = boards.map(() => Array(boardSize).fill(0).map(() => Array(boardSize).fill(false)));
        let winCount = 0;
        const hasWon = Array(boards.length).fill(false);

        for (const drawnNumber of numbers) {
            const hits = lookup.get(drawnNumber);
            if (!hits) { continue; }

            for (const { ti, tj, tk } of hits) {
                marks[ti][tj][tk] = true;
                if (!hasWon[ti] && this.isBingo(marks[ti], tj, tk)) {
                    const sum = boards[ti].reduce((boardSum, rowNumbers, row) =>
                        boardSum + rowNumbers.reduce((rowSum, x, col) =>
                            rowSum + (marks[ti][row][col] ? 0 : x), 0
                        ), 0
                    );

                    hasWon[ti] = true;
                    if (++winCount === boards.length) {
                        return sum * drawnNumber;
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
        const numbers = this.parseLineNumbers(this.inputLines[0]);

        const boards: number[][][] = [];
        const lookup = new Map<number, { ti: number, tj: number, tk: number; }[]>();
        let lineIndex = 1;
        while (lineIndex < this.inputLines.length) {
            const board: number[][] = [];
            const ti = boards.push(board) - 1;

            let line: string | null;
            while ((line = this.inputLines[++lineIndex])) {
                const lineNumbers = this.parseLineNumbers(line);
                const tj = board.push(lineNumbers) - 1;
                lineNumbers.map((n, tk) => {
                    let lookupEntry = lookup.get(n);
                    if (!lookupEntry) { lookup.set(n, (lookupEntry = [])); }
                    lookupEntry.push({ ti, tj, tk });
                });
            }
        }

        return { numbers, boards, lookup };
    }

    private parseLineNumbers(line: string): number[] {
        const results = regexMatches(/\d+/g, line).map(match => parseInt(match[0]));
        return results;
    }
}
