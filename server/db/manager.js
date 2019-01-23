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

module.exports = MongoBase;
