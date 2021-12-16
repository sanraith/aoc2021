import { Day16 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day16 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day16);

    describe('for test input 1', function () {
        beforeAll(setupSolution('8A004A801A8002F478'));
        it('solves part 1', expectedResult(1, '16'));
        xit('solves part 2', expectedResult(2, 'Day16Part2'));
    });

    describe('for test input 2', function () {
        beforeAll(setupSolution('620080001611562C8802118E34'));
        it('solves part 1', expectedResult(1, '12'));
        xit('solves part 2', expectedResult(2, 'Day16Part2'));
    });

    describe('for test input 3', function () {
        beforeAll(setupSolution('C0015000016115A2E0802F182340'));
        it('solves part 1', expectedResult(1, '23'));
        xit('solves part 2', expectedResult(2, 'Day16Part2'));
    });

    describe('for test input 4', function () {
        beforeAll(setupSolution('A0016C880162017C3686B18A3D4780'));
        it('solves part 1', expectedResult(1, '31'));
        xit('solves part 2', expectedResult(2, 'Day16Part2'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());
        it('solves part 1', expectedResult(1, '917'));
        xit('solves part 2', expectedResult(2, 'Day16Part2'));
    });
});
