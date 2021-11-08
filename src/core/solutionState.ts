export type SolutionState = SolutionResult | SolutionError | SolutionProgress;

export class SolutionProgress {
    type = 'progress' as const;

    constructor(
        public part: number,
        public progress: number,
        public timeMs: number = 0
    ) { }
}

export class SolutionResult {
    type = 'result' as const;

    constructor(
        public part: number,
        public result: string | null,
        public timeMs: number,
        public visualizationData?: unknown
    ) { }
}

export class SolutionError {
    type = 'error' as const;

    constructor(
        public part: number,
        public message: string,
        public timeMs: number = 0
    ) { }
}
