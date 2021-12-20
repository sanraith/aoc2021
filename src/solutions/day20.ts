import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Image = Record<number, Record<number, string>>;

@solutionInfo({
    day: 20,
    title: 'Trench Map'
})
export class Day20 extends SolutionBase {

    isInfiniteLit = false;

    protected part1(): number {
        const { image, algorithm } = this.parseInput();
        const result = this.enhance(image, algorithm, 2);

        return this.boundaries(result).pixelCount;
    }

    protected part2(): number {
        const { image, algorithm } = this.parseInput();
        const result = this.enhance(image, algorithm, 50);

        return this.boundaries(result).pixelCount;
    }

    private enhance(image: Image, algorithm: string, count: number) {
        this.isInfiniteLit = false;
        const isInfiniteFlashing = algorithm[0] === '1';

        for (let i = 0; i < count; i++) {
            this.updateProgress(i / count);
            const { startX, startY, endX, endY } = this.boundaries(image);
            const next: Image = {};

            for (let y = startY - 1; y <= endY + 1; y++) {
                for (let x = startX - 1; x <= endX + 1; x++) {
                    const value = algorithm[this.algorithmIndex(image, x, y)];
                    this.set(next, x, y, value);
                }
            }

            image = next;
            this.isInfiniteLit = isInfiniteFlashing && !this.isInfiniteLit;
        }

        return image;
    }

    private algorithmIndex(image: Image, x: number, y: number) {
        const indexArray: string[] = [];
        for (let j = y - 1; j <= y + 1; j++) {
            for (let i = x - 1; i <= x + 1; i++) {
                indexArray.push(this.get(image, i, j));
            }
        }

        return parseInt(indexArray.join(''), 2);
    }

    private parseInput() {
        const newLineRegex = /\r?\n/g;
        const [, algorithmMatch, imageMatch] = this.input.match(/((?:.+(?:\r?\n)?)+)\r?\n\r?\n((?:.+(?:\r?\n)?)+)/) ?? [];
        const algorithm = algorithmMatch.replace(newLineRegex, '').replace(/\./g, '0').replace(/#/g, '1');
        const image: Image = {};
        imageMatch.split(newLineRegex)
            .forEach((line, y) => line.split('')
                .forEach(((v, x) => this.set(image, x, y, v === '#' ? '1' : '0'))));

        return { algorithm, image };
    }

    private set(image: Image, x: number, y: number, value: string) {
        if (image[y] === undefined) { image[y] = {}; }
        image[y][x] = value;
    }

    private get(image: Image, x: number, y: number): string {
        const row = image[y];
        if (row === undefined || row[x] === undefined) { return this.isInfiniteLit ? '1' : '0'; }
        return row[x];
    }

    private boundaries(image: Image) {
        let [startX, startY, endX, endY, pixelCount] = [0, 0, 0, 0, 0];
        Object.entries(image).forEach(([y, row]) => Object.entries(row).map(([x, v]) => {
            if (v === '1') {
                startX = Math.min(startX, parseInt(x));
                startY = Math.min(startY, parseInt(y));
                endX = Math.max(endX, parseInt(x));
                endY = Math.max(endY, parseInt(y));
                pixelCount++;
            }
        }));
        return { startX, startY, endX, endY, pixelCount };
    }

    private visualize(image: Image) {
        const { startX, startY, endX, endY } = this.boundaries(image);
        console.log({ startX, startY, endX, endY });
        for (let y = startY; y <= endY; y++) {
            let line = '';
            for (let x = startX; x <= endX; x++) {
                line += this.get(image, x, y) === '1' ? '#' : '.';
            }
            console.log(line);
        }
    }
}
