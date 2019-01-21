const mongoConnect = require('./connect');
const mongoInsert = require('./insert');


function test() {
  const dbName = 'beauty';
  // 这里因为异步所以出现了 undefined 的问题
  const client = mongoConnect();
  const db = client.db(dbName);
  mongoInsert(db, () => {
    console.log('Insert callback');
    client.close();
  });
}

module.exports = test;
