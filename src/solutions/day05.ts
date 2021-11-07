import _ from 'lodash';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 5,
    title: 'Binary Boarding'
})
export class Day05 extends SolutionBase {

    protected part1(): number {
        const highestId = _(this.inputLines).map(s => this.decode(s).id).max()!;
        return highestId;
    }

    protected part2(): number {
        const seats = new Map(this.inputLines.map(s => this.decode(s)).map(s => [s.id, s]));

        for (const seat of seats.values()) {
            if (!seats.has(seat.id + 1) && seats.has(seat.id + 2)) {
                return seat.id + 1;
            }
        }

        this.noSolution();
    }

    private decode(seatStr: string): { row: number, column: number, id: number; } {
        const rowPart = seatStr.slice(0, 7);
        const columnPart = seatStr.slice(7, 10);

        const binaryRow = rowPart.replace(/F/g, '0').replace(/B/g, '1');
        const binaryColumn = columnPart.replace(/L/g, '0').replace(/R/g, '1');

        const row = parseInt(binaryRow, 2);
        const column = parseInt(binaryColumn, 2);

        return {
            row: row,
            column: column,
            id: row * 8 + column
        };
    }
}
