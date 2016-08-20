// Build mode from webpack
if (PROD) {
    require('./style/greet-prod.css');
} else {
    require('./style/greet-dev.css');
}

import greet from './greet';

greet('Webpack');