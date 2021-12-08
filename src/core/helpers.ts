/**
 * Executes the regular expression over and over on the given text until all matches are found.
 * @param regex The regular expression.
 * @param text The text.
 */
function regexMatches(regex: RegExp, text: string): RegExpExecArray[] {
    const results: RegExpExecArray[] = [];
    let record: RegExpExecArray | null;

    while ((record = regex.exec(text))) {
        results.push(record);
    }

    return results;
}

function* regexMatchesLazy(regex: RegExp, text: string): Generator<RegExpExecArray, void, unknown> {
    let record: RegExpExecArray | null;
    while ((record = regex.exec(text))) {
        yield record;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertNever(value: never, shouldThrow = true): void | never {
    if (shouldThrow) {
        throw new Error('Coding error! This path should never be reached!');
    }
}

function get2DigitDay(day: number): string {
    return day.toString().padStart(2, '0');
}

/** Performs a logical XOR operation on the two parameters. */
function xor(a: boolean, b: boolean): boolean {
    return a !== b; // (a || b) && !(a && b);
}

function intersectSets<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter(x => b.has(x)));
}

export {
    assertNever,
    regexMatches,
    regexMatchesLazy,
    get2DigitDay,
    xor,
    intersectSets
};

