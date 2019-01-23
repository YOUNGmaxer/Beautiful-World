const Saver = require('./saver');

class Counter extends Saver {
  constructor(dbName = 'sights') {
    super(dbName);
  }

  // 用于统计一个数据库中有多少个文档
  async count() {
    const keys = await this.db.listCollections().toArray();
    let sum = 0;
    keys.forEach(async (key) => {
      let collect = this.db.collection(key.name);
      let num = await collect.count();
      console.log(key.name, num);
      sum += num;
    });
    setTimeout(() => { console.log(sum); }, 8000);
  }
}

const counter = new Counter('comments');
counter.connectMongo()
  .then(d => {
    counter.count();
  });
