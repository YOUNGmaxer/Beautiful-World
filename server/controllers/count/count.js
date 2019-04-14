/*
 * @Description: 统计数据的方法
 * @Author: YOUNG
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-14 20:09:39
 * @LastEditTime: 2019-04-14 20:40:15
 */
const Mongo = require('Server/db/manager').MongoHandler;

class Counter {
  // 实现对某个数据库所有文档的计数方法
  async countDocByDB(ctx) {
    const dbName = ctx.params.db;
    const mongo = new Mongo(dbName);
    const db = await mongo.connect();
    // 获取一个数据库的所有集合
    const docs = await db.listCollections().toArray();
    let sum = 0;
    let countTasks = [];
    const task = async (name) => {
      const collection = db.collection(name);
      const num = await collection.count();
      sum += num;
    };
    for (let i = 0, len = docs.length; i < len; i++) {
      countTasks.push(task(docs[i].name));
    }
    await Promise.all(countTasks);
    ctx.body = sum;
  }
}

module.exports = new Counter();
