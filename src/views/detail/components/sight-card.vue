<template>
<div class="sight-card box-shadow-1">
  <div class="sight-card__map" id="sight-map"></div>
  <div class="sight-card__info">
    <p class="sight-name">{{ sightData.name }}</p>
    <p class="sight-districts">{{ sightData.districts }}</p>
    <p class="sight-address">{{ sightData.address }}</p>
  </div>
  <div class="sight-card__pie">
    <sight-nut-pie v-if="commentData" :pieData="commentData"></sight-nut-pie>
  </div>
</div>
</template>

<script>
import SightNutPie from './sight-nut-pie.vue';

export default {
  components: {
    SightNutPie
  },
  props: {
    sightData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      commentData: null
    };
  },

  methods: {
    convertCommentData(comment) {
      let _commentData = [];
      for (let key in comment) {
        if (key !== '全部') {
          _commentData.push({
            name: key,
            value: Number(comment[key])
          });
        }
      }
      console.log(_commentData, typeof _commentData);
      return _commentData;
    }
  },

  mounted() {
    const map = new BMap.Map('sight-map');
    const point = this.sightData.point;
    const lng = Number(point[0]);
    const lat = Number(point[1]);
    const mapPoint = new BMap.Point(lng, lat);
    // 创建标注
    const marker = new BMap.Marker(mapPoint);
    this.commentData = this.convertCommentData(this.sightData.comment);
    map.centerAndZoom(mapPoint, 11);
    map.setCurrentCity(this.sightData.city);
    map.enableScrollWheelZoom(true);
    // 将标注添加到地图
    map.addOverlay(marker);
  }
};
</script>

<style lang="scss">
.sight-card {
  // min-height: 400px;
  height: 100%;
  box-sizing: border-box;

  --card-map-height: 40%;
  --card-info-height: 160px;
}
.sight-card__map {
  width: 100%;
  height: var(--card-map-height);
}
.sight-card__info {
  padding: 15px;
  color: #ccc;
  max-height: var(--card-info-height);
  .sight-name {
    font-size: 32px;
    margin-bottom: 15px;
    font-weight: 300;
  }
  .sight-districts {
    display: inline-block;
    font-size: 12px;
    background: #ff6600;
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
    margin-left: 2px;
    margin-bottom: 10px;
  }
}
.sight-card__pie {
  height: calc(100% - var(--card-map-height) - var(--card-info-height));
}
</style>
