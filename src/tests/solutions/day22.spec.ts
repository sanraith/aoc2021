import { Day22 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day22 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day22);

    describe('for small test input', function () {
        beforeAll(setupSolution(`
on x=10..12,y=10..12,z=10..12
on x=11..13,y=11..13,z=11..13
off x=9..11,y=9..11,z=9..11
on x=10..10,y=10..10,z=10..10`));

        it('solves part 1', expectedResult(1, '39'));
        xit('solves part 2', expectedResult(2, 'Day22Part2'));
    });


    describe('for large test input', function () {
        beforeAll(setupSolution(`
on x=-20..26,y=-36..17,z=-47..7
on x=-20..33,y=-21..23,z=-26..28
on x=-22..28,y=-29..23,z=-38..16
on x=-46..7,y=-6..46,z=-50..-1
on x=-49..1,y=-3..46,z=-24..28
on x=2..47,y=-22..22,z=-23..27
on x=-27..23,y=-28..26,z=-21..29
on x=-39..5,y=-6..47,z=-3..44
on x=-30..21,y=-8..43,z=-13..34
on x=-22..26,y=-27..20,z=-29..19
off x=-48..-32,y=26..41,z=-47..-37
on x=-12..35,y=6..50,z=-50..-2
off x=-48..-32,y=-32..-16,z=-15..-5
on x=-18..26,y=-33..15,z=-7..46
off x=-40..-22,y=-38..-28,z=23..41
on x=-16..35,y=-41..10,z=-47..6
off x=-32..-23,y=11..30,z=-14..3
on x=-49..-5,y=-3..45,z=-29..18
off x=18..30,y=-20..-8,z=-3..13
on x=-41..9,y=-7..43,z=-33..15
on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
on x=967..23432,y=45373..81175,z=27513..53682`));

        it('solves part 1', expectedResult(1, '590784'));
        xit('solves part 2', expectedResult(2, 'Day22Part2'));
    });


    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        xit('solves part 1', expectedResult(1, 'Day22Part1'));
        xit('solves part 2', expectedResult(2, 'Day22Part2'));
    });
});
