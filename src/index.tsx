import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import './index.css';
import App from './web/App';
import reportWebVitals from './reportWebVitals';
import { container, ContainerContext } from './web/services/container';
import { EventDay } from './web/calendar/calendarHelpers';
import Day13Fold from './web/visualizations/day13';

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
                <Switch>
                    <Route exact path="/day/13/fold">
                        <Day13Fold />
                    </Route>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </ContainerContext.Provider>
        </BrowserRouter>
    </React.StrictMode >,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
