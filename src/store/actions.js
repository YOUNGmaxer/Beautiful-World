import axios from 'axios';
import _url from 'Util/url';

export default {
  async getSightsData({}, key = '汕头') {
    const url = _url.getUrl(`/api/sight/city/name${key}`);
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
    let api;
    const len = code.length;
    switch (len) {
      case 2:
        api = '/api/map/prov';
        break;
      case 4:
        api = '/api/map/city';
        break;
      default:
    }
    let url = _url.getUrl(api);
    url = code ? `${url}/${code}` : `${url}/name/${name}`;
    const res = await axios.get(url);
    return res.data;
  },
};
