if (PROD) {
    require('./greet-prod.css');
} else {
    require('./greet.css');
}

const greet = require('./greet');   // Import the greet function

greet('Webpack');