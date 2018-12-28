const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../../dist/index.html');

router
  .get('/', (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(indexPath);
  });

module.exports = router;
