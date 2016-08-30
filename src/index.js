import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.jsx';
import greet from './js/greet';

// To test moving a file
import feet from './tull.tst'; // eslint-disable-line no-unused-vars


// Build mode from webpack
if (PROD) { // eslint-disable-line no-undef
    require('./style/greet-prod.css'); // eslint-disable-line global-require
} else {
    require('./style/greet-dev.css'); // eslint-disable-line global-require
}

greet('Webpack');

ReactDOM.render(
  <Hello name="World" />, // eslint-disable-line react/jsx-filename-extension
    document.getElementById('root') // eslint-disable-line no-undef
);
