<template>
<div class="sight-bar-wrap bw-full box-shadow-1">
  <chart-title>
    <slot>景点销量排名</slot>
    <!-- <template v-slot:tab>hello</template> -->
  </chart-title>
  <div class="sight-bar"></div>
</div>
</template>

<script>
import 'echarts/lib/component/tooltip';
import ChartTitle from './chart-title.vue';
import { axisLabelFormatter } from '../js/formatter';
import { initLoading, initBase } from '../js/init';

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
    sightList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      // 考虑到传进来的 sightList 属于 vuex，因此这里添加一个变量浅拷贝一份
      localSightList: []
    };
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

    registerClick(chart) {
      chart.on('click', params => {
        if (params.componentType === 'series') {
          // 根据景点名称找到对应的景点数据
          let sight = this.localSightList.find((item) => {
            return item.name === params.name;
          });
          let sid = sight.sid;
          this.$router.push(`/detail_sight/${sid}`);
        }
      });
    },

    initRankBar() {
      const chart = initLoading('sight-bar');

      this.localSightList = this.sightList.slice(0);
      const data = this.getTopData(this.localSightList, 10);
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
          bottom: '5%',
          top: '5%'
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
            formatter: axisLabelFormatter,
            // rotate: 10,
            fontSize: 9
          }
        },
        series: [
          {
            type: 'bar',
            data: data.value
          }
        ]
      };

      initBase(chart, option);
      this.registerClick(chart);
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
