import React, { useContext, useEffect, useRef, useState } from 'react';
import { ContainerContext } from '../services/container';
import solutionManager from '../core/solutionManager';
import CalendarCell from './CalendarCell';
import { EventDay, getPopupStyle, openPuzzleDescriptionInNewTab, openSourceCodeInNewTab } from './calendarHelpers';
import { SolutionState } from '../core/solutionProgress';
import { Timer } from './Timer';

interface PopupProps {
    day: EventDay | null;
    onClosed: () => void;
}

const solutionsByDay = solutionManager.getSolutionsByDay();

export default function CalendarPopup({ day, onClosed }: PopupProps): JSX.Element {
    const prevDayRef = useRef<number | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const popupGridRef = useRef<HTMLDivElement>(null);
    const cancelOngoingRef = useRef<() => void>();
    const [solutionStates, setSolutionStates] = useState<SolutionState[]>([]);
    const [timers, setTimers] = useState<number[]>([]);
    const style = getPopupStyle(day, prevDayRef.current, 'start', popupGridRef.current);
    const visualizedDay = day ?? prevDayRef.current ?? 0;
    const { workerService, inputService } = useContext(ContainerContext);

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
        if (day) {
            setSolutionStates([]);
            setTimers([]);
        }
    }, [day]);

    // Close popup when user clicks outside or an empty inside area
    useEffect(() => {
        if (!day) { return; }

        function onDocumentClick(e: MouseEvent) {
            const calendar = document.getElementById('calendar')!;
            const isOutsideClick = popupRef.current && !popupRef.current.contains(e.target as Node) && !calendar.contains(e.target as Node);
            const isEmptyInsideClick = e.target === popupRef.current || e.target === popupGridRef.current;
            const isSelectionEvent = !!window.getSelection()?.toString();
            if (!isSelectionEvent && (isOutsideClick || isEmptyInsideClick)) {
                cancelOngoingRef.current && cancelOngoingRef.current();
                onClosed();
            }
        }
        document.addEventListener('click', onDocumentClick);
        return () => document.removeEventListener('click', onDocumentClick);
    }, [day, onClosed]);

    /** Run solution in the background and turn on timer. */
    const onSolveClick = async (day: EventDay | null) => {
        if (!day) { return; }
        const input = await inputService.getInput(day);
        if (input === null) {
            console.error(`Could not load input for day ${day}!`);
            return;
        }

        const solutionStates: SolutionState[] = [];
        const timers: number[] = [0];
        let startTime = performance.now();

        const timerInterval = setInterval(() => {
            timers[timers.length - 1] = Math.floor(performance.now() - startTime);
            setTimers([...timers]);
        }, 50);

        const subscription = workerService.solveAsync(day, input).subscribe({
            next: state => {
                if (state.type === 'result' || state.type === 'error') {
                    startTime = performance.now();
                    timers.push(0);
                }

                if (solutionStates.length < state.part) {
                    solutionStates.push(state);
                } else {
                    solutionStates[state.part - 1] = state;
                }
                setSolutionStates([...solutionStates]);
            },
            complete: () => clearInterval(timerInterval)
        });
        cancelOngoingRef.current = () => {
            subscription.unsubscribe();
            clearInterval(timerInterval);
        };
    };

    return (<div key={day} ref={popupRef} className={'popup notransition' + (day ? '' : ' open')} style={style}>
        <div ref={popupGridRef} className='popup-grid'>
            <div className='popup-number'>
                <CalendarCell day={visualizedDay} isCopy={true} />
            </div>
            <div className='popup-title fade'>
                {solutionsByDay.get(visualizedDay)?.title}
            </div>
            <div className='spacer'></div>

            {Array(2).fill(0).map((_, partIndex) => {
                const solutionState = solutionStates[partIndex] as SolutionState | undefined;
                const result = solutionState?.type === 'result' ? solutionState.result : null;
                const error = solutionState?.type === 'error' ? solutionState.message : null;
                const timeMs = (solutionState && solutionState.type !== 'progress') ? solutionState.timeMs : timers[partIndex] ?? null;

                return (<React.Fragment key={partIndex}>
                    <div className='popup-part-label fade'>
                        Part {partIndex + 1}:
                    </div>
                    <div className='popup-part-result fade'>
                        {result ?? error}
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
                        <span>💻</span> Source
                    </button>
                    {/* TODO Change link from 2020 to 2021 */}
                    <button className='secondary' onClick={() => openPuzzleDescriptionInNewTab(day)}>
                        <span>📜</span> Puzzle
                    </button>
                </div>
                <button className='primary' onClick={() => onSolveClick(day)}>
                    📈 Solve
                </button>
            </div>
            <div style={{ height: '10px' }}></div>
        </div>
    </div>);
}
