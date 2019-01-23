import axios from 'axios';

export default {
  async getSightsData({}, key = '汕头') {
    const url = `http://localhost:3001/api/sight/${key}`;
    const res = await axios.get(url);
    return res;
  },
  // 获取城市列表
  async getCitiesData({ dispatch }) {
    const key = '城市名单';
    const res = await dispatch('getSightsData', key);
    return res;
  },

  /**
   * @description: 获取地区地图数据
   * @param {Object} 可按 name（省名）查询，也可按 code（代号）查询；优先查询 code
   * @return: GeoJson
   */
  async getProvinceMap({}, { name = '北京市', code }) {
    let url = 'http://localhost:3001/api/map/prov';
    url = code ? `${url}/${code}` : `${url}/name/${name}`;
    const res = await axios.get(url);
    return res.data;
  }

};
