<template>
<div class="city-container bw-flex">
  <!-- TODO: 这里为什么没有了 if 之后会出现问题，获取 dom 时好像获取到上一个页面的 dom 节点 -->
  <star-bg v-if="isListPrepared"></star-bg>
  <div class="cc--left">
    <area-map v-if="isListPrepared" :code="code" :sight-list="sightList"></area-map>
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
        <sight-bar v-if="isListPrepared" :_sight-list="sightList"></sight-bar>
      </div>
      <div class="chart--right">
        <sight-polar-bar v-if="isListPrepared" :sight-list="sightList"></sight-polar-bar>
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
import StarBg from 'Components/bg/star.vue';

export default {
  components: {
    AreaMap,
    SightBar,
    SightPolarBar,
    DataCity,
    StarBg
  },
  data() {
    return {
      code: '1101',
      sightList: [],
      dataBox: []
    };
  },
  computed: {
    isListPrepared() {
      return this.sightList && this.sightList.length;
    }
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
    },

    getSightsData() {
      const pathCode = _url.getPath(2);
      this.code = pathCode || '1101';
      this.getProvSights({ code: this.code, type: 'city' })
        .then(data => {
          this.sightList = data;
          this.setDataBox(data);
        });
    }
  },

  // beforeRouteEnter(to, from, next) {
  //   if (from.name === 'detail_sight') {
  //     to.meta.isBack = true;
  //   }
  //   next();
  // },
  beforeMoung() {
    document.body.setAttribute('class', 'bg-lemon-twist');
  },

  mounted() {
    this.getSightsData();
  }

  // activated() {
  //   if (!this.$route.meta.isBack) {
  //     this.getSightsData();
  //   }
  //   this.$route.meta.isBack = false;
  // }
};

</script>

<style>
.city-container {
  width: 100vw;
  height: 100vh;
  --left-width: 40%;
  --statistics-height: 30%;
}
.cc--left {
  height: 100%;
  width: var(--left-width);
}
.cc--right {
  height: 100%;
  width: calc(100% - var(--left-width));
}
.cc__statistics {
  height: var(--statistics-height);
}
.cc__charts {
  width: 100%;
  height: calc(100% - var(--statistics-height));
}
.chart--left, .chart--right {
  width: 50%;
  height: 100%;
  padding-right: 15px;
  padding-bottom: 15px;
}
</style>
