<template>
<div class="sight-card">
  <div class="sight-card__map" id="sight-map"></div>
  <div class="sight-card__info">
    <p class="sight-name">{{ sightData.name }}</p>
    <p class="sight-districts">{{ sightData.districts }}</p>
    <p class="sight-address">{{ sightData.address }}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import _url from 'Util/url';

export default {
  props: {
    sid: {
      type: String,
      default: '1174758904'
    }
  },
  data() {
    return {
      sightData: {}
    };
  },
  mounted() {
    const url = _url.getUrl(`/api/sight/${this.sid}`);
    axios
      .get(url)
      .then(res => {
        this.sightData = res.data;
        console.log(this.sightData);
        const map = new BMap.Map('sight-map');
        const point = this.sightData.point;
        const lng = Number(point[0]);
        const lat = Number(point[1]);
        map.centerAndZoom(new BMap.Point(lng, lat), 11);
        map.setCurrentCity(this.sightData.city);
        map.enableScrollWheelZoom(true);
      });
  }
};
</script>

<style lang="scss">
.sight-card {
  width: 400px;
  height: 600px;
  margin: 20px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
}
.sight-card__map {
  width: 100%;
  height: 400px;
}
.sight-card__info {
  padding: 15px;
  .sight-name {
    font-size: 32px;
    margin-bottom: 15px;
    font-weight: 300;
  }
  .sight-districts {
    display: inline-block;
    font-size: 12px;
    background: #aaa;
    color: white;
    font-weight: 500;
    border-radius: 3px;
    padding: 2px 5px;
    margin-left: 3px;
    margin-bottom: 10px;
  }
  .sight-address {
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
