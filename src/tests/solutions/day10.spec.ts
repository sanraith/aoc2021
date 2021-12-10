import { Day10 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day10 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day10);

    describe('for test input', function () {
        beforeAll(setupSolution(`
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`));

        it('solves part 1', expectedResult(1, '26397'));
        it('solves part 2', expectedResult(2, '288957'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '294195'));
        it('solves part 2', expectedResult(2, '3490802734'));
    });
});
