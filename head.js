const fs = require('fs');
const { headMain, printOutput } = require('./src/head/headLib.js');

const main = (args) => {
  try {
    printOutput(console, headMain(fs.readFileSync, ...args));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main(process.argv.slice(2));
