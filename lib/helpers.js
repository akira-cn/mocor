const { randomUUID: gUUID } = require('node:crypto');
const generate = require('./generate.js');

function randomFloat(from = 0, to = 1) {
  return () => from + Math.random() * (to - from);
}

function randomInteger(from = 0, to = 1000) {
  return () => Math.floor(randomFloat(from, to)());
}

function randomUUID() {
  return () => gUUID({ disableEntropyCache: true });
}

function randomID() {
  return () => Math.random().toString(36).slice(2, 10);
}

function repeat(schema, min = 3, max = min) {
  const times = min + Math.floor((max - min) * Math.random());
  return new Array(times).fill(schema);
}

function param(name, type = 'any', defaultValue = null, info = ' ') {
  return ({params, context, mock}) => {
    mock.param(context.method, {name, type, defaultValue, info});
    return params ? params[name] : defaultValue;
  };
}

function randomLatinLetter() {
  return () => {
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    letters = `${letters.toUpperCase()}${letters}`;
    return letters[Math.floor(Math.random() * letters.length)];
  };
}

function randomLatinWord(minLetters = 3, maxLatters = 12) {
  return () => {
    const arr = (new Array(randomInteger(minLetters, maxLatters)())).fill();
    return arr.map(() => randomLatinLetter()()).join('');
  };
}

function randomString(len = 16) {
  return randomLatinWord(len, len);
}

function join(list, joint = '') {
  return () => generate(list).join(joint);
}

function randomLatinParagraph(minWords = 10, maxWords = 40) {
  return join(repeat(randomLatinWord(), minWords, maxWords), ' ');
}

function randomLatinArticle(minParagraph = 3, maxParagraph = 10) {
  return join(repeat(randomLatinParagraph(), minParagraph, maxParagraph), '\n');
}

function randomChineseName() {
  return () => require('chinese-random-name').generate();
}

function randomChineseParagraph() {
  return () => require('bullshit-generator-js').default(500, 500)[0];
}

function randomChineseArticle(min = 200, max = 800) {
  return () => require('bullshit-generator-js').default(min, max).join('\n');
}

function randomPick(...list) {
  return () => list[Math.floor(Math.random() * list.length)];
}

function randomPickWeight(...list) {
  return () => {
    const total = list.reduce((acc, {weight}) => acc + weight, 0);
    const rand = Math.random() * total;
    let acc = 0;
    for(let i = 0; i < list.length; i++) {
      const {weight, value} = list[i];
      if(rand < acc + weight) {
        return value;
      }
      acc += weight;
    }
  };
}

function randomDate(from = new Date(0), to = new Date()) {
  return () => {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    const rand = Math.random();
    return new Date(fromTime + rand * (toTime - fromTime));
  };
}

function poll(...list) {
  let index = 0;
  return () => {
    const ret = list[index];
    index = (index + 1) % list.length;
    return ret;
  };
}
    

module.exports = {
  param,
  repeat,
  join,
  poll,
  randomFloat,
  randomInteger,
  randomUUID,
  randomID,
  randomString,
  randomLatinLetter,
  randomLatinWord,
  randomLatinParagraph,
  randomLatinArticle,
  randomChineseName,
  randomChineseParagraph,
  randomChineseArticle,
  randomPick,
  randomPickWeight,
  randomDate,
};
