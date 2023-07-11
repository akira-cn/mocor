'use strict';

const _rand = require('../dist/19937');

module.exports = {
  MAX_INT: _rand._ReturnNumericLimits(),

  createRand: _rand._CreateRand,
  freeRand: _rand._FreeRand,
  generate: _rand._Generate,
};
