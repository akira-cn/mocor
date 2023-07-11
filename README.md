# Mocor

[👉 中文文档](README-CN.md)

Mocor is the most convenient API mocking tool.

- Extremely easy to use.
- Automatically generates API documentation.
- Works even better when combined with [AirCode](https://aircode.io).

## Getting started

1. Can be integrated locally with [Koa](https://koajs.com/):

```js
const Koa = require('koa');
const {bodyParser} = require("@koa/bodyparser");

const {Mock} = require('mocor');

const app = new Koa();

const mock = new Mock();

mock.use({
  hello: 'mocor',
}, {
  allowMethods: ['GET','POST']
});

app
  .use(bodyParser())
  .use(async (ctx) => {
    const params = ctx.method === 'GET' ? ctx.query : ctx.request.body;
    const result = await mock.execute(params, ctx);
    if(ctx.response.headers['content-type'] === 'application/json') {
      ctx.body = JSON.stringify(result);
    } else {
      ctx.body = result;
    }
  });

app.listen(3000);
```

Accessing http://localhost:3000 will allow you to see the API page.

![](https://pkxfpp.hk.aircodecdn.com/1689041097893.1689041115149_kl23ddnl3f.jpg)

2. With AirCode (recommended):

```js
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {Mock} = require('mocor');

const mock = new Mock('hello', 'This is a demo api generated by mocor.');

mock.post({
  message: 'Hi, Mocor',
});

module.exports = mock.compile();
```

![](https://pkxfpp.hk.aircodecdn.com/1689041794483.1689041841020_vdq7d2n7vyp.jpg)

## Data Mocking API

Mocor provides powerful API generation helper functions to generate various types of data. Here are the built-in helper functions in Mocor:

- randomFloat(from = 0, to = 1)
  - Generates a random floating-point number within a specified range.
- randomInteger(from = 0, to = 1000)
  - Generates a random integer within a specified range.
- randomString(len = 16)
  - Generates a random string with a specified length.
- randomUUID()
  - Generates a random UUID string.
- randomDate(from = new Date(0), to = new Date())
  - Generates a random date within a specified time range.
- repeat(schema, min = 3, max = min)
  - Repeats a specified schema a certain number of times and generates a list.
- join(list, joint = '')
  - Joins a list of elements into a string with a specified separator.

These helper functions can be used within Mocor to generate dynamic data for your API endpoints.

### Example 1

The following [example](https://5s6yh6diyc.us.aircode.run/chinese-students) generates 5 to 10 student records, including their names, IDs, and grades.

```js
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {Mock, repeat, randomInteger, randomUUID} = require('mocor');

const mock = new Mock('random list', 'This is a demo api generated by mocor.');

const genName = () => {
  let i = 0;
  return () => `student${i++}`;
}

mock.use(repeat({
  name: genName(),
  score: randomInteger(0, 101),
  id: randomUUID(),
}, 5, 10), {
  allowMethods: ['GET', 'POST'],
});

module.exports = mock.compile();
```

- randomLatinLetter()
  - Generates a random Latin (English) letter.
- randomLatinWord(minLetters = 3, maxLatters = 12)
  - Generates a word with a specified range of letter counts.
- randomLatinParagraph(minWords = 10, maxWords = 40)
  - Generates a paragraph consisting of a certain number of words.
- randomLatinArticle(minParagraph = 3, maxParagraph = 10)
  - Generates an article with a certain number of paragraphs.
- randomChineseName()
  - Generates a random Chinese name.
- randomChineseParagraph()
  - Generates a random Chinese paragraph.
- randomChineseArticle(min = 200, max = 800)
  - Generates a random Chinese article with a specific number of characters.

### Example 2

The following [example](https://5s6yh6diyc.us.aircode.run/chinese-students) generates Chinese student information:

```js
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {Mock, repeat, randomInteger, randomUUID, randomChineseName, randomChineseArticle} = require('mocor');

const mock = new Mock('chinese students', 'This is a demo api generated by mocor.');

mock.use(repeat({
  name: randomChineseName(),
  scores: repeat(randomInteger(50, 101), 5),
  id: randomUUID(),
  comment: randomChineseArticle(),
}, 5, 10), {
  allowMethods: ['GET', 'POST'],
});

module.exports = mock.compile();
```

- param(name, type = 'any', defaultValue = null, info = ' ')
  - Generates data based on the passed parameter.
- randomPick(...list)
  - Retrieves a random value from an array with equal probability.
- randomPickWeight(...list)
  - Randomly retrieves a value based on the weight assigned to each item.
- poll(...list)
  - Cycles through the values in an array.

### Example 3

The following [example](https://5s6yh6diyc.us.aircode.run/param) returns different data based on different parameters:

```js
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {Mock, param} = require('mocor');

const mock = new Mock('params', 'This is a demo api generated by mocor.');

mock.post((args) => {
  const type = param('type', 'string', 'odd', 'get numbers even or odd')(args);
  if(type === 'odd') return [1, 3, 5, 7, 9];
  return [0, 2, 4, 6, 8];
});

module.exports = mock.compile();
```

### Example 4

The following [example](https://5s6yh6diyc.us.aircode.run/paged) simulates 35 pagination data entries and returns different data items based on the value of the `page` parameter:

```js
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {Mock, param, repeat, randomChineseName, randomInteger} = require('mocor');

const mock = new Mock('params', 'This is a demo api generated by mocor.');

mock.post((args) => {
  const total = 32;
  const pn = param('pn', 'number', 1, 'the page number')(args);
  const n = Math.min(10, Math.max(0, total - (pn - 1) * 10));
  return repeat({
    name: randomChineseName(),
    score: randomInteger(),
  }, n);
});

module.exports = mock.compile();
```

### Example 5

The following [example](https://5s6yh6diyc.us.aircode.run/random-error) simulates an error with a certain probability:

```js
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {Mock, repeat, randomChineseName, randomInteger} = require('mocor');

const mock = new Mock('Random error', 'This is a demo api generated by mocor.');

mock.post(({context}) => {
  if(Math.random() > 0.5) {
    context.status(500);
    return {
      error: 'fatal error',
    }
  }
  return repeat({
    name: randomChineseName(),
    score: randomInteger(),
  }, 5);
});

module.exports = mock.compile();
```

## Advanced Usage

If you want to debug using mock data first and then switch to the production environment seamlessly in AirCode, you can follow these steps:

First, create a mock environment cloud function named `student-mock.js` in AirCode.

```js
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {Mock, repeat, randomInteger, randomUUID, randomChineseName, randomChineseArticle} = require('mocor');

const mock = new Mock('chinese students', 'This is a demo api generated by mocor.');

mock.use(repeat({
  name: randomChineseName(),
  scores: repeat(randomInteger(50, 101), 5),
  id: randomUUID(),
  comment: randomChineseArticle(),
}, 5, 10), {
  allowMethods: ['GET', 'POST'],
});

module.exports = mock.compile();
```

Then, create the production environment file `student.js ` using the following code:

```js
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {mocking} = require('mocor');

module.exports = mocking(require('./student-mock.js'),
  async function (params, context) {
    console.log('Received params:', params);
    return {
      message: 'Hi, AirCode.',
    };
  });
```


So accessing the production API can be done by setting the HTTP request header `x-motor` to a value of 1, which will allow you to use mock data. If the `x-motor` header is not set, the API will return real data.

Meanwhile, you can still access the API [documentation](https://5s6yh6diyc.us.aircode.run/student) through the cloud function that generates mock data.
