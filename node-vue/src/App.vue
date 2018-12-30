<template>
  <div id="app">
    <topNav></topNav>
    <router-view name="main"></router-view>
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

<style>
#app {
  background: #e1e1e1;
}
</style>
