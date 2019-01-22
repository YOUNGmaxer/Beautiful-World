const { MongoClient } = require('mongodb');
const fs = require('fs');

class MapSaver {
  constructor() {
    this.absPath = '/Users/yzm/Desktop/Source/地图数据';
    this.MONGO_URI = 'mongodb://localhost:27017';
    this.MONGO_DB = 'map';
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
    }
  }

  /**
   * @description: 存储中国地图全图数据
   * @param db {Object} 数据库对象
   * @param name {String} 集合名字
   * @return
   */
  async saveData(name, path) {
    const collect = this.db.collection(name);
    fs.readFile(path, (err, data) => {
      if (err) {
        console.error('saveChinaDate', err);
      }
      const chinaData = JSON.parse(data.toString('utf-8'));
      const res = { type: 'cities code', rows: chinaData }
      // console.log(chinaData);
      collect.insertOne(res);
    });
  }

  async saveProvinceData(name) {
    const collect = this.db.collection(name);
    const provinceCode = this.db.collection('province_code');
    const proData = await provinceCode.find().toArray();
    const rows = proData[0].rows;
    rows.forEach((item) => {
      let url = `${this.absPath}/mapdata/geometryProvince/${item.code}.json`;
      let res = fs.readFileSync(url, 'utf-8');
      res = JSON.parse(res);
      res.code = item.code;
      res.name = item.name;
      collect.insertOne(res);
    });
  }

  async saveCityData(name) {
    const collect = this.db.collection(name);
    const provinceCode = this.db.collection('city_code');
    const proData = await provinceCode.find().toArray();
    let rows = proData[0].rows;
    rows = [{ code: '1303', name: '天津' }];
    rows.forEach((item) => {
      let url = `${this.absPath}/mapdata/geometryCouties/${item.code}.json`;
      let stat = fs.existsSync(url);
      if (stat) {
        let res = fs.readFileSync(url);
        res = res.toString('utf-8');
        let jsonRes = JSON.parse(res);
        console.log(item.code, res.toString('utf-8'), typeof res);
        res.code = item.code;
        // collect.insertOne(res);
      }
    });
  }

  closeDB() {
    this.client.close();
  }
}

const saver = new MapSaver();

saver.connectMongo()
  .then(data => {
    // saver.saveProvinceData('province_map');
    saver.saveCityData('city_map');
  });
