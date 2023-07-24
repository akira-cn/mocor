const Koa = require('koa');
const {bodyParser} = require("@koa/bodyparser");

const {Mock} = require('../lib/index.js');

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
