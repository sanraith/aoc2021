import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ContainerContext } from '../services/container';
import solutionManager from '../core/solutionManager';
import CalendarCell from './CalendarCell';
import { EventDay, getPopupStyle, openPuzzleDescriptionInNewTab, openSourceCodeInNewTab } from './calendarHelpers';
import { SolutionState } from '../core/solutionState';
import { Timer } from './Timer';

const solutionsByDay = solutionManager.getSolutionsByDay();

interface PopupProps {
    day: EventDay | null;
    onClosed: () => void;
}
export default function CalendarPopup({ day, onClosed }: PopupProps): JSX.Element {
    const prevDayRef = useRef<number | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const popupGridRef = useRef<HTMLDivElement>(null);
    const style = getPopupStyle(day, prevDayRef.current, 'start', popupGridRef.current);
    const visualizedDay = day ?? prevDayRef.current ?? 0;

    const { runtimeSolutionService } = useContext(ContainerContext);
    const [solutionStates, setSolutionStates] = useState<[SolutionState, SolutionState] | null>(null);
    const [elapsedTimes, setElapsedTimes] = useState<(number | null)[]>([]);
    /** Stops the timer that updates elapsed time. */
    const stopTimer = useRef<() => void>();
    /** Unsubscribes from solution state updates. */
    const unsubSolutionRef = useRef<() => void>();
    const runtimeSolution = day ? runtimeSolutionService.runtimeSolutions.get(day) : null;
    const isOngoing = runtimeSolution?.states.some(x => x.kind === 'progress');

    /** Clear subscriptions and timers. */
    const cleanupSubscriptions = useCallback(() => {
        unsubSolutionRef.current && unsubSolutionRef.current();
        stopTimer.current && stopTimer.current();
        setElapsedTimes([null, null]);
    }, []);

    /** Run solution in the background and turn on timer. */
    const onSolveClick = useCallback(() => {
        setElapsedTimes([null, null]);
        runtimeSolution?.start();
    }, [runtimeSolution]);

    /** Cancels currently running solution. */
    const onCancelClick = useCallback(() => runtimeSolution?.cancel(), [runtimeSolution]);

    /** Turns the timer on if the solution is in progress, off otherwise. */
    const startStopTimerIfNeeded = useCallback(() => {
        if (!runtimeSolution) { return; }
        if (!stopTimer.current && runtimeSolution.states.some(x => x.kind === 'progress')) {
            const interval = setInterval(() => {
                const currentTime = new Date().getTime();
                setElapsedTimes(runtimeSolution.startTimes.map(t => t === null ? null : currentTime - t));
            }, 50);
            stopTimer.current = () => {
                clearInterval(interval);
                stopTimer.current = undefined;
            };
        } else if (stopTimer.current && runtimeSolution.states.every(x => x.kind !== 'progress')) {
            stopTimer.current();
        }
    }, [runtimeSolution]);

    // After the initial render, turn on transitions, enlarge popup, reset solve states.
    useEffect(() => {
        if (!popupRef.current) { return; }
        popupRef.current.classList.remove('notransition');
        if (day) {
            popupRef.current.classList.add('open');
        } else {
            popupRef.current.classList.remove('open');
        }
        Object.assign(popupRef.current.style, getPopupStyle(day, prevDayRef.current, 'end', popupGridRef.current));
        prevDayRef.current = day;

        // Clear previous state on open
        if (day && runtimeSolution) {
            // Cancel previous subscriptions
            cleanupSubscriptions();

            // Init new subscriptions
            startStopTimerIfNeeded();
            unsubSolutionRef.current = runtimeSolution.onChange.subscribe(() => {
                setSolutionStates([...runtimeSolution.states]);
                startStopTimerIfNeeded();
            });
            setSolutionStates([...runtimeSolution.states]);
            document.addEventListener('click', onDocumentClick);
        }

        function onDocumentClick(e: MouseEvent) {
            const calendar = document.getElementById('calendar')!;
            const isOutsideClick = popupRef.current && !popupRef.current.contains(e.target as Node) && !calendar.contains(e.target as Node);
            const isSelectionEvent = !!window.getSelection()?.toString();
            if (!isSelectionEvent && isOutsideClick) {
                cleanupSubscriptions();
                onClosed();
            }
        }

        return () => document.removeEventListener('click', onDocumentClick);
    }, [cleanupSubscriptions, day, onClosed, runtimeSolution, startStopTimerIfNeeded]);

    return (<React.Fragment>
        <div className={'modal-background' + (day ? ' open' : '')} style={{ display: day ? 'block' : 'none' }}>&nbsp;</div>
        <div key={day} ref={popupRef} className={'popup notransition' + (day ? '' : ' open')} style={style}>
            <div ref={popupGridRef} className='popup-grid'>
                <div className='popup-number'>
                    <CalendarCell day={visualizedDay} isCopy={true} />
                </div>
                <div className='popup-title fade'>
                    {solutionsByDay.get(visualizedDay)?.title}
                </div>
                <div className='spacer'></div>

                {Array(2).fill(0).map((_, partIndex) => {
                    const solutionState = solutionStates ? solutionStates[partIndex] : null;
                    let result: string | null = null;
                    let timeMs = elapsedTimes[partIndex] ?? null;
                    switch (solutionState?.kind) {
                        case 'result':
                            result = solutionState.result;
                            timeMs = solutionState.timeMs;
                            break;
                        case 'error':
                            result = solutionState.message;
                            timeMs = solutionState.timeMs;
                            break;
                        case 'not_started': result = '-'; break;
                        case 'progress': {
                            const percentage = solutionState.progress * 100;
                            result = 'Working on it... ' + (percentage < 0.01 ? '' : percentage.toFixed(0) + ' %');
                            break;
                        }
                        case 'canceled': result = 'Canceled.'; break;
                    }

                    return (<React.Fragment key={partIndex}>
                        <div className='popup-part-label fade'>
                            Part {partIndex + 1}:
                        </div>
                        <div className='popup-part-result fade'>
                            {result}
                        </div>
                        <div className='popup-part-performance fade'>
                            <Timer valueMs={timeMs} />
                        </div>
                    </React.Fragment>);
                })}

                <div style={{ height: '20px' }}></div>
                <div className='popup-part-footer fade'>
                    <div className='collapsible'>
                        <button className='secondary' onClick={() => alert('Not implemented yet.')}>
                            <span>💽</span> Input
                        </button>
                        {/* TODO Change link from dev to main */}
                        <button className='secondary' onClick={() => openSourceCodeInNewTab(day)}>
                            <span>📜</span> Source
                        </button>
                        {/* TODO Change link from 2020 to 2021 */}
                        <button className='secondary' onClick={() => openPuzzleDescriptionInNewTab(day)}>
                            <span>🎄</span> Puzzle
                        </button>
                    </div>
                    <button className={'primary' + (isOngoing ? ' cancel' : '')} onClick={() => isOngoing ? onCancelClick() : onSolveClick()}>
                        {isOngoing ? '❌ Cancel' : '📈 Solve'}
                    </button>
                </div>
                <div style={{ height: '10px' }}></div>
            </div>
        </div>
    </React.Fragment >);
}
