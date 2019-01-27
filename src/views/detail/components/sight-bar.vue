<template>
<div class="sight-bar"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';

// TODO: 考虑让组件既可以接收景点数组，又可以自己请求数据
export default {
  props: {
    // 地区代号
    code: {
      type: String,
      default: '45'
    },
    sightList: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    // 处理并获取 top N 的景点数据
    getTopData(data, topLevel) {
      data.sort((a, b) => {
        a.sale_count = a.sale_count || 0;
        b.sale_count = b.sale_count || 0;
        return b.sale_count - a.sale_count;
      });
      let topData = data.slice(0, topLevel);
      topData = topData.reverse();
      const renderData = { name: [], value: [] };
      topData.forEach(sight => {
        renderData.name.push(sight.name);
        renderData.value.push(sight.sale_count);
      });
      return renderData;
    },

    initRankBar() {
      const barDom = document.getElementsByClassName('sight-bar')[0];
      const chart = echarts.init(barDom);
      chart.showLoading();

      const data = this.getTopData(this.sightList, 20);

      const option = {
        title: {
          text: '景点销量最多',
          subtext: '数据来自去哪儿网'
        },
        tooltip: {
          trigger: 'axis'
        },
        // 直角坐标系
        grid: {
          // 是否显示直角坐标系网络
          show: true,
          // 是否包含坐标轴的刻度
          containLabel: true
        },
        // 直角坐标系的 x 轴
        xAxis: {
          // 坐标轴类型
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: data.name
        },
        series: [
          {
            type: 'bar',
            data: data.value
          }
        ]
      };
      chart.setOption(option);
      chart.hideLoading();
    }
  },

  mounted() {
    this.initRankBar();
  }
};
</script>

<style>
.sight-bar {
  width: 100%;
  height: 100%;
}
</style>
