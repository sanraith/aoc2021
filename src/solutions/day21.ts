import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

const boardSize = 10;
const rollsPerTurn = 3;

@solutionInfo({
    day: 21,
    title: 'Dirac Dice'
})
export class Day21 extends SolutionBase {

    protected part1(): number {
        const players = this.parseInput();
        const winningPoints = 1000;
        const diceSides = 100;

        let playerIndex = 1;
        let diceValue = 1;
        let rollCount = 0;
        while (players[playerIndex].points < winningPoints) {
            let rollResult = 0;
            for (let i = 0; i < rollsPerTurn; i++) {
                rollResult += (diceValue++ - 1) % diceSides + 1;
                rollCount++;
            }

            playerIndex = (playerIndex + 1) % 2;
            const player = players[playerIndex];
            player.pos = (player.pos + rollResult - 1) % boardSize + 1;
            player.points += player.pos;
        }

        return players[(playerIndex + 1) % 2].points * rollCount;
    }

    protected part2(): number {
        const players = this.parseInput();
        const wins = this.countWins(0, players[0].pos, players[0].points, players[1].pos, players[1].points);

        return Math.max(wins.p1, wins.p2);
    }

    private countWins(player: number, pos1: number, score1: number, pos2: number, score2: number, cache?: Map<number, { p1: number; p2: number; }>): { p1: number, p2: number; } {
        cache ??= new Map();
        const hash = this.hash(player, pos1, score1, pos2, score2);
        const wins = { p1: 0, p2: 0 };
        const winningScore = 21;

        if (score1 >= winningScore) {
            wins.p1 = 1; cache.set(hash, wins);
        } else if (score2 >= winningScore) {
            wins.p2 = 1; cache.set(hash, wins);
        }

        const cached = cache.get(hash);
        if (cached) { return cached; }

        const dimensionsByRoll = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]];
        for (const [roll, dimensions] of dimensionsByRoll) {
            if (player == 0) {
                const nextPos1 = (pos1 + roll - 1) % boardSize + 1;
                const nextScore1 = score1 + nextPos1;
                const { p1, p2 } = this.countWins(1, nextPos1, nextScore1, pos2, score2, cache);
                wins.p1 += dimensions * p1;
                wins.p2 += dimensions * p2;
            } else {
                const nextPos2 = (pos2 + roll - 1) % boardSize + 1;
                const nextScore2 = score2 + nextPos2;
                const { p1, p2 } = this.countWins(0, pos1, score1, nextPos2, nextScore2, cache);
                wins.p1 += dimensions * p1;
                wins.p2 += dimensions * p2;
            }
        }

        cache.set(hash, wins);
        return wins;
    }

    private hash(player: number, pos1: number, score1: number, pos2: number, score2: number) {
        return (((player * 100 + pos1) * 100 + score1) * 100 + pos2) * 100 + score2;
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
