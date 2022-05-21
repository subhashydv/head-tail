const { readFileSync } = require('fs');
const { headMain } = require('./src/headLib.js');

// console.log('usage: head [-n lines | -c bytes] [file ...]');

console.log(headMain(readFileSync, process.argv[2]));
