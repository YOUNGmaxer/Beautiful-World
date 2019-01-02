const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:27017';
const MONGO_DB = 'sights';
const MONGO_DB_NAME = '汕头';

class CitySights {
  async totalData(ctx) {
    // 连接数据库
    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db(MONGO_DB);
    const connection = db.collection(MONGO_DB_NAME);
    // 查询数据
    const data = await connection.find().toArray();
    // 返回数据
    ctx.body = data;
  }
}

module.exports = new CitySights();
