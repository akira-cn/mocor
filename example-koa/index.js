const Koa = require('koa');
const { bodyParser } = require("@koa/bodyparser");

const { Mock, param, randomPick, randomPickWeight, randomDate, repeat, join, poll } = require('../lib/index.js');

const app = new Koa();

const mock = new Mock('FOO', 'This is a example.');

const inc = () => {
  let n = 0;
  return () => n++;
};

mock.use(({context}) => {
  const method = context.method;
  return repeat({
    name: 'akira',
    t: param('t', 'number', '123456', 'randomValue'),
    method,
    kk: join(repeat(randomPick('a', 'b', 'c'), 100)),
    kkk: join(repeat(
      randomPickWeight({weight: 10, value: 'a'}, {weight: 90, value: 'b'}), 
    100)),
    p: poll(1, 2, 3),
    k: inc(),
    d: randomDate(),
    rr: /a/g,
  }, 3);
}, {
  response: {
    name: ['string', "student's name"],
    t: ['integer', 'random number'],
  },
  allowMethods: ['GET','POST']
});

app
  .use(bodyParser())
  .use(async (ctx, next) => {
    const params = ctx.method === 'GET' ? ctx.query : ctx.request.body;
    const result = await mock.execute(params, ctx);
    if(ctx.response.headers['content-type'] === 'application/json') {
      ctx.body = JSON.stringify(result);
    } else {
      ctx.body = result;
    }
  });

app.listen(3000);
