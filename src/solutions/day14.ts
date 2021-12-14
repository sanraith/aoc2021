import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Rule = { pair: string; newLetter: string; newPairs: string[]; };

@solutionInfo({
    day: 14,
    title: 'Extended Polymerization'
})
export class Day14 extends SolutionBase {

    protected part1(): number {
        const { template, rules } = this.parseInput();
        const { leastCommonCount, mostCommonCount } = this.runSteps(template, rules, 10);

        return mostCommonCount - leastCommonCount;
    }

    protected part2(): number {
        const { template, rules } = this.parseInput();
        const { leastCommonCount, mostCommonCount } = this.runSteps(template, rules, 40);

        return mostCommonCount - leastCommonCount;
    }

    private runSteps(template: string, rules: Rule[], stepCount: number) {
        const letters = [...new Set(rules.flatMap(x => [x.newLetter, ...x.pair.split('')]))];
        const letterCounts = Object.fromEntries(letters.map(x => [x, 0]));
        const pairCombinations = letters.flatMap(a => letters.map(b => a + b));
        const pairCounts = Object.fromEntries(pairCombinations.map(x => [x, 0]));
        const ruleMap = Object.fromEntries(rules.map(rule => ([rule.pair, rule])));

        // Populate letter and combination counts from template
        template.split('').forEach((char, i, templateArray) => {
            letterCounts[char]++;
            if (i < templateArray.length - 1) {
                pairCounts[char + templateArray[i + 1]]++;
            }
        });

        // Run steps
        for (let step = 0; step < stepCount; step++) {
            for (const [pair, count] of Object.entries(pairCounts)) {
                const { newPairs, newLetter } = ruleMap[pair];
                letterCounts[newLetter] += count;
                pairCounts[pair] -= count;
                newPairs.forEach(newPair => pairCounts[newPair] += count);
            }
        }

        // Read commonality
        const letterCountsAscending = Object.entries(letterCounts)
            .map(([char, count]) => ({ char, count }))
            .sort((a, b) => a.count - b.count);
        const leastCommonCount = letterCountsAscending[0].count;
        const mostCommonCount = letterCountsAscending[letterCountsAscending.length - 1].count;

        return { mostCommonCount, leastCommonCount };
    }

    private parseInput() {
        const template = this.input.match(/^\w+/m)?.[0] ?? '';
        const rules = regexMatches(/(\w{2}) -> (\w)/g, this.input)
            .map(([, pair, newLetter]) => ({
                pair,
                newLetter,
                newPairs: [pair[0] + newLetter, newLetter + pair[1]]
            }));

        return { template, rules };
    }
}
