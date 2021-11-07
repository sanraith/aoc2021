import path from 'path-browserify';
const absolutePart = process.env.PUBLIC_URL ?? '';

export function webPath(relativePart: string): string {
    return path.join(absolutePart, relativePart);
}