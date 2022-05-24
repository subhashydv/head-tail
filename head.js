const { readFileSync } = require('fs');
const { headMain, printOutput, head } = require('./src/headLib.js');
const { log, error } = console;

// console.log('usage: head [-n lines | -c bytes] [file ...]');
try {
  printOutput(log, error, headMain(readFileSync, ...process.argv.slice(2)));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
