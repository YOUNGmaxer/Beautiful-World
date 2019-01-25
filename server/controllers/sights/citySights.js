const Mongo = require('Server/db/manager').MongoHandler;
const { getCitiesSights } = require('./common');

class CitySights {
  async totalData(ctx) {
    const collectionName = ctx.params.city;
    const mongo = new Mongo('sights');
    try {
      // 连接数据库
      const db = await mongo.connect();
      const connection = db.collection(collectionName);
      // 查询数据
      const data = await connection.find().toArray();
      // 返回数据
      ctx.body = data;
    } catch (err) {
      console.error('totalData', err);
    } finally {
      mongo.close();
    }
  }

  /**
   * @description: 获取省份所有的景点数据
   */
  async getProvSights(ctx) {
    const mongo = new Mongo('map');
    const code = ctx.params.code;
    const query = { code };
    const provData = await mongo._findOne('code_pc', query);
    // 获取该省份的所有城市
    let cityData;
    // TODO: 需要完善这里的逻辑，同时考虑有没有更好的写法
    // 判断是否是直辖市
    if (['11', '12'].includes(code)) {
      cityData = [{ name: provData.name, code: provData.code }];
    } else {
      cityData = provData.children;
    }
    console.log(cityData);
    const data = await getCitiesSights(cityData);
    ctx.body = data;
  }
}

module.exports = new CitySights();
