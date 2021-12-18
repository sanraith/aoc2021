import SolutionBase from '../core/solutionBase';

/*@solutionInfo({
    day: 18,
    title: 'Snailfish'
})*/
export class Day18 extends SolutionBase {
    protected part1(): number {
        const numbers = this.inputLines.slice();
        const result = numbers.reduce((a, b) => this.reduce(`[${a},${b}]`));
        const magnitude = this.magnitude(result);

        return magnitude;
    }

    protected part2(): string | number {
        let maxMagnitude = Number.MIN_SAFE_INTEGER;
        const count = this.inputLines.length;
        for (let i = 0; i < count; i++) {
            this.updateProgress(i / count);
            const a = this.inputLines[i];
            for (let j = 0; j < count; j++) {
                if (i === j) { continue; }
                const b = this.inputLines[j];
                const magnitude = this.magnitude(this.reduce(`[${a},${b}]`));
                maxMagnitude = Math.max(magnitude, maxMagnitude);
            }
        }

        return maxMagnitude;
    }

    private magnitude(snail: string) { return this._magnitude(snail.slice(1)).magnitude; }
    private _magnitude(snail: string) {
        const length = snail.length;
        const factors = [3, 2];
        let pos = -1;
        let index = 0;
        let magnitude = 0;
        while (++pos < length) {
            const char = snail[pos];
            switch (char) {
                case '[': {
                    const result = this._magnitude(snail.substring(pos + 1));
                    magnitude += result.magnitude * factors[index];
                    pos += result.pos + 1;
                    break;
                }
                case ']': return { magnitude, pos };
                case ',': index = 1; break;
                default: magnitude += parseInt(char) * factors[index]; break;
            }
        }

        return { magnitude, pos };
    }

    private reduce(snail: string) {
        const numberPairRegex = /^\[(\d+),(\d+)\]$/;
        const splitRegex = /\d{2,}/;

        let needsReducing = true;
        while (needsReducing) {
            const explodeRegex = this.getExplodeRegex(snail);
            if (explodeRegex) {
                const explodeMatch = snail.match(explodeRegex)!;
                const [a, b] = explodeMatch[0].match(numberPairRegex)!.slice(1).map(x => parseInt(x));
                const numberToRight = this.firstNumber(snail, explodeMatch.index! + explodeMatch[0].length, 1);
                if (numberToRight) { snail = this.addRegularNumber(snail, b, numberToRight); }
                snail = snail.replace(explodeRegex, '0');
                const numberToLeft = this.firstNumber(snail, explodeMatch.index! - 1, -1);
                if (numberToLeft) { snail = this.addRegularNumber(snail, a, numberToLeft); }
                continue;
            }

            const splitMatch = snail.match(splitRegex);
            if (splitMatch) {
                const rn = parseInt(splitMatch[0]);
                snail = snail.replace(splitRegex, `[${Math.floor(rn / 2)},${Math.ceil(rn / 2)}]`);
                continue;
            }

            needsReducing = false;
        }

        return snail;
    }

    private getExplodeRegex(snail: string) {
        const length = snail.length;
        let pos = -1;
        let level = 0;
        while (++pos < length) {
            const char = snail[pos];
            if (char === '[') { level++; }
            else if (char === ']') { level--; }
            if (level === 5) {
                return new RegExp(`(?<=^.{${pos}})\\[\\d+,\\d+\\]`);
            }
        }

        return null;
    }

    private addRegularNumber(snail: string, a: number, neighbor: { from: number; to: number; length: number; }) {
        const newNeighborNumberChars = (a + parseInt(snail.substring(neighbor.from, neighbor.to))).toString();
        const snailArray = snail.split('');
        snailArray.splice(neighbor.from, neighbor.length, ...newNeighborNumberChars);
        snail = snailArray.join('');

        return snail;
    }

    private firstNumber(text: string, startInclusive: number, direction: -1 | 1) {
        const length = text.length;
        let pos = startInclusive;
        let from: number | null = null;
        let to: number | null = null;
        while (pos >= 0 && pos <= length && to === null) {
            const value = text.charCodeAt(pos) - 48;
            const isNumber = value >= 0 && value <= 9;
            if (from === null && isNumber) {
                from = pos;
            } else if (from !== null && !isNumber) {
                to = pos;
            }
            pos += direction;
        }

        if (from === null || to === null) { return null; }
        if (to < from) { [from, to] = [to + 1, from + 1]; }
        return { from, to, length: to - from };
    }
}
