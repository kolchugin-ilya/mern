import React from 'react';
import ReactDOM from 'react-dom';
import {indexStore} from "./store/indexStore";
import App from "./App";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={indexStore}>
                <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));