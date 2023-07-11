'use strict';

const rand = require('./wrapper');

class Mt19937 {
  constructor(seed, min, max) {
    seed = seed || 0;
    min = min || 0;
    max = max === undefined ? rand.MAX_INT : max;

    this.destroyed = false;
    Object.defineProperty(this, 'generator', {
      enumerable: false,
      writable: false,
      configurable: false,
      value: rand.createRand(min, max, seed),
    });
  }

  next() {
    if (this.destroyed) {
      throw new Error('This generator was destroyed.');
    }

    return rand.generate(this.generator);
  }

  destroy() {
    if (this.destroyed) return;
    rand.freeRand(this.generator);
    this.destroyed = true;
  }
}

module.exports = Mt19937;
