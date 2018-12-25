const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const app = new Koa();
const router = new Router();

// 注册路由
router.get('/', async (ctx) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(path.resolve(__dirname, '../dist/index.html'));
});

// const main = ctx => {
//   ctx.response.type = 'html';
//   ctx.response.body = fs.createReadStream(path.resolve(__dirname, 'dist/index.html'));
// };

app
  .use(router.routes()) // 添加路由中间件
  .use(router.allowedMethods()); // 对请求进行一些限制处理

app.listen(3001);
console.log('[demo] koa server is starting at port 3001');
