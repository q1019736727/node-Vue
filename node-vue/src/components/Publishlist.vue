<template>
    <div class="publish-wrapper">
      <div :class="[loading]" v-if="isLoading">
        <img src="../assets/loading.gif" alt="">
      </div>
      <div class="postlist" v-else>
        <ul>
          <li>
            <ul>
              <li>全部</li>
              <li>精华</li>
              <li>分享</li>
              <li>问答</li>
              <li>招聘</li>
            </ul>
          </li>
          <li v-for="item in postlistData">
              <div>
                <router-link :to="{name:'user-page',params:{username: item.author.loginname}}">
                  <img :src="item.author.avatar_url" alt="">
                </router-link>
                <span class="views">
                  <span>{{item.reply_count}}/</span><span>{{item.visit_count}}</span>
                </span>
                <span :class="item | postClass">{{item | postType}}</span>
                <span class="title">
                  <router-link :to="{
                  name:'post-detail',
                  params:{
                    id:item.id,
                    name:item.author.loginname
                  }
                  }">
                    <a href="javascript:void(0)">{{item.title}}</a>
                  </router-link>
                </span>
                <span class="time">{{item.last_reply_at | formDate}}</span>
              </div>
          </li>
        </ul>
        <PageBar @changePage="handle"></PageBar>
      </div>
    </div>
</template>

<script>
  import PageBar from './PageBar'
    export default {
        name: "Publishlist",
        components:{
          PageBar
        },
        data:function () {
          return{
            postlistData:[],
            isLoading: true,
            loading: 'loading',
            pageNum:1
          }
        },
        beforeMount:function() {
          this.getListData()
        },
        methods:{
          getListData:function () {
            this.$http.get('https://cnodejs.org/api/v1/topics',{
              params: {
                limit:30,
                page:this.pageNum
              }
            }).then((response)=>{
              this.isLoading = false
              this.postlistData = response.data.data
            })
          },
          handle(page){
            this.pageNum = page
            this.getListData()
          }
        },
      filters:{
        //帖子类型
        postType:function (item) {
          if (item.top === true){
            return "置顶"
          }else if (item.good === true){
            return "精华"
          }else if (item.tab === 'share'){
            return "分享"
          }else if (item.tab === 'ask'){
            return "问答"
          }else{
            return ''
          }
        },
        //class类型
        postClass:function (item) {
          if (item.top === true){
            return "top"
          }else if (item.good === true){
            return "good"
          }else if (item.tab === 'share'){
            return "share"
          }else if (item.tab === 'ask'){
            return "ask"
          }else {
            return ''
          }
        },

      }
    }
</script>

<style lang="scss" scoped>
  .publish-wrapper{
    max-width: 850px;
    margin: 0 auto;
    overflow: hidden;
    background: white;
    .loading{
      display: none;
      height: calc(100vh - 50px);
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 300px;
      }
    }
    .postlist{
      ul{
        li:first-child{
          ul{
            height: 50px;
            background: #f5f5f5;
            display: flex;
            justify-content: start;
            align-items: center;
            li{
              margin-left: 20px;
              color: #80bd01;
              font-size: 14px;
              &:hover{
                cursor: pointer;
              }
            }
          }
        }
        li:not(:first-child){
          &::after{
            content: '';
            display: block;
            height: 1px;
            background-color: #f0f0f0;
            -webkit-transform: scaleY(.5);
            transform:scaleY(.5);
          }
          &:hover{
            background: #f5f5f5;
          }
          div{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: start;
            align-items: center;
            position: relative;
            .title{
              display: inline-block;
              vertical-align: top;
              overflow: hidden;
              max-width: 70%;
              white-space: nowrap;
              text-overflow:ellipsis;
              color: #333;
              font-size: 15px;
              a{
                &:hover{
                  text-decoration-line: underline;
                }
              }
            }
            img{
              width: 30px;
              height: 30px;
              margin-left: 10px;
              &:hover{
                cursor: pointer;
              }
            }
            .top,.good{
              background: #80bd01;
              color: white;
              font-size: 12px;
              border-radius: 3px;
              padding: 1px 3px;
              margin-right: 5px;
            }
            .share,.ask{
              background: #e5e5e5;
              color: #999;
              font-size: 12px;
              border-radius: 3px;
              padding: 1px 3px;
              margin-right: 5px;
            }
            .views{
              display: inline-block;
              width: 70px;
              text-align: center;
              span{
                &:nth-child(1){
                  font-size: 14px;
                  color: #9e78c0;
                }
                &:nth-child(2){
                  font-size: 12px;
                  color: #b4b4b4;
                }
              }
            }
            .time{
              color: #777;
              font-size: 11px;
              position: absolute;
              right: 10px;
            }
          }
        }
      }
    }
  }
</style>
