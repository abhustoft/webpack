import greet from './greet';

const moment = require('moment'); // Add momentjs

function shout(who) {
    console.log(`HELLOOO ${who} from shout.js, it's ${moment().format('h:mm:ss a')} !`);
}

greet('Greeting from shout.js');
shout('WebPacking from shout.js');
