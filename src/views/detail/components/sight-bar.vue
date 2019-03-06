<template>
<div class="sight-bar-wrap bw-full box-shadow-1">
  <chart-title>
    <slot>景点销量排名</slot>
  </chart-title>
  <div class="sight-bar"></div>
</div>
</template>

<script>
import 'echarts/lib/component/tooltip';
import ChartTitle from './chart-title.vue';
import { axisLabelFormatter } from '../js/formatter';
import init from '../js/init';

// TODO: 考虑让组件既可以接收景点数组，又可以自己请求数据
export default {
  components: {
    ChartTitle
  },
  props: {
    // 地区代号
    code: {
      type: String,
      default: '45'
    },
    _sightList: {
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
      const data = this.getTopData(this._sightList, 20);
      const option = {
        // title: {
        //   text: '景点销量最多',
        //   subtext: '数据来自去哪儿网'
        // },
        tooltip: {
          trigger: 'axis'
        },
        // 直角坐标系
        grid: {
          // 是否显示直角坐标系网络
          show: true,
          // 是否包含坐标轴的刻度
          containLabel: true,
          left: '5%',
          right: '8%',
          bottom: '10%',
          top: '10%'
        },
        // 直角坐标系的 x 轴
        xAxis: {
          // 坐标轴类型
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: data.name,
          axisLabel: {
            formatter: axisLabelFormatter
          }
        },
        series: [
          {
            type: 'bar',
            data: data.value
          }
        ]
      };

      init('sight-bar', option);
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
  height: calc(100% - var(--chart-title-height));
}
</style>
