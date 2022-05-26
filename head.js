const fs = require('fs');
const { headMain, printOutput } = require('./src/head/headLib.js');

try {
  printOutput(console, headMain(fs.readFileSync, ...process.argv.slice(2)));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
