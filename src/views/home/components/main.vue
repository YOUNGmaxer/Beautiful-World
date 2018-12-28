<template>
<div class="chart-container">
  {{ tabIndex }}
</div>  
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 'main'
    }
  },

  // 对路由参数变化作出响应
  watch: {
    '$route' (to, from) {
      console.log(to, from);
      console.log(this.$route.params['tabName']);
      this.tabIndex = this.$route.params['tabName'];
    }
  },

  mounted() {
    this.tabIndex = this.$route.params['tabName'];
    console.log(this.tabIndex);
  }
}
</script>

<style>
</style>
