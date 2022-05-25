const { readFileSync } = require('fs');
const { tailMain } = require('./src/tail/tailLib.js');
// console.log('usage: tail [-c # | -n #] [file ...]');

console.log(tailMain(readFileSync, process.argv[2]));
