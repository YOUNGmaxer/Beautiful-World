const { MongoClient } = require('mongodb');
// const { MONGO_URL } = require('../../settings');
const { MONGO_URL } = require('Settings');

class MongoBase {
  constructor(db = 'sights') {
    console.log(MONGO_URL);
    this.MONGO_URL = MONGO_URL;
    this.MONGO_DB = db;
    this.option = { authSource: 'admin' };
    this.client = null;
    this.db = null;
  }

  async connect() {
    this.client = await MongoClient.connect(this.MONGO_URL);
    this.db = this.client.db(this.MONGO_DB);
    return this.db;
  }

  close() {
    this.client.close();
  }
}


class MongoHandler extends MongoBase {
  constructor(db = 'sights') {
    super(db);
  }

  // 封装 find 方法
  async _find(cName, query) {
    try {
      const db = await this.connect();
      const collection = db.collection(cName);
      if (query) {
        return await collection.findOne(query);
      }
      return await collection.find().toArray();
    } finally {
      this.close();
    }
  }
}

module.exports = {
  MongoBase,
  MongoHandler
};
