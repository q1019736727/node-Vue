<template>
  <div id="app">
    <topNav></topNav>
    <div class="main clearfix">
      <router-view name="main"></router-view>
      <router-view name="slider"></router-view>
    </div>
  </div>
</template>

<script>
  import topNav from './components/Topnav'
export default {
  name: 'App',
  components:{
    topNav
  }
}
</script>

<style lang="scss">
#app {
  background: #e1e1e1;
  .main{
    max-width: 1100px;
    margin: 0 auto;

  }
}
</style>
