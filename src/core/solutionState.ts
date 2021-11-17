export type SolutionState = SolutionNotStarted | SolutionProgress | SolutionResult | SolutionError | SolutionCanceled;

export class SolutionNotStarted {
    kind = 'not_started' as const;

    constructor(
        public part: number
    ) { }
}

export class SolutionProgress {
    kind = 'progress' as const;

    constructor(
        public part: number,
        public progress: number,
        public timeMs: number = 0
    ) { }
}

export class SolutionResult {
    kind = 'result' as const;

    constructor(
        public part: number,
        public result: string | null,
        public timeMs: number,
        public visualizationData?: unknown
    ) { }
}

export class SolutionError {
    kind = 'error' as const;

    constructor(
        public part: number,
        public message: string,
        public timeMs: number = 0
    ) { }
}

export class SolutionCanceled {
    kind = 'canceled' as const;

    constructor(
        public part: number,
        public timeMs: number = 0
    ) { }
}