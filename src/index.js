import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { store } from './store/index.js';

const render = () => ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ), document.getElementById('root'));


// store.subscribe(render);


ReactDOM.render((
<BrowserRouter>
    <App />
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
