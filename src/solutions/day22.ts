import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 22,
    title: 'Crab Combat'
})
export class Day22 extends SolutionBase {
    isLogEnabled = false;

    private gameCount!: number;

    protected part1(): number {
        const decks = this.parseDecks();
        this.playGame(decks, { isRecursive: false });
        return this.calculateScore(decks);
    }

    protected part2(): number {
        const decks = this.parseDecks();
        this.playGame(decks, { isRecursive: true });
        return this.calculateScore(decks);
    }

    private calculateScore(decks: number[][]) {
        return decks.filter(x => x.length > 0)[0]
            .reverse()
            .reduce((a, x, i) => a + x * (i + 1), 0);
    }

    private playGame(decks: number[][], options: { isRecursive: boolean; }): number {
        const states = new Set<string>();
        const gameCount = ++this.gameCount;
        let roundCount = 0;

        if (this.isLogEnabled) {
            console.log(`\n== Game ${gameCount} ==`);
        }

        while (decks[0].length > 0 && decks[1].length > 0) {
            roundCount++;
            if (gameCount === 1) {
                this.updateProgress(Math.max(decks[0].length, decks[1].length) / (decks[0].length + decks[1].length));
            }

            if (this.isLogEnabled) {
                console.log(`\n-- Round ${roundCount} (Game ${gameCount}) --`);
                decks.forEach((d, i) => console.log(`Player ${i + 1}'s deck: ${d.join(', ')}`));
            }

            // Rule 1 - Player 1 wins game if a state have been seen before
            const state = this.getState(decks);
            if (states.has(state)) {
                return 0;
            }
            states.add(state);

            // Rule 2 - Continue as normal
            const dealt = decks.map(d => d.shift()!);
            const [a, b] = dealt;

            if (this.isLogEnabled) { dealt.forEach((c, i) => console.log(`Player ${i + 1} plays: ${c}`)); }

            // Rule 3 - Play recursive combat if both players have at least as many cards
            // remaining in their deck as the value of the card they just drew
            let winnerId = a > b ? 0 : 1;
            if (options.isRecursive && decks[0].length >= a && decks[1].length >= b) {
                if (this.isLogEnabled) { console.log('Playing a sub-game to determine a winner...'); }

                const copiedDecks = decks.map((d, i) => d.slice(0, dealt[i]));
                winnerId = this.playGame(copiedDecks, options);

                if (this.isLogEnabled) { console.log(`\n...anyway, back to game ${gameCount}.`); }
            }

            if (winnerId === 0) {
                decks[0].push(a, b);
            } else {
                decks[1].push(b, a);
            }

            if (this.isLogEnabled) { console.log(`Player ${winnerId + 1} wins round ${roundCount} of game ${gameCount}!`); }
        }

        const winnerId = decks.findIndex(d => d.length > 0);

        if (this.isLogEnabled) {
            console.log(`The winner of game ${gameCount} is player ${winnerId + 1}!`);
            if (gameCount === 1) {
                console.log('\n\n== Post-game results ==');
                decks.forEach((d, i) => console.log(`Player ${i + 1}'s deck: ${d.join(', ')}`));
            }
        }

        return winnerId;
    }

    private getState(decks: number[][]) {
        return decks[0].join(',') + '|' + decks[1].join(',');
    }

    private parseDecks(): number[][] {
        const decks: number[][] = [];
        let lineIndex = 0;
        let line: string;

        for (let i = 0; i < 2; i++) {
            lineIndex++;
            const deck: number[] = [];
            while ((line = this.inputLines[lineIndex++]) && line.length > 0) {
                deck.push(parseInt(line));
            }
            decks.push(deck);
        }

        this.gameCount = 0;

        return decks;
    }
}
