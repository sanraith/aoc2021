import { intersectSets, regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Display = { patterns: string[]; digits: string[]; };
type VagueSegmentMap = { from: string; to: string[]; }[];
type SegmentMap = { [from: string]: string; };
type ReadOnlySet<T> = { has: (item: T) => boolean; };

const digitSegments: readonly string[] = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];
const digitSegmentSet: ReadOnlySet<string> = new Set(digitSegments);

@solutionInfo({
    day: 8,
    title: 'Seven Segment Search'
})
export class Day08 extends SolutionBase {

    protected part1(): number {
        const uniqueLengths = new Set([2, 3, 4, 7]);
        const displays = this.parseInput();
        const uniqueCount = displays.reduce((a, r) => a +
            r.digits.reduce((a, d) => a + (uniqueLengths.has(d.length) ? 1 : 0), 0), 0);

        return uniqueCount;
    }

    protected part2(): number {
        const displays = this.parseInput();
        const sum = displays.reduce((a, display, i) => {
            this.updateProgress(i / displays.length);
            return a + this.decodeDisplayValue(display);
        }, 0);

        return sum;
    }

    /** Decodes the value shown on the display. */
    private decodeDisplayValue({ patterns, digits }: Display): number {
        const vagueSegmentMap = this.generateVagueSegmentMap(patterns);
        const segmentMap = this.resolveSegmentMap(vagueSegmentMap, patterns);
        if (!segmentMap) { this.noSolution(); }

        const displayValue = parseInt(digits.map(x => this.decodeDigit(x, segmentMap)).join(''));
        return displayValue;
    }

    /** Finds the correct mapping from the initial segment map using backtrack. */
    private resolveSegmentMap(vagueMap: VagueSegmentMap, patterns: string[], index = 0): SegmentMap | null {
        if (index === vagueMap.length) {
            const completedMap = Object.fromEntries(vagueMap.map(x => [x.from, x.to[0]]));
            return this.isSegmentMapValid(completedMap, patterns) ? completedMap : null;
        }

        const candidateChars = vagueMap[index].to;
        for (const selectedChar of candidateChars) {
            const nextMap = [
                ...vagueMap.slice(0, index),
                { from: vagueMap[index].from, to: [selectedChar] },
                ...vagueMap.slice(index + 1).map(x => ({
                    from: x.from,
                    to: x.to.filter(c => c !== selectedChar)
                }))
            ];

            const result = this.resolveSegmentMap(nextMap, patterns, index + 1);
            if (result) { return result; }
        }

        return null;
    }

    /** Checks if each pattern can be mapped to a digit using the segment map. */
    private isSegmentMapValid(map: SegmentMap, patterns: string[]): boolean {
        return patterns.every(p => digitSegmentSet.has(this.decodeSegments(p, map)));
    }

    /** Decodes a segment string and finds to the corresponding digit. */
    private decodeDigit(segments: string, map: SegmentMap): number {
        return digitSegments.indexOf(this.decodeSegments(segments, map));
    }

    /** Decodes an encoded segment string. */
    private decodeSegments(segments: string, map: SegmentMap): string {
        return segments.split('').map(x => map[x]).sort().join('');
    }

    /** Generates a vague segment map where each character can have multiple possible mappings. */
    private generateVagueSegmentMap(patterns: string[]): VagueSegmentMap {
        const digitsSegmentsByLength = new Map<number, string[][]>(Array(8).fill(0).map((_, i) => [i, []]));
        digitSegments.forEach(x => digitsSegmentsByLength.get(x.length)!.push(x.split('')));

        const resultMap = new Map<string, Set<string>>();
        for (const pattern of patterns) {
            // Generate possible segment mappings based on pattern
            const patternMap = new Map<string, Set<string>>();
            const validDigits = digitsSegmentsByLength.get(pattern.length)!;
            pattern.split('').forEach(patternChar =>
                validDigits.forEach(vd => vd.forEach(digitChar => {
                    if (!patternMap.has(patternChar)) { patternMap.set(patternChar, new Set()); }
                    patternMap.get(patternChar)!.add(digitChar);
                }))
            );

            // Intersect with previous mappings
            for (const [key, newChars] of patternMap.entries()) {
                if (!resultMap.has(key)) {
                    resultMap.set(key, newChars);
                } else {
                    const currentChars = resultMap.get(key)!;
                    resultMap.set(key, intersectSets(currentChars, newChars));
                }
            }
        }

        // Generate sorted vague segment map
        return [...resultMap.entries()]
            .map(x => ({ from: x[0], to: [...x[1]] }))
            .sort((a, b) => a.to.length - b.to.length);
    }

    private parseInput(): Display[] {
        const displays = regexMatches(/(.+) \| (.+)/g, this.input).map(displayMatch => {
            const [, patternsStr, digitsStr] = displayMatch;
            const patterns = regexMatches(/[a-g]+/g, patternsStr).map(x => x[0]);
            const digits = regexMatches(/[a-g]+/g, digitsStr).map(x => x[0]);
            return { patterns, digits };
        });

        return displays;
    }
}
