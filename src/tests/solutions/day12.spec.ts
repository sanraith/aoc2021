import { Day12 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day12 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day12);

    describe('for test input 1', function () {
        beforeAll(setupSolution(`
start-A
start-b
A-c
A-b
b-d
A-end
b-end`));

        it('solves part 1', expectedResult(1, '10'));
        xit('solves part 2', expectedResult(2, 'Day12Part2'));
    });


    describe('for test input 2', function () {
        beforeAll(setupSolution(`
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`));

        it('solves part 1', expectedResult(1, '19'));
        xit('solves part 2', expectedResult(2, 'Day12Part2'));
    });

    describe('for test input 3', function () {
        beforeAll(setupSolution(`
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`));

        it('solves part 1', expectedResult(1, '226'));
        xit('solves part 2', expectedResult(2, 'Day12Part2'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        xit('solves part 1', expectedResult(1, 'Day12Part1'));
        xit('solves part 2', expectedResult(2, 'Day12Part2'));
    });
});
