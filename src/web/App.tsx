import './App.css';
import Calendar from './calendar/Calendar';

function App(): JSX.Element {
    return (
        <div className="App">
            <div className='header'>
                <h1 style={{ marginBottom: 0 }}>Advent of Code 2021 solutions</h1>
                <h2 style={{ marginTop: '10px' }}>by Soma Zsják</h2>
            </div>
            <Calendar />
            <div className='footer'>
                Background image by <a href='https://all-free-download.com/free-vector/download/winter_background_311052.html'>all-free-download.com</a>
            </div>
        </div>
    );
}

export default App;
