<template>
  <div id="app">
    <topNav></topNav>
    <publist></publist>
  </div>
</template>

<script>
  import topNav from './components/Topnav'
  import publist from './components/Publishlist'
export default {
  name: 'App',
  components:{
    topNav,
    publist
  }
}
</script>

<style>
#app {
  background: #e1e1e1;
}
</style>
