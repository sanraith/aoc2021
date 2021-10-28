/**
 * Executes the regular expression over and over on the given text until all matches are found.
 * @param regex The regular expression.
 * @param text The text.
 */
function regexAll(regex: RegExp, text: string): RegExpExecArray[] {
    const results: RegExpExecArray[] = [];
    let record: RegExpExecArray | null;

    while ((record = regex.exec(text))) {
        results.push(record);
    }

    return results;
}

export {
    regexAll
};

