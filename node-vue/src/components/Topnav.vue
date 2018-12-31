<template>
  <div class="topNav">
    <a href="javascript:void(0)">
      <router-link :to="{name:'root'}">
        <img src="../assets/cnodejs_light.svg">
      </router-link>
    </a>
    <div class="toplist">
      <ul>
        <li>首页</li>
        <li>新手入门</li>
        <li>API</li>
        <li>关于</li>
        <li>注册</li>
        <li>登录</li>
      </ul>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Topnav",
        data:function () {
          return {
          }
        }
    }
</script>

<style lang="scss" scoped>
  .topNav{
    height: 50px;
    background: #444444;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{
      margin-left: 50px;
      line-height: 50px;
      img{
        width: 120px;
        margin-top: 10px;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .toplist{
      margin-right: 50px;
      ul{
        display: flex;
        justify-content: space-between;
        align-items: center;
        li{
          margin-left: 30px;
          color: #ccc;
          font-size: 13px;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
