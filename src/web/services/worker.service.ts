import { Observable, Subscriber } from 'rxjs';
import { EventDispatcher, IEventManagement } from 'strongly-typed-events';
import { SolutionState } from '../../core/solutionState';
import SolveRequest from './solveRequest';

type WorkerInfo = { isAvailable: boolean, worker: Worker; };
type QueuedWork = { subscriber?: Subscriber<SolutionState>, workerInfo?: WorkerInfo, isTerminated: boolean; };

/** Manages solution web-workers. */
export default class WorkerService {
    private maxWorkerCount = 1;
    private preparedWorkerCount = 1;
    private workerList: WorkerInfo[] = [];

    private _onWorkerAvailable = new EventDispatcher<unknown, WorkerInfo>();
    private get onWorkerAvailable() { return this._onWorkerAvailable.asEvent(); }

    constructor() {
        this.workerList = Array(this.preparedWorkerCount).fill(0).map(() => ({ isAvailable: false, worker: undefined! }));
        setTimeout(() => {
            for (const workerInfo of this.workerList.filter((_, i) => i < this.preparedWorkerCount)) {
                workerInfo.worker = this.createWorker();
                this.makeWorkerAvailable(workerInfo);
            }
        });
    }

    solveAsync(day: number, input: string): Observable<SolutionState> {
        const queuedWork: QueuedWork = { isTerminated: false };

        return new Observable<SolutionState>(subscriber => {
            queuedWork.subscriber = subscriber;

            this.getAvailableWorkerAsync().then(workerInfo => {
                if (queuedWork.isTerminated) {
                    this.makeWorkerAvailable(workerInfo);
                    return;
                }

                queuedWork.workerInfo = workerInfo;
                const worker = workerInfo.worker;

                worker.onmessage = ({ data }: { data: SolutionState; }) => {
                    if (data.part > 0) {
                        subscriber.next(data);
                    } else {
                        subscriber.complete();
                    }
                };

                worker.postMessage(<SolveRequest>{ day, input });
            });

            return () => this.cancel(queuedWork);
        });
    }

    private cancel(queuedWork: QueuedWork): void {
        queuedWork.isTerminated = true;
        const { workerInfo, subscriber } = queuedWork;
        if (workerInfo) {
            workerInfo.worker.terminate();
            workerInfo.worker = this.createWorker();
            this.makeWorkerAvailable(workerInfo);
        }
        if (subscriber) {
            subscriber.complete();
        }
    }

    private makeWorkerAvailable(workerInfo: WorkerInfo): void {
        workerInfo.worker.onmessage = null;
        workerInfo.isAvailable = true;
        this._onWorkerAvailable.dispatch(this, workerInfo);
    }

    private getAvailableWorkerAsync(): Promise<WorkerInfo> {
        return new Promise((resolve) => {
            // Try to find an available worker
            const workerInfo = this.workerList.find(x => x.isAvailable);
            if (workerInfo) {
                workerInfo.isAvailable = false;
                resolve(workerInfo);
                return;
            }

            // Create a new one if possible
            if (this.workerList.length < this.maxWorkerCount) {
                const workerInfo = { isAvailable: false, worker: this.createWorker() };
                this.workerList.push(workerInfo);
                resolve(workerInfo);
                return;
            }

            // Wait for an available one
            this.onWorkerAvailable.sub((_sender: unknown, workerInfo: WorkerInfo, event: IEventManagement) => {
                if (workerInfo.isAvailable) {
                    event.unsub();
                    workerInfo.isAvailable = false;
                    resolve(workerInfo);
                }
            });
        });
    }

    private createWorker(): Worker {
        return new Worker(new URL('./solution.worker', import.meta.url), { type: 'module' });
    }
}
