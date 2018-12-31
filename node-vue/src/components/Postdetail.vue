<template>
  <div class="postdetail-wrapper">
    <div :class="[loading]" v-if="isLoading">
      <img src="static/images/loading.gif" alt="">
    </div>
    <div class="publish-content" v-else>
      <h2 class="title">{{post.title}}</h2>
      <p class="title-time">
        • 发布于{{post.create_at | formDate}}
        • 作者{{this.$route.params.name}}
        • {{post.visit_count}}次浏览
      </p>
      <div v-html="post.content" id="content"></div>
    </div>
    <p class="reply-header">{{post.reply_count}}回复</p>
    <div class="replylist">
      <ul>
        <li v-for="(item,index) in post.replies">
          <div class="single-reply">
            <section class="replyInfo">
              <router-link :to="{name: 'user-page',params:{username:item.author.loginname}}">
                <img :src="item.author.avatar_url">
              </router-link>
              <span class="replyname">{{item.author.loginname}}</span>
              <span class="replylayer">{{index+1}}楼</span>
              <span class="replytime">{{item.create_at | formDate}}</span>
            </section>
            <p v-html="item.content" class="content"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Postdetail",
        data(){
          return {
            post:{},
            isLoading: true,
            loading: 'loading'
          }
        },
        beforeMount(){
          this.isLoading = true
          this.getData()
        },
        watch:{
          //监听路由
          $route( to , from ){
            this.getData()
          }
        },
        methods:{
          getData:function() {
              this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
                .then(resposne=>{
                  this.post = resposne.data.data
                  this.isLoading = false
                })
                .catch(function (error) {
                  console.log(error)
                })
          }
        }
    }
</script>

<style lang="scss">
  @import url('../assets/markdown.css');//引入markdown样式
  .postdetail-wrapper{
    max-width: 800px;
    background: white;
    margin: 15px auto;
    float: left;
    .loading{
      display: none;
      height: calc(100vh - 50px);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 800px;
      img{
        width: 300px;
      }
    }
    .publish-content{
      width: 800px;
    }
    .title{
      padding: 20px 10px 0 10px;
    }
    .title-time{
      color: #838383;
      font-size: 12px;
      line-height: 40px;
      padding: 0 10px;
      &::after{
        content: '';
        display: block;
        height: 1px;
        background-color: #e5e5e5;
      }
    }
    #content{
      padding: 10px;
      font-size: 15px;

    }
    .reply-header{
      color: #444;
      font-size: 14px;
      line-height: 40px;
      padding: 0 10px;
      background: #f6f6f6;
      &::after{
        content: '';
        display: block;
        height: 1px;
        background: #f0f0f0;
      }
    }
    .replylist{
      background: white;
      &>ul>li{
        &::after{
          content: '';
          display: block;
          height: 1px;
          background: #f0f0f0;
        }
      }
      ul{
        li{
          .single-reply{
            padding: 15px;
            .content{
              background: white;
              color: #444;
              font-size: 14px;
              line-height: 25.5px;
              padding-left: 45px;
            }
            &>.replyInfo>a>img{
              width: 30px;
              height: 30px;
              border-radius: 5px;
              margin-right: 5px;
              &:hover{
                cursor: pointer;
              }
            }
            .replyInfo{
              display: flex;
              justify-content: start;
              align-items: center;
              .replyname,.replylayer,.replytime{
                margin-right: 5px;
                font-size: 12px;
              }
              .replyname{
                color: #666;
              }
            }
          }
        }
      }
    }
  }
  .markdown-text{
    p{
      color: #444;
      font-size: 14px;
      line-height: 25.5px;
      background: white !important;
    }
    img{
      width: 100% !important;
    }
  }
</style>
