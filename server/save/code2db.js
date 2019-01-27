/**
 * 将多级联动的城市 json 数据存到 mongodb 中
 */
const Saver = require('./saver');
const fs = require('fs');

class CodeSaver extends Saver {
  // 提醒默认参数应该放置后边
  constructor(basePath, dbName = 'sights') {
    super(dbName);
    this.basePath = basePath;
  }

  getFileContent(filename) {
    const path = `${this.basePath}/${filename}`;
    const data = fs.readFileSync(path);
    const fileData = JSON.parse(data.toString('utf-8'));
    return fileData;
  }

  async saveCodeToMongo(data, cName = 'code_pc') {
    const collection = this.db.collection(cName);
    await collection.createIndex('code', { unique: true });
    data.forEach((item) => {
      collection.insertOne(item);
    });
  }
}

const basePath = '/Users/yzm/Desktop/Source/地图数据/区划代码';
const filename = 'cities.json';
const saver = new CodeSaver(basePath, 'map');

(async () => {
  await saver.connectMongo();
  const data = saver.getFileContent(filename);
  saver.saveCodeToMongo(data, 'city_code');
})();
