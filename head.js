const { readFileSync } = require('fs');
const { headMain, printOutput } = require('./src/head/headLib.js');
const { log, error } = console;

try {
  printOutput(log, error, headMain(readFileSync, ...process.argv.slice(2)));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
