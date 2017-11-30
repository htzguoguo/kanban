/**
 * Created by Administrator on 2017-11-16.
 */

/*import './main.css';*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

persist(alt, storage, 'app');


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
