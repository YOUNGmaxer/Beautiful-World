<template>
  <div>
    <svg class="map-svg"></svg>
  </div>
</template>

<script>
import axios from 'axios';
import * as d3 from 'd3';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      svgWidth: 800,
      svgHeight: 800
    }
  },
  computed: {
    ...mapState('map', ['mapType', 'mapData'])
  },
  watch: {
    mapType: function(val) {
      this.renderMap(this.mapData, val);
    }
  },
  methods: {
    ...mapActions('map', ['getChinaMap']),

    renderMap(data, name='中国') {
      let opt = {};
      let provinceData = [];
      if (name !== '中国') {
        provinceData = data.features.filter((feature) => {
          return feature.properties.name === name;
        });
        let centerPoint = provinceData[0].properties.cp;
        opt = {center: centerPoint, scale: 2000}
      } else {
        provinceData = data.features;
        opt = {scale: 600}
      }
      const path = this.generatePath(opt);
      const colors = d3.scaleOrdinal(d3.schemeBrBG[11]);
      
      const group =
        d3.select('.group__map-path')
          .selectAll('path');
      const update = group.data(provinceData);
      const enter = update.enter();
      const exit = update.exit();

      update.attr('d', path);
      enter.append('path')
        .attr('class', 'province')
        .attr('fill', (d, i) => colors(i))
        .attr('d', path);
      exit.remove();
    },

    /**
     * @description: 用于定义地理路径生成器
     * @param opt {Object} 相关自定义配置项: center, scale, translate
     * @return: path
     */
    generatePath({center=[107, 31], scale=600, translate=[400, 400]}) {
      // 定义地图的投影
      let projection =
        d3.geoMercator()
          // 设定地图的中心位置，经度107，纬度31
          .center(center)
          // 设置缩放
          .scale(scale)
          // 设置平移
          .translate(translate);
      
      // 定义地理路径生成器，使用设置好的投影对象
      let path =
        d3.geoPath()
          .projection(projection);

      return path;
    },

    /**
     * @description: 用于初始化渲染中国地图
     * @param data {JSON} 地图渲染数据
     */
    initChinaMap(data) {
      const svg =
        d3.select('.map-svg')
          .attr('width', this.svgWidth)
          .attr('height', this.svgHeight)
          .append('g')
            .attr('transform', 'translate(0, 0)');
      
      // 定义地理路径生成器，使用设置好的投影对象
      let path = this.generatePath({translate: [this.svgWidth/2, this.svgHeight/2]});

      let colors = d3.scaleOrdinal(d3.schemeBrBG[11]);

      let groups = svg.append('g').attr('class', 'group__map-path');
      // 这里使用了选择空集然后 enter 元素的技巧
      groups.selectAll('path')
        // 绑定数据到 path 节点
        .data(data.features)
        // 对于数组长度 > 元素数量，那么进行补充
        .enter()
        .append('path')
          .attr('class', 'province')
          .style('fill', (d, i) => colors(i))
          .attr('d', path);
    }
  },
  mounted() {
    this.$store.dispatch('map/getChinaMap')
      .then(mapData => {
        this.initChinaMap(mapData);
      })
      .catch(err => {
        console.log('getChinaMap', err);
      })
  }
}
</script>

<style>

</style>
