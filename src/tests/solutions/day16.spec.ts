import { Day16 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day16 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day16);

    describe('in part 1 inputs', function () {
        describe('for test input 1', function () {
            beforeAll(setupSolution('8A004A801A8002F478'));
            it('solves part 1', expectedResult(1, '16'));
        });
        describe('for test input 2', function () {
            beforeAll(setupSolution('620080001611562C8802118E34'));
            it('solves part 1', expectedResult(1, '12'));
        });
        describe('for test input 3', function () {
            beforeAll(setupSolution('C0015000016115A2E0802F182340'));
            it('solves part 1', expectedResult(1, '23'));
        });
        describe('for test input 4', function () {
            beforeAll(setupSolution('A0016C880162017C3686B18A3D4780'));
            it('solves part 1', expectedResult(1, '31'));
        });
    });

    describe('in part 2 inputs', function () {
        describe('for "sum" test input', function () {
            beforeAll(setupSolution('C200B40A82'));
            it('solves part 2', expectedResult(2, '3'));
        });
        describe('for "product" test input', function () {
            beforeAll(setupSolution('04005AC33890'));
            it('solves part 2', expectedResult(2, '54'));
        });
        describe('for "minimum" test input', function () {
            beforeAll(setupSolution('880086C3E88112'));
            it('solves part 2', expectedResult(2, '7'));
        });
        describe('for "maximum" test input', function () {
            beforeAll(setupSolution('CE00C43D881120'));
            it('solves part 2', expectedResult(2, '9'));
        });
        describe('for "less than" test input', function () {
            beforeAll(setupSolution('D8005AC2A8F0'));
            it('solves part 2', expectedResult(2, '1'));
        });
        describe('for "greater than" test input', function () {
            beforeAll(setupSolution('F600BC2D8F'));
            it('solves part 2', expectedResult(2, '0'));
        });
        describe('for "equal" test input', function () {
            beforeAll(setupSolution('9C005AC2F8F0'));
            it('solves part 2', expectedResult(2, '0'));
        });
        describe('for complex test input', function () {
            beforeAll(setupSolution('9C0141080250320F1802104A08'));
            it('solves part 2', expectedResult(2, '1'));
        });
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());
        it('solves part 1', expectedResult(1, '917'));
        it('solves part 2', expectedResult(2, '2536453523344'));
    });
});
