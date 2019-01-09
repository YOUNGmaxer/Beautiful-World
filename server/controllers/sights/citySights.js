const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017';
const MONGO_DB = 'sights';

class CitySights {
  async totalData(ctx) {
    let client = null;
    const collectionName = ctx.params.key;
    try {
      // 连接数据库
      client = await MongoClient.connect(MONGO_URI);
      const db = client.db(MONGO_DB);
      const connection = db.collection(collectionName);
      // 查询数据
      const data = await connection.find().toArray();
      // 返回数据
      ctx.body = data;
    } catch (err) {
      console.error('totalData', err);
    } finally {
      client.close();
    }
  }
}

module.exports = new CitySights();
