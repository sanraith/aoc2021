import './App.css';

function Calendar() {
    const rows = Array(5).fill(0).map((_, i) =>
        Array(7).fill(0).map((_, j) => i * 7 + j - 1));

    return (<div className="calendar">
        {rows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
                {row.map(col => {
                    if (col >= 1 && col <= 31) {
                        return (<div className="col" key={col}><span>{col}</span></div>);
                    } else {
                        return (<div className="col gray" key={col}><span></span></div>);
                    }
                })}
            </div>
        ))}
    </div>);
}

function App(): JSX.Element {
    return (
        <div className="App">
            <Calendar />
        </div>
    );

}

export default App;
