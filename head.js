const { readFileSync } = require('fs');
const { headMain } = require('./src/headLib.js');

// console.log('usage: head [-n lines | -c bytes] [file ...]');
try {
  console.log(headMain(readFileSync, ...process.argv.slice(2)));
} catch (error) {
  console.log(error.message);
}
