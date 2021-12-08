import { intersectSets, regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

interface Record { patterns: string[], digits: string[]; }

const originalDigits = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];
const originalDigitSet = new Set(originalDigits);
const originalDigitsByLength = new Map<number, { number: number; digits: string[]; }[]>();
originalDigits.forEach((x, i) => {
    if (!originalDigitsByLength.has(x.length)) { originalDigitsByLength.set(x.length, []); }
    originalDigitsByLength.get(x.length)!.push({ number: i, digits: x.split('') });
});

@solutionInfo({
    day: 8,
    title: 'Seven Segment Search'
})
export class Day08 extends SolutionBase {

    protected part1(): number {
        const uniqueLengths = new Set([2, 3, 4, 7]);
        const records = this.parseInput();
        const uniqueCount = records.reduce((a, r) => a +
            r.digits.reduce((a, d) => a + (uniqueLengths.has(d.length) ? 1 : 0), 0), 0);

        return uniqueCount;
    }

    protected part2(): number {
        const records = this.parseInput();
        const sum = records.reduce((a, record) => a + this.decodeDisplay(record), 0);

        return sum;
    }

    private decodeDisplay({ patterns, digits }: Record) {
        const maps = this.createCharacterMaps(patterns);
        const sortedMaps = [...maps.entries()].map(x => [x[0], [...x[1]]] as [string, string[]]).sort((a, b) => a[1].length - b[1].length);
        const map = this.eliminate(sortedMaps, patterns);
        if (!map) { this.noSolution(); }

        const number = parseInt(digits.map(x => this.decodeDigit(x, map)).join(''));

        return number;
    }

    private eliminate(charMap: [string, string[] | string][], patterns: string[], index = 0): { [key: string]: string; } | null {
        if (index === charMap.length) {
            const completedMap = Object.fromEntries(charMap) as { [key: string]: string; };
            if (this.validate(patterns, completedMap)) {
                return completedMap;
            } else {
                return null;
            }
        }

        const chars = [...charMap[index][1]];
        for (const char of chars) {
            const nextCharMap = [
                ...charMap.slice(0, index),
                [charMap[index][0], char],
                ...charMap.slice(index + 1).map(x => [x[0], (x[1] as string[]).filter(c => c !== char)])
            ] as [string, string[] | string][];

            const result = this.eliminate(nextCharMap, patterns, index + 1);
            if (result) {
                return result;
            }
        }

        return null;
    }

    private validate(patterns: string[], charMap: { [from: string]: string; }): boolean {
        for (const pattern of patterns) {
            const mapped = pattern.split('').map(x => charMap[x]).sort().join('');
            if (!originalDigitSet.has(mapped)) {
                return false;
            }
        }
        return true;
    }

    private decodeDigit(digitStr: string, charMap: { [from: string]: string; }): number {
        const mapped = digitStr.split('').map(x => charMap[x]).sort().join('');
        const digit = originalDigits.indexOf(mapped);

        return digit;
    }

    private createCharacterMaps(patterns: string[]) {
        const resultMap = new Map<string, Set<string>>();
        for (const pattern of patterns) {
            const patternMap = new Map<string, Set<string>>();
            const validDigits = originalDigitsByLength.get(pattern.length)!;
            pattern.split('').forEach(patternChar =>
                validDigits.forEach(vd => vd.digits.forEach(digitChar => {
                    if (!patternMap.has(patternChar)) { patternMap.set(patternChar, new Set()); }
                    patternMap.get(patternChar)!.add(digitChar);
                }))
            );

            for (const [key, newChars] of patternMap.entries()) {
                if (!resultMap.has(key)) {
                    resultMap.set(key, newChars);
                } else {
                    const currentChars = resultMap.get(key)!;
                    resultMap.set(key, intersectSets(currentChars, newChars));
                }
            }
        }

        return resultMap;
    }

    private parseInput(): Record[] {
        const records = regexMatches(/(.+) \| (.+)/g, this.input).map(lineMatch => {
            const [, patternsStr, digitsStr] = lineMatch;
            const patterns = regexMatches(/[a-g]+/g, patternsStr).map(x => x[0]);
            const digits = regexMatches(/[a-g]+/g, digitsStr).map(x => x[0]);
            return { patterns, digits };
        });

        return records;
    }
}
