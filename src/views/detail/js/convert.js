/*
 * @Description: 主要是一些业务共用的数据转换方法
 * @Author: Young
 * @Date: 2019-03-16 13:35:47
 * @LastEditTime: 2019-03-16 13:54:45
 */

// 提取省级 geoJson 中的城市名称和code
function getGeoJsonCities(geoJson) {
  const features = geoJson.features || [];
  const nameMapForCode = {};
  const nameMap = {};
  // 这里增加一个对象，方便统计每个区域的景点数，同时用来兼容直辖市以及该区域没有景点的情况
  const nameMapForCounter = {};
  features.forEach(feature => {
    const name = feature.properties.name;
    const minName = name.replace('市', '');
    const id = feature.properties.id;
    nameMapForCode[name] = id;
    nameMap[name] = minName;
    nameMapForCounter[minName] = 0;
  });
  return { nameMap, nameMapForCode, nameMapForCounter };
}

// 将一个对象转化为 echarts 的 data 格式
function convertObj2Data(obj) {
  let res = [];
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res.push({
        name: key,
        value: obj[key]
      });
    }
  }
  return res;
}

export {
  getGeoJsonCities,
  convertObj2Data
};
