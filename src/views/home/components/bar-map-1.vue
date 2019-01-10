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
  props: {
    options: {
      type: Object,
    }
  },
  data() {
    return {
      key: '汕头'
    }
  },
  methods: {
    ...mapActions(['getSightsData']),
    parseDataOnArea(data) {
      const areaData = data.map(sight => {
        return sight.districts.split('·')[0];
      });
      const counter = {};
      areaData.forEach(area => {
        if (!counter[area]) {
          counter[area] = 1;
        } else {
          counter[area]++;
        }
      })
      console.log(counter);
      return counter;
    }
  },
  mounted() {
    this.getSightsData(this.key).then(res => {
      const data = res.data;
      console.log('景点数据', data);
      const counter = this.parseDataOnArea(data);
      const sortedArea = Object.keys(counter).sort((a, b) => {
        return counter[b] - counter[a];
      }).slice(0, 25).reverse();
      const sortedCount = sortedArea.map(area => {
        return counter[area];
      })
      console.log(sortedArea, sortedCount);

      // 渲染出柱状图
      const mapDom = document.getElementsByClassName('echart__bar-map')[0];
      const myChart = echarts.init(mapDom);
      const option = {
        title: {
          text: '热门景点数量',
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
          data: sortedArea
        },
        series: [
          {
            name: this.key,
            type: 'bar',
            data: sortedCount,
            markPoint: 'circle'
          }
        ],
        // 显示数值
        label: {
          show: true,
          position: 'right'
        }
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
