import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { RuntimeSolution } from '../services/runtimeSolution.service';
import CalendarCell from './CalendarCell';
import { getPopupRect, openPuzzleDescriptionInNewTab, openSourceCodeInNewTab } from './calendarHelpers';
import { Timer } from './Timer';

interface Params {
    runtimeSolution?: RuntimeSolution;
    isOpen: boolean;
    onClose: () => void;
}

export default function CalendarPopup(params: Params): JSX.Element {
    const { isOpen, runtimeSolution, onClose } = params;
    const popupRef = useRef<HTMLDivElement>(null);
    const popupGridRef = useRef<HTMLDivElement>(null);
    /** Stores the elapsed times to display a running clock. */
    const [elapsedTimes, setElapsedTimes] = useState<(number | null)[]>([]);
    /** Stops the timer that updates elapsed time. */
    const stopTimer = useRef<() => void>();
    const [isInputOpen, setIsInputOpen] = useState(false);
    const isOngoing = runtimeSolution?.states.some(x => x.kind === 'progress');
    const day = runtimeSolution?.info.day ?? null;


    /** Run solution in the background and reset the timers. */
    const onSolveClick = useCallback(() => {
        setElapsedTimes([null, null]);
        runtimeSolution?.start();
    }, [runtimeSolution]);

    /** Cancels currently running solution. */
    const onCancelClick = useCallback(() => runtimeSolution?.cancel(), [runtimeSolution]);

    const onInputChange = useCallback((evt: SyntheticEvent<HTMLTextAreaElement>) => {
        console.log(evt);
        runtimeSolution && (runtimeSolution.input = evt.currentTarget.value);
    }, [runtimeSolution]);

    /** Updates the size and position of the popup. */
    const updatePopupRect = useCallback((state: 'closed' | 'opened') => {
        if (!day || !popupRef.current || !popupGridRef.current) { return; }
        const style = getPopupRect(day, state, popupGridRef.current);
        Object.assign(popupRef.current.style, style);
    }, [day]);

    const onShowInputClick = useCallback(() => {
        setIsInputOpen(!isInputOpen);
        setTimeout(() => updatePopupRect('opened'), 0);
    }, [isInputOpen, updatePopupRect]);

    /** Update popup rect if the window is resized */
    useEffect(() => {
        if (!isOpen) { return; }
        const onDocumentResize = () => updatePopupRect('opened');
        window.addEventListener('resize', onDocumentResize);
        return () => window.removeEventListener('resize', onDocumentResize);
    }, [isOpen, updatePopupRect]);

    /** Turn the timer on if the solution is in progress, off otherwise. */
    if (runtimeSolution) {
        if (!stopTimer.current && isOpen && runtimeSolution.states.some(x => x.kind === 'progress')) {
            const interval = setInterval(() => {
                const currentTime = new Date().getTime();
                setElapsedTimes(runtimeSolution.startTimes.map(t => t === null ? null : currentTime - t));
            }, 50);
            stopTimer.current = () => {
                clearInterval(interval);
                stopTimer.current = undefined;
            };
        } else if (stopTimer.current && (!isOpen || runtimeSolution.states.every(x => x.kind !== 'progress'))) {
            stopTimer.current();
        }
    }

    return (<React.Fragment>
        <CSSTransition in={isOpen} classNames='popup' timeout={0}>
            <div className='modal-background' style={{ pointerEvents: isOpen ? 'auto' : 'none' }} onClick={() => onClose()}>&nbsp;</div>
        </CSSTransition>
        <CSSTransition in={isOpen} classNames='popup' timeout={0}
            onEnter={() => updatePopupRect('closed')}
            onEntered={() => updatePopupRect('opened')}
            onExited={() => updatePopupRect('closed')}
        >
            <div ref={popupRef} className='popup' key={day}>
                <div ref={popupGridRef} className='popup-grid'>
                    <div className='popup-number'>
                        <CalendarCell day={day} isCopy={true} />
                    </div>
                    <div className='popup-title fade'>
                        {runtimeSolution?.info.title}
                    </div>
                    <div className='spacer'></div>

                    {[0, 1].map(partIndex => {
                        const solutionState = runtimeSolution?.states[partIndex];
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
                            <button className='secondary' onClick={() => onShowInputClick()}>
                                <span>💽</span> Input
                            </button>
                            <button className='secondary' onClick={() => openSourceCodeInNewTab(day)}>
                                <span>📜</span> Source
                            </button>
                            <button className='secondary' onClick={() => openPuzzleDescriptionInNewTab(day)}>
                                <span>🎄</span> Puzzle
                            </button>
                        </div>
                        <button className={'primary' + (isOngoing ? ' cancel' : '')} onClick={() => isOngoing ? onCancelClick() : onSolveClick()}>
                            {isOngoing ? '❌ Cancel' : '📈 Solve'}
                        </button>
                    </div>
                    <div className='popup-part-input'>
                        <CSSTransition in={isInputOpen} className='input-anim' timeout={0} mountOnEnter={true} unmountOnExit={true}
                            onExited={() => setTimeout(() => updatePopupRect('opened'))}
                        >
                            <div>
                                <span>Puzzle input:</span>
                                <textarea
                                    disabled={(runtimeSolution?.input ?? null) === null}
                                    onChange={value => onInputChange(value)}
                                >{runtimeSolution?.input}</textarea>
                            </div>
                        </CSSTransition>
                    </div>
                    <div style={{ height: '10px' }}></div>
                </div>
            </div>
        </CSSTransition>
    </React.Fragment>);
}
