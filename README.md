# Beautiful World

## 项目结构介绍

```
.
├── README.md
├── config  // 配置文件
├── dist  // 构建后的静态资源
│   ├── index.html
│   └── main.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── server  // 服务端文件
├── src  // 前端文件
│   ├── App.vue
│   ├── assets  // 前端静态资源
│   │   └── template.html
│   ├── main.js  // webpack 入口文件
│   ├── router  // 前端路由
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   ├── components  // 可复用组件
│   └── views  // 页面级组件
│       └── home
│           └── index.vue
├── test  // 单元测试
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## 技术栈

### 服务端

相关依赖

* Koa2
* koa-router
* koa-bodyparser

## 开发体验

使用一些有利于开发体验的工具。

### 开发指令

* 生产环境

  `npm run build` 可以构建打包出项目的静态资源用于部署。

* 开发环境

  * 纯前端开发（无 node）

    `npm run dev`

  * 基于 node 服务的前端开发

    `npm run node`



### nodemon

可以用来监视 node 端的更改并自动重启服务。

`nodemon.json` 配置文件的相关参数介绍：

* restartable - 设置重启模式
* ignore - 设置忽略文件
* verbose - 设置日志输出模式，true 为详细模式
* execMap - 设置运行服务的后缀名与对应的命令
* watch - 监听哪些文件的变化，当变化的时候自动重启
* ext - 监控指定的后缀文件名
