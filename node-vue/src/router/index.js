import Vue from 'vue'
import Router from 'vue-router'
import Publish from '../components/Publishlist'
import Postdetail from '../components/Postdetail'
import Userinfo from '../components/UserInfo'
import Slider from '../components/Slider'
Vue.use(Router)

export default new Router({
  // mode:'history',//去掉路径上的#
  routes: [
    {
      name:'root',//router-link跳转时需要使用
      path:'/',
      components:{
        main: Publish//这里和下面命名main是因为渲染的时候(router-view 时需要用)
      }
    },
    {
      name:'post-detail',
      path:'/topic/:id&:name',//需要传递参数id和name,注意在
      components:{
        main: Postdetail,
        slider: Slider
      }
    },
    {
      name:'user-page',
      path:'/user/:username',
      components:{
        main:Userinfo
      }
    },

  ]
})
