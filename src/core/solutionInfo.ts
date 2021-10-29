import SolutionBase from './solutionBase';

const solutionInfoList: SolutionInfo[] = [];

export type Constructor<T> = {
    new(...args: unknown[]): T;
    readonly prototype: T;
};

export type SolutionInfoParams = {
    day: number;
    title: string;
};

export type SolutionInfo = SolutionInfoParams & {
    ctor: Constructor<SolutionBase>;
    create: () => SolutionBase;
};

export function solutionInfo<TCtor extends Constructor<SolutionBase>>(day: number, title: string): (ctor: TCtor) => void;
export function solutionInfo<TCtor extends Constructor<SolutionBase>>(info: SolutionInfoParams): (ctor: TCtor) => void;
export function solutionInfo<TCtor extends Constructor<SolutionBase>>(...params: [number, string] | [SolutionInfoParams]): (ctor: TCtor) => void {
    const info = typeof params[0] === 'number' ? { day: params[0], title: params[1] as string } : params[0];
    return (ctor: TCtor): void => {
        solutionInfoList.push({
            ...info,
            ctor: ctor,
            create: () => new ctor()
        });
    };
}

export { solutionInfoList };

