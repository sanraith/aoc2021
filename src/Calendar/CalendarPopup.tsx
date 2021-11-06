import React, { useEffect, useRef } from 'react';
import CalendarCell from './CalendarCell';
import { getPopupStyle, openPuzzleDescriptionInNewTab, openSourceCodeInNewTab } from './calendarHelpers';

interface PopupProps {
    day: number | null;
    onClosed: () => void;
}

export default function CalendarPopup({ day, onClosed }: PopupProps): JSX.Element {
    const prevDayRef = useRef<number | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const popupGridRef = useRef<HTMLDivElement>(null);
    const style = getPopupStyle(day, prevDayRef.current, 'start', popupGridRef.current);

    // After the initial render, turn on transitions and enlarge popup.
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
                onClosed();
            }
        }
        document.addEventListener('click', onDocumentClick);
        return () => document.removeEventListener('click', onDocumentClick);
    }, [day, onClosed]);

    return (<div key={day} ref={popupRef} className={'popup notransition' + (day ? '' : ' open')} style={style}>
        <div ref={popupGridRef} className='popup-grid'>
            <div className='popup-number'>
                <CalendarCell day={day ?? prevDayRef.current} isCopy={true} />
            </div>
            <div className='popup-title fade'>
                The Tyranny of the Rocket Equation
            </div>
            <div className='spacer'></div>

            {Array(2).fill(0).map((_, partIndex) => (<React.Fragment key={partIndex}>
                <div className='popup-part-label fade'>
                    Part {partIndex + 1}:
                </div>
                <div className='popup-part-result fade'>
                    849272349
                </div>
                <div className='popup-part-performance fade'>
                    123 ms 🕑
                </div>
            </React.Fragment>))}

            <div style={{ height: '10px' }}></div>
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
                <button className='primary' onClick={() => alert('Not implemented yet.')}>
                    Solve 📈
                </button >
            </div>
            <div style={{ height: '10px' }}></div>
        </div>
    </div>);
}
