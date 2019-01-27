<template>
<div class="city-container bw-flex">
  <div class="cc--left">
    <area-map v-if="sightList && sightList.length" :code="code"></area-map>
  </div>
  <div class="cc--right">
    <div class="cc__statistics">
      <data-city></data-city>
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
import { mapActions } from 'vuex';
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
      sightList: []
    };
  },

  methods: {
    ...mapActions('sight', ['getProvSights'])
  },

  created() {
    const pathCode = _url.getPath(2);
    this.code = pathCode || '1101';
    this.getProvSights({ code: this.code, type: 'city' })
      .then(data => {
        this.sightList = data;
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
