import { useEffect, useState } from 'react';
import { clearInterval, setInterval } from 'timers';
import './App.css';
import Calendar from './calendar/Calendar';

const clocks = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕧', '🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦'];

function App(): JSX.Element {
    const [clock, setClock] = useState('');
    useEffect(() => {
        const startTime = performance.now();
        const intervalId = setInterval(() => {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const icon = clocks[Math.floor((elapsedTime % 1000) / 1000 * 12)];
            setClock(`${Math.floor(elapsedTime)} ms ${icon}`);

            if (elapsedTime > 500) {
                console.log('lol', intervalId);
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App">
            <Calendar />
            <span>{clock}</span>
        </div>
    );
}

export default App;
