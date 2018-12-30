/**
 * 在 Koa2 框架下对 connect-history-api-fallback 的一个封装
 */

const history = require('connect-history-api-fallback');

module.exports = (options) => {
  const middleware = history(options);
  const noop = () => {};

  return async (ctx, next) => {
    // middleware(ctx, null, noop);
    middleware(ctx, null, noop);
    await next();
  };
};
