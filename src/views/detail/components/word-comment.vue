<template>
<div class="word-comment bw-full box-shadow-1">
  <chart-title>评论内容</chart-title>
  <ul class="word-comment__list scroll-bar">
    <li
      v-for="comment in commentList"
      :key="comment.commentId"
      class="wc__item bw-flex"
    >
      <span class="wc__item-tag bw-flex bw-flex--align-c" :class="commentLevelClass(Number(comment.score))">
        {{ commentLevel(Number(comment.score)) }}
      </span>
      <!-- TODO: 最好能够把关键词高亮出来 -->
      <div class="wc__item-content bw-flex bw-flex--align-c">{{ comment.content }}</div>
    </li>
  </ul>
</div>
</template>

<script>
import ChartTitle from './chart-title.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    ChartTitle
  },

  watch: {
    curFocusWord(_new, _old) {
      if (this.curFocusWordType) {
        this.commentIdList = this.segmentDetailData[this.curFocusWordType][_new];
      } else {
        for (let type in this.segmentDetailData) {
          let target = this.segmentDetailData[type][_new];
          if (target) {
            this.commentIdList = target;
          }
        }
      }
      this.filterCommentsByIdList();
    }
  },

  data() {
    return {
      commentIdList: [],
      commentList: []
    };
  },

  computed: {
    ...mapState('commentSegment', ['curFocusWord', 'curFocusWordType', 'segmentDetailData']),
    ...mapState('comment', ['comments']),

  },

  methods: {
    // 获取 commentIdList 对应的 commentList
    filterCommentsByIdList() {
      this.commentList = this.comments.filter(comment => {
        return this.commentIdList.includes(comment.commentId);
      });
    },
    // 根据评论分数得到评论级别
    commentLevel(score) {
      if (Number(score) <= 2) return '差评';
      if (Number(score) <= 3) return '中评';
      return '好评';
    },
    commentLevelClass(score) {
      if (score <= 2) return 'wc__item-tag--bad';
      if (score <= 3) return 'wc__item-tag--middle';
      return 'wc__item-tag--good';
    }
  }
};
</script>

<style lang="scss">
.word-comment__list {
  height: calc(100% - var(--chart-title-height));
  overflow-y: scroll;

  .wc__item {
    min-height: 40px;
    background: rgba(255,255,255,0.8);
    position: relative;

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      right: 0;
      width: calc(100% - 70px);
      height: 1px;
      background: #fff;
      transform: scaleY(0.5);
    }
  }
  .wc__item-tag {
    height: 24px;
    line-height: 20px;
    padding: 2px 10px;
    margin: 10px;
    background: #aaa;
    color: #fff;
    border-radius: 50px;
  }
  .wc__item-tag--bad {
    background: rgb(60, 75, 83);
  }
  .wc__item-tag--middle {
    background: rgb(56, 219, 133);
  }
  .wc__item-tag--good {
    background: rgb(206, 118, 90);
  }
  .wc__item-content {
    flex: 1;
    // padding: 2px 0;
    line-height: 20px;
    margin: 8px 10px 8px 5px;
  }
}
</style>
