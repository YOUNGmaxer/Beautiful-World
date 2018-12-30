const { MongoClient } = require('mongodb');
const assert = require('assert');

const connection = (() => {
  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'beauty';

  // Create a new MongoClient
  // const client = new MongoClient(url);

  return function mongoConnect() {
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);
      console.log('Connected successfully to server');
      return client;
    });
  };
})();

module.exports = connection;
