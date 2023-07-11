'use strict';

const cp = require('child_process');
const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, '../package-lock.json'))) {
  console.log('Deleting package-lock.json...');
  fs.rmSync(path.join(__dirname, '../package-lock.json'));
}

if (!fs.existsSync(path.join(__dirname, '../dist/19937.js'))) {
  console.log('Compiling 19937.js...');
  fs.mkdirSync(path.join(__dirname, '../dist'), { recursive: true });
  cp.execSync('make js', {
    cwd: path.join(__dirname, '..'),
  });
}
