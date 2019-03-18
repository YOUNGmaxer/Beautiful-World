const Mongo = require('Server/db/manager').MongoHandler;

/**
 * @description: 获取一个城市列表中的所有景点数据
 * @param cities {Array}
 */
async function getCitiesSights(cities) {
  const mongo = new Mongo('sights');
  const db = await mongo.connect();
  cities = cities.map(city => {
    return {
      code: city.code,
      name: city.name.replace('市', '')
    };
  });
  let data = [];
  const tasks = [];
  const task = async (name) => {
    let collection = db.collection(name);
    const res = await collection.find().toArray();
    data = data.concat(res);
  };
  for (const city of cities) {
    tasks.push(task(city.name));
  }
  // 注意这里应该用 Promise.all 的写法，才能既利用异步的效率又能有同步的写法
  await Promise.all(tasks);
  return data;
}

/**
 * @description: 获取一个城市的所有景点数据
 * @param city {String}
 * @return: data 景点数据数组
 */
async function getCitySights(city, limit) {
  const mongo = new Mongo('sights');
  try {
    const db = await mongo.connect();
    city = city.replace('市', '');
    const collection = db.collection(city);
    const data = limit ? await collection.find().limit(limit).toArray() : await collection.find().toArray();
    return data;
  } finally {
    mongo.close();
  }
}

module.exports = {
  getCitiesSights,
  getCitySights
};
