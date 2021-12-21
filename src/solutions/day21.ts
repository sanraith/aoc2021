import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 21,
    title: 'Dirac Dice'
})
export class Day21 extends SolutionBase {

    protected part1(): number {
        const players = this.parseInput();
        const boardSize = 10;
        const diceSides = 100;
        const rollsPerTurn = 3;
        const winningPoints = 1000;

        let playerIndex = 1;
        let diceValue = 1;
        let rollCount = 0;
        while (players[playerIndex].points < winningPoints) {
            let rollResult = 0;
            for (let i = 0; i < rollsPerTurn; i++) {
                diceValue = (diceValue - 1) % diceSides + 1;
                rollResult += diceValue;
                diceValue++;
                rollCount++;
            }

            playerIndex = (playerIndex + 1) % 2;
            const player = players[playerIndex];
            player.pos = (player.pos + rollResult - 1) % boardSize + 1;
            player.points += player.pos;
            // console.log(`Player ${player.id} rolls ${rollResult} and moves to space ${player.pos} for a total score of ${player.points}`);
        }

        return players[(playerIndex + 1) % 2].points * rollCount;
    }

    protected part2(): number {
        this.noSolution();
    }

    private parseInput() {
        return regexMatches(/Player (\d) starting position: (\d+)/g, this.input)
            .map(match => ({
                id: parseInt(match[1]),
                pos: parseInt(match[2]),
                points: 0
            }));
    }
}
