<template>
<div class="echart__bar-map"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import store from 'Store';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      key: '热门景点'
    }
  },
  methods: {
    ...mapActions(['getSightsData']),
  },
  mounted() {
    this.getSightsData(this.key).then(res => {
      // 处理数据，获取 top20 的内容
      const data = res.data;
      data.sort((a, b) => b.sight_sale_count - a.sight_sale_count);
      const top20Data = data.slice(0, 20);
      const top20Name = top20Data.map(sight => {
        return sight.sight_name;
      }).reverse();
      const top20Sale = top20Data.map(sight => {
        return sight.sight_sale_count;
      }).reverse();

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
          data: [this.key]
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
            name: this.key,
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
