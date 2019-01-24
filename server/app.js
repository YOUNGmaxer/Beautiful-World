// 引入别名
require('module-alias/register');

const Koa = require('koa');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const webpackConfig = require('../webpack.dev');
const router = require('./routers/index');
const bodyParser = require('koa-bodyparser');
const history = require('./middlewares/koa2-connect-history-api-fallback');
const compress = require('koa-compress');

const app = new Koa();
const compiler = webpack(webpackConfig);

const wdm = webpackDevMiddleware(compiler, {
  noInfo: true
});

app
  .use(wdm)
  .use(webpackHotMiddleware(compiler));

app.use(bodyParser());

app.use(compress({
  threshold: 2048
}));

// 此处主要是处理 vue-router 的 history 模式
// 注意：位置需要放在路由前面
app.use(history({
  verbose: true, // 转发日志
  rewrites: [
    {
      from: /\/api/,
      to: context => {
        return context.parsedUrl.pathname;
      }
    }
  ]
}));

app.use(router.routes(), router.allowedMethods());

app.listen(3001);
console.log('[demo] koa server is starting at port 3001');
