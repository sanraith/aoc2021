import '../solutions';
import { SolutionInfo, solutionInfoList } from './solutionInfo';

class SolutionManager {
    /** Get the solutions in a (day, solutionInfo) map. */
    getSolutionsByDay(): Map<number, SolutionInfo> {
        return new Map(solutionInfoList.map(info => [info.day, info]));
    }

    /** Get the solutions in ascending order by day. */
    getSolutions(): SolutionInfo[] {
        return Array.from(this.getSolutionsByDay().values()).sort((a, b) => a.day - b.day);
    }
}

const solutionManager = new SolutionManager();

export { solutionManager };
