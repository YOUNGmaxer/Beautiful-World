<template>
<div class="echart__bar-map"></div>
</template>

<script>
import axios from 'axios';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/title';

export default {
  methods: {
    async getSightsData() {
      const res = await axios.get('http://localhost:3001/api/sight');
      return res;
    }
  },
  mounted() {
    this.getSightsData().then(res => {
      // 处理数据，获取 top20 的内容
      const data = res.data;
      data.sort((a, b) => b.sight_sale_count - a.sight_sale_count);
      const top20Data = data.slice(0, 20);
      const top20Name = top20Data.map(sight => {
        return sight.sight_name;
      });
      const top20Sale = top20Data.map(sight => {
        return sight.sight_sale_count;
      });

      // 渲染出柱状图
      const mapDom = document.getElementsByClassName('echart__bar-map')[0];
      const myChart = echarts.init(mapDom);
      const option = {
        title: {
          text: '热门景点销量Top20',
          subtext: '数据来自去哪儿网',
          left: '5%',
          top: '3%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['汕头']
        },
        grid: {
          left: '1%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: top20Name
        },
        series: [
          {
            name: '汕头',
            type: 'bar',
            data: top20Sale
          }
        ]
      };

      myChart.setOption(option);
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style lang="scss">
.echart__bar-map {
  width: 100%;
  height: 100%;
}
</style>
