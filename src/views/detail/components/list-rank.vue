<template>
<div class="list-rank-wrap bw-flex" :class="activeClass">
  <div class="list-lock bw-flex bw-flex--align-c">
    <link-lock @change-lock="lockedChanged"></link-lock>
  </div>
  <div class="list-rank-container">
    <ul class="list-rank__sight">
      <li class="list__item bw-flex bw-flex--align-c"
        v-for="(sight, index) in sightList"
        :key="index"
        @click="route2Sight(sight.sid)"
      >
        <div class="list__number">{{ index + 1 }}</div>
        <div class="list__info">
          <p class="sight-name">{{ sight.name }}</p>
          <p class="sight-addr">{{ sight.address }}</p>
        </div>
        <div class="list__score">{{ sight.star_score }}</div>
      </li>
    </ul>
  </div>
</div>

</template>

<script>
import LinkLock from 'Components/icon/line-lock.vue';
import trigger from 'Util/trigger';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    LinkLock
  },
  props: {
    sightList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // isLocked: true
    };
  },
  computed: {
    ...mapState('chinaMap', ['lockedStatus']),
    activeClass() {
      return this.lockedStatus ? 'list-rank-locked list-rank-locked-adapt' : '';
    }
  },
  methods: {
    ...mapMutations('chinaMap', ['SET_LOCKED']),
    lockedChanged() {
      if (this.lockedStatus === false) {
        this.$emit('resize-map');
      } else {
        trigger('resize');
      }
    },
    // 点击列表项跳转到相应景点详情页
    route2Sight(sid) {
      this.$router.push(`/detail_sight/${sid}`);
    }
  },

  mounted() {

  }
};
</script>

<style lang="scss">
@import 'Assets/style/functions/_common.scss';

.list-rank-wrap {
  --wrap-width: 300px;
  // width: var(--wrap-width);
  width: 270px; // TODO: 临时进行一点调整
  height: 100vh;
  transition: transform 1s ease 0.3s;
}
.list-rank-container {
  background: rgba(255,255,255,0.2);
  flex: 1;
}
div.list-rank-locked {
  margin-left: get-opposite(calc(var(--wrap-width) - 30px));
  transform: translateX(calc(var(--wrap-width) - 30px));
  transition: transform 1s;
}

.list-lock {
  margin-left: -30px; // TODO: 临时进行一点调整
}

.list-rank__sight {
  height: 100%;
  overflow-y: scroll;

  .list__item {
    margin: 10px;
    min-height: 56px;
    width: calc(var(--wrap-width) - 2 * 10px - 30px);
    // background: #ccc;
    background: rgba(204,204,204,0.6);
    border-radius: 10px;
    cursor: pointer;
  }

  .list__number {
    --list-size: 32px;
    width: var(--list-size);
    height: var(--list-size);
    box-sizing: content-box;
    line-height: var(--list-size);
    text-align: center;
    font-size: 22px;
    font-weight: 400;
    color: #eee;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-left: 10px;
    background: orange;
    flex-shrink: 0;
  }

  .list__info {
    margin-left: 10px;
    color: #333;
    flex-grow: 1;
    flex-shrink: 1;
    .sight-name {
      font-size: 20px;
    }
    .sight-addr {
      font-size: 8.5px;
    }
    .sight-name, .sight-addr {
      max-width: 120px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .list__score {
    margin-right: 10px;
    margin-left: 10px;
    font-size: 22px;
    font-style: italic;
    font-weight: 700;
    color: #725B10;
    &::after {
      content: '分';
      font-size: 8px;
    }
  }
}

</style>
