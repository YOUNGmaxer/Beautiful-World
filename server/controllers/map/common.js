const Mongo = require('Server/db/manager').MongoHandler;

/**
 * @description: 从 mongodb 数据库中获取某个集合的全部数据
 * @param dbName {String} 数据库名称
 * @param cName {String} 集合名称
 * @param errInfo {String} 报错时的信息
 * @return: data 获取的数据
 */
async function getData(dbName, cName, errInfo = '[GET_DATA]') {
  const mongo = new Mongo(dbName);
  try {
    const data = await mongo._find(cName);
    return data;
  } catch (err) {
    console.log(errInfo, err);
  } finally {
    mongo.close();
  }
}

module.exports = {
  getData
};
