import './App.css';
import Calendar from './calendar/Calendar';
import { container, ContainerContext } from './services/container';

function App(): JSX.Element {
    return (
        <ContainerContext.Provider value={container}>
            <div className="App">
                <Calendar />
            </div>
        </ContainerContext.Provider>
    );
}

export default App;
