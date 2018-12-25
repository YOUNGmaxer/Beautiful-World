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

* Koa2
* koa-router

