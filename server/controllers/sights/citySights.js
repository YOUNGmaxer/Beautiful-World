const Mongo = require('Server/db/manager').MongoHandler;
const { getCitiesSights, getCitySights } = require('./common');

class CitySights {
  async getCitySightsByName(ctx) {
    const collectionName = ctx.params.city;
    const query = ctx.query;
    const limit = query && query.limit;
    const data = limit ? await getCitySights(collectionName, Number(limit)) : await getCitySights(collectionName);
    ctx.body = data;
  }

  /**
   * @description: 获取省份所有的景点数据
   */
  async getProvSights(ctx) {
    const mongo = new Mongo('map');
    const code = ctx.params.code;
    const query = { code };
    const provData = await mongo._find('code_pc', query);
    // 获取该省份的所有城市
    let cityData;
    // TODO: 需要完善这里的逻辑，同时考虑有没有更好的写法
    // 判断是否是直辖市
    if (['11', '12'].includes(code)) {
      cityData = [{ name: provData.name, code: provData.code }];
    } else {
      cityData = provData.children;
    }
    const data = await getCitiesSights(cityData);
    ctx.body = data;
  }

  /**
   * @description: 获取城市景点数据
   */
  async getCitySightsByCode(ctx) {
    const mongo = new Mongo('map');
    const code = ctx.params.code;
    const query = { code };
    const cityData = await mongo._find('city_code', query);
    const data = await getCitySights(cityData.name);
    ctx.body = data;
  }

  /**
   * @description: 获取景点评论数据
   */
  async getSightComments(ctx) {
    const mongo = new Mongo('comments');
    const rid = ctx.params.rid;
    const commentsData = await mongo._find(rid);
    ctx.body = commentsData;
  }

  /**
   * @description: 获取单个景点数据
   */
  async getSightBySid(ctx) {
    const mongo = new Mongo('sights');
    const sid = ctx.params.sid;
    const db = await mongo.connect();
    const collections = await db.listCollections().toArray();

    // 写法一：相当于完全同步，虽然可以在查询到数据的时候就停止查询，
    // 但是没有利用到异步的高效，所以查询性能比较差
    // for (let i = 0; i < collections.length; i++) {
    //   const collection = db.collection(collections[i].name);
    //   const data = await collection.findOne({ sid });
    //   if (data) {
    //     ctx.body = data;
    //     break;
    //   }
    // }

    // 写法二：充分利用异步来执行，虽然会对所有集合都进行查询，但是查询性能还是相对更高
    let data = null;
    // 查询任务集合
    const tasks = [];
    // 查询任务
    const task = async (name) => {
      const collection = db.collection(name);
      const res = await collection.findOne({ sid });
      if (res) {
        data = res;
      }
    };
    for (let i = 0; i < collections.length; i++) {
      // TODO: 暂时对 “热门景点” 进行屏蔽
      if (collections[i].name === '热门景点') continue;
      tasks.push(task(collections[i].name));
    }
    await Promise.all(tasks);
    ctx.body = data;
  }
}

module.exports = new CitySights();
