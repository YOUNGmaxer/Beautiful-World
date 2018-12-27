const Koa = require('koa');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const webpackConfig = require('../webpack.dev');
const router = require('./routers/index');
const bodyParser = require('koa-bodyparser');
const staticSource = require('koa-static');
const path = require('path');
const history = require('./middlewares/koa2-connect-history-api-fallback');

const app = new Koa();
const compiler = webpack(webpackConfig);
// 静态资源目录
const staticPath = '../dist';

const wdm = webpackDevMiddleware(compiler, {
  noInfo: true
});

app
  .use(wdm)
  .use(webpackHotMiddleware(compiler));

app.use(bodyParser());
// app.use(staticSource(path.join(__dirname, staticPath)));

app
  .use(router.routes()) // 添加路由中间件
  .use(router.allowedMethods()); // 对请求进行一些限制处理

// 此处主要是处理 vue-router 的 history 模式
// 注意：位置需要放在前面（具体原因我也尚不清楚）
// app.use(history({
//   verbose: true // 转发日志
// }));

app.listen(3001);
console.log('[demo] koa server is starting at port 3001');
