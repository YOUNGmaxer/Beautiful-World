// 保存项目中的一些通用静态配置信息，以此方便信息变化时统一修改

const USER = encodeURIComponent('root');
const PWD = encodeURIComponent('688232max');
const IP = '106.13.70.140';
const PORT = '23333';
const authMechanism = 'SCRAM-SHA-1';
const authSource = 'admin';
// const MONGO_URL = `mongodb://${USER}:${PWD}@${IP}:${PORT}`;
// const MONGO_URL = `mongodb://${USER}:${PWD}@${IP}:${PORT}/?authSource=${authSource}`;
const MONGO_URL = `mongodb://${USER}:${PWD}@${IP}:${PORT}/?authSource=${authSource}`;

module.exports = {
  // mongodb 数据库
  MONGO_URL,
  authSource
};
