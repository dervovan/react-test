import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Game from './App';
import registerServiceWorker from './registerServiceWorker';

console.log(document.getElementsByClassName('part-block'));
[].forEach.call(document.getElementsByClassName('part-block'), (block) => ReactDOM.render(<Game />, block));

// ReactDOM.render(<Game />, document.getElementById('block-0-0'));
// ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
