<style lang="scss" scoped>
  .headerWrapper {
    height: 80px;
  }

  .header {
    height: 80px;
    background-color: #fff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative;
    box-shadow:0 2px 8px #f0f1f2;
  }
</style>
<template>
  <div class="headerWrapper">
    <header class="header" ref="header">
      ssss
    </header>
  </div>
</template>
<script>
  import bus from '../bus';
  export default {
    data() {
      return {
      };
    },

    computed: {
    },
    mounted() {
    },

    created() {
      
    }
  };
</script>
