import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, useParams } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { container, ContainerContext } from './services/container';
import { EventDay } from './calendar/calendarHelpers';

function RouteParser(): null {
    const { routerService } = useContext(ContainerContext);
    const params = useParams() as { page: string; };
    const pageNumber = parseInt(params.page);

    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 25) {
        routerService.clearRoute();
    } else {
        routerService.day = pageNumber as EventDay;
    }

    return null;
}

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ('msMaxTouchPoints' in navigator && (navigator as any).msMaxTouchPoints > 0);

if (!isTouchDevice) {
    document.body.classList.add('no-touch');
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ContainerContext.Provider value={container}>
                <Route path="/day/:page" >
                    <RouteParser />
                </Route>
                <App />
            </ContainerContext.Provider>
        </BrowserRouter>
    </React.StrictMode >,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
