const { MongoClient } = require('mongodb');

class Saver {
  constructor(dbName = 'sights') {
    this.MONGO_URI = 'mongodb://106.13.70.140:27017';
    this.MONGO_DB = dbName;
    this.client = null;
    this.db = null;
  }

  async connectMongo() {
    try {
      this.client = await MongoClient.connect(this.MONGO_URI);
      this.db = this.client.db(this.MONGO_DB);
      return this.db;
    } catch (err) {
      console.error('connectMongo', err);
      return err;
    }
  }
}

module.exports = Saver;
