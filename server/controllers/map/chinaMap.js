const fs = require('fs');
const path = require('path');
const Mongo = require('Server/db/manager').MongoHandler;

/**
 * ！注意写接口的时候会遇到一个问题，就是用异步方法会出现函数先结束，
 * 也就是浏览器先接到响应了，但是接口的函数本身的异步方法还没执行完的情况。
 * */
class ChinaMap {
  async getMapData(ctx) {
    const res = fs.readFileSync(path.resolve(__dirname, '../../data/map/china.json'), 'utf-8');
    ctx.set('Content-Type', 'application/json; charset=utf-8');
    ctx.body = res;
  }

  /**
   * @description: 获得所有省份的数据，包括 code + name（仅省份）
   */
  async getProvinceCode(ctx) {
    const cName = 'province_code';
    const mongo = new Mongo('map');
    try {
      const db = await mongo.connect();
      const collection = db.collection(cName);
      const data = await collection.find().toArray();
      ctx.body = data;
    } catch (err) {
      console.log('/api/code/prov', err);
    } finally {
      mongo.close();
    }
  }

  /**
   * @description: 根据参数查找 map 数据库中的一条数据
   * @param cName {String} collection 名称
   * @param type {String} 指定查询的字段 code | name
   */
  findOneByCodeOrName(cName, type = 'code') {
    return async function middleware(ctx) {
      const param = ctx.params.param;
      const mongo = new Mongo('map');
      // 如果没有传参就查找全部
      if (param) {
        const query = type === 'code' ? { code: param } : { name: param };
        ctx.body = await mongo._find(cName, query);
      } else {
        const db = await mongo.connect();
        const collection = db.collection(cName);
        ctx.body = await collection.find().toArray();
      }
    };
  }
}

module.exports = new ChinaMap();
