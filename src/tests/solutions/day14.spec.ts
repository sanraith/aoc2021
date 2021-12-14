import { Day14 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day14 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day14);

    describe('for test input', function () {
        beforeAll(setupSolution(`
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`));

        it('solves part 1', expectedResult(1, '1588'));
        xit('solves part 2', expectedResult(2, 'Day14Part2'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        xit('solves part 1', expectedResult(1, 'Day14Part1'));
        xit('solves part 2', expectedResult(2, 'Day14Part2'));
    });
});
