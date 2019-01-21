const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://localhost:27017';
let db;

module.exports = () => {
  return MongoClient
    .connect(url)
    .then(client => {
      db = client;
    });
};

module.exports.sights = {
  
};
