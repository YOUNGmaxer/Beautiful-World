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
  }
};
