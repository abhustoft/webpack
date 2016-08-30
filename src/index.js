import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.jsx';
import greet from './js/greet';

// To test moving a file
import feet from './tull.tst';


// Build mode from webpack
if (PROD) { // eslint-disable-line no-undef
  require('./style/greet-prod.css'); // eslint-disable-line global-require
} else {
  require('./style/greet-dev.css'); // eslint-disable-line global-require
}

greet('Webpack');

ReactDOM.render(
  <Hello name='World'/>,
    document.getElementById('root')
);
