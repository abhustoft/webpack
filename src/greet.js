const moment = require('moment'); // Add momentjs

function greet(who) {
    console.log(`Hello ${who} from greet.js, it's ${moment().format('h:mm:ss a')} !`);
};

module.exports = greet;  