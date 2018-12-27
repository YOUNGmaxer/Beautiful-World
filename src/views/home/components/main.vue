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

  mounted() {
    // this.tabIndex = this.$router.params;
  }
}
</script>

<style>
.chart-container {
  margin-left: 180px;
}
</style>
