<template>
<div class="city-container bw-flex">
  <div class="cc--left">
    <area-map v-if="sightList && sightList.length" :code="code" :sight-list="sightList"></area-map>
  </div>
  <div class="cc--right">
    <div class="cc__statistics">
      <data-city
        :sightNum="sightList.length"
        :dataBox="dataBox"
      ></data-city>
    </div>
    <div class="cc__charts bw-flex">
      <div class="chart--left">
        <sight-bar v-if="sightList && sightList.length" :sight-list="sightList"></sight-bar>
      </div>
      <div class="chart--right">
        <sight-polar-bar v-if="sightList && sightList.length" :sight-list="sightList">
        </sight-polar-bar>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AreaMap from './components/area-map.vue';
import SightBar from './components/sight-bar.vue';
import SightPolarBar from './components/sight-polar-bar.vue';
import DataCity from './components/data-city.vue';
import { mapActions, mapMutations } from 'vuex';
import _url from 'Util/url';

export default {
  components: {
    AreaMap,
    SightBar,
    SightPolarBar,
    DataCity
  },
  data() {
    return {
      code: '1101',
      sightList: [],
      dataBox: []
    };
  },

  methods: {
    ...mapActions('sight', ['getProvSights']),
    ...mapMutations('sight', ['SET_SIGHT_LIST']),

    // 统计城市景点的总销量
    countSightSale(data) {
      let sum = 0;
      data.forEach(item => {
        sum += Number(item.sale_count);
      });
      return sum || 0;
    },

    // 统计城市景点的总评论数量
    countSightComment(data) {
      let sum = 0;
      data.forEach(item => {
        sum += Number(item.comment && (item.comment['全部'] || 0)) || 0;
      });
      return sum;
    },

    // 构造统计数据
    setDataBox(data) {
      let dataNumber = {
        number: data.length || 0,
        name: '景点数'
      };
      this.dataBox.push(dataNumber);
      let sum = this.countSightSale(data);
      this.dataBox.push({
        number: sum,
        name: '销量数'
      });
      sum = this.countSightComment(data);
      this.dataBox.push({
        number: sum,
        name: '评论数'
      });
    }
  },

  created() {
    const pathCode = _url.getPath(2);
    this.code = pathCode || '1101';
    this.getProvSights({ code: this.code, type: 'city' })
      .then(data => {
        this.sightList = data;
        this.setDataBox(data);
        console.log(this.sightList);
      });
  }
};

</script>

<style>
.city-container {
  width: 100vw;
  height: 100vh;
}
.cc--left {
  height: 100%;
  width: 40%;
}
.cc--right {
  height: 100%;
  width: 60%;
}
.cc__statistics {
  height: 30%;
}
.cc__charts {
  width: 100%;
  height: 70%;
}
.chart--left, .chart--right {
  width: 50%;
  height: 100%;
}
</style>
