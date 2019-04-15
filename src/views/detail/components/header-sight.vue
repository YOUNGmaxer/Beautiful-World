<template>
<div class="header-sight bw-flex">
  <div class="hs-logo bw-flex bw-flex--center">
    <Logo></Logo>
  </div>
  <div class="hs-option bw-flex bw-flex--center">
    <RadioGroup v-model="viewType" type="button" size="small" @on-change="radioClick">
      <Radio label="评论"></Radio>
      <Radio label="分词"></Radio>
    </RadioGroup>
  </div>
  <!-- <div class="hs-option bw-flex bw-flex--center">
    <input class="hs-option__tag hs-option__tag--active">评论分析
    <input class="hs-option__tag">分词分析
  </div> -->
  <div class="red-line"></div>
</div>
</template>

<script>
import Logo from 'Components/logo.vue';
import { Radio, RadioGroup } from 'iview';

export default {
  components: {
    Logo,
    Radio,
    RadioGroup
  },
  data() {
    return {
      viewType: '评论'
    };
  },
  methods: {
    radioClick(label) {
      this.$emit('change-sight-view', label);
    }
  }
};
</script>

<style lang="scss">
:root {
  --sight-header-h: 60px;
}
.header-sight {
  height: var(--sight-header-h);
  position: relative;
  justify-content: space-between;
}
.hs-logo {
  width: 200px;
  height: 100%;
}
.hs-option {
  margin-right: 20px;
  color: #eee;
}
.hs-option__tag {
  height: 24px;
  line-height: 24px;
  margin: 0 5px;
  padding: 0 8px;
  cursor: pointer;
}
.hs-option__tag--active {
  border-radius: 50px;
  background: #6d4797;
  // color: grey;
}
.red-line {
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 1px;
  &::after {
    content: "";
    display: block;
    // width: 100%;
    height: 1px;
    // background: #7c0e0e;
    background: #e90000;
    margin: 0 20px;
    transform: scaleY(0.5);
  }
}

// TODO: 自定义Radio样式
.hs-option {
  .ivu-radio-group-button {
    .ivu-radio-wrapper {
      background: rgba(255,255,255,0.8);
      border-color: transparent;

      box-shadow: 1px 1px 2px rgba(0,0,0,0.4) inset;
      border: none;

      &:first-child {
        border-left: none;
      }
    }

    &.ivu-radio-group-small {
      .ivu-radio-wrapper {
        line-height: 24px;
      }
    }

    .ivu-radio-wrapper-checked {
      background: rgba(206,118,90,1);
      color: #fff;
      box-shadow: none;

      &:first-child {
        border-color: transparent;
      }

      &:hover {
        border-color: transparent;
        color: currentColor;
      }

      &.ivu-radio-focus {
        box-shadow: none;
      }
    }
  }

}
</style>
