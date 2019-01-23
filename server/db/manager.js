const { MongoClient } = require('mongodb');

class MongoBase {
  constructor(db = 'sights') {
    this.MONGO_URL = 'mongodb://106.13.70.140:27017';
    this.MONGO_DB = db;
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

  // 封装 findOne 方法
  async _findOne(cName, query) {
    try {
      const db = await this.connect();
      const collection = db.collection(cName);
      const data = await collection.findOne(query);
      return data;
    } finally {
      this.close();
    }
  }
}

module.exports = {
  MongoBase,
  MongoHandler
};
