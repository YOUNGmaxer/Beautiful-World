const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

router
  .get('/', (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('../../dist/index.html');
  })
  .get('/main/:tabName?', (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(path.join(__dirname, '../../dist/index.html'));
  })
  .get('/user', (ctx) => {
    console.log('/user');
    ctx.response.type = 'html';
    ctx.response.body = '/user Hello world';
  })
  .get('/home', (ctx) => {
    console.log('/home');
    ctx.response.type = 'html';
    ctx.response.body = '/home Hello world';
  });

module.exports = router;
