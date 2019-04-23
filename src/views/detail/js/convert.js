/*
 * @Description: 主要是一些业务共用的数据转换方法
 * @Author: Young
 * @Date: 2019-03-16 13:35:47
 * @LastEditTime: 2019-04-21 18:07:22
 */
import { scaleLinear } from 'd3';
import * as d3 from 'd3';

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

/**
 * 处理数据，将数据转化为 {name, value} 格式
 * 其中 value 格式为 [lng, lat, _value]
 */
function convertData(data, geoData) {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geoData[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
}

// 将景点数据转化为 echarts 可用格式
function generateSightMapData(sightList) {
  // 构造景点 data 数据
  const renderData = sightList.map(sight => {
    return {
      name: sight.name,
      value: [Number(sight.sale_count), Number(sight.comment['全部'])]
    };
  });

  const geoData = {};
  sightList.forEach(sight => {
    if (sight.point) {
      geoData[sight.name] = [Number(sight.point[0]), Number(sight.point[1])];
    }
  });

  const sightMapData = convertData(renderData, geoData);
  return sightMapData;
}

// 归一化函数
function getScaleList(list, min, max) {
  const valueList = list.map(item => item[1]);
  const maxValue = d3.max(valueList);
  const minValue = d3.min(valueList);
  const scale = scaleLinear()
    .domain([minValue, maxValue])
    .range([min, max]);
  // console.log('scaleList', valueList, maxValue, minValue);
  // console.log('scale', scale(1000));
  const resList = list.map(item => [item[0], scale(item[1])]);
  // console.log('scale list', resList);
  return resList;
}

export {
  getGeoJsonCities,
  convertObj2Data,
  convertData,
  generateSightMapData,
  getScaleList
};
