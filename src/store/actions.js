import axios from 'axios';

export default {
  async getSightsData() {
    const res = await axios.get('http://localhost:3001/api/sight');
    return res;
  }
};
