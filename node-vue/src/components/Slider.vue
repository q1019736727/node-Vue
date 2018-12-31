<template>
  <div class="slider-wrapper">
    <div class="userHeader">
      <div class="header">
          <span>作者</span>
      </div>
      <div class="main">
        <img :src="userInfo.avatar_url" alt="">
        <span class="username">{{userInfo.loginname}}</span>
        <p class="point">{{userInfo.score}}积分</p>
        <p class="regist">注册时间{{userInfo.create_at | formDate}}</p>
      </div>
    </div>
    <div class="userCreatpost">
      <div class="header">
        <span>最近创建的话题</span>
      </div>
      <div class="main">
        <ul>
          <li v-for="item in creatPost">
            <div>
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
      </div>
    </div>
    <div class="userJoin">
      <div class="header">
        <span>最近参与的话题</span>
      </div>
      <div class="main">
        <ul>
          <li v-for="item in joinPost">
            <div>
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
      </div>
    </div>
  </div>
    
</template>

<script>
    export default {
        name: "Slider",
        data(){
          return{
            userInfo:{},
          }
        },
        beforeMount:function () {
          this.getData()
        },
        computed:{
          //创建话题
          creatPost:function () {
            if (this.userInfo.recent_topics){
              return this.userInfo.recent_topics.slice(0,5)
            }
          },
          //参与话题
          joinPost:function () {
            if (this.userInfo.recent_replies){
              return this.userInfo.recent_replies.slice(0,5)
            }
          }
        },
        methods:{
          getData:function () {
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
              .then(response=>{
                this.userInfo = response.data.data
              })
              .catch(function (error) {
                console.log(error)
              })

          }
        }
    }
</script>

<style lang="scss" scoped>
  .slider-wrapper{
    float: right;
    width: 290px;
    background: #e1e1e1;
    margin-top: 15px;
    .userHeader{
      background: #f6f6f6;
      border-radius: 5px;
      .header{
        height: 40px;
        position: relative;
        &::after{
          content: '';
          display: block;
          height: 1px;
          background: #e5e5e5;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }
        span{
          color: #444;
          display: inline-block;
          vertical-align: top;
          height: 100%;
          line-height: 40px;
          margin-left: 10px;
          font-size: 13px;
        }
      }
      .main{
        background: white;
        padding: 10px;
        img{
          width: 40px;
          height: 40px;
          border-radius: 5px;
        }
        .username{
          color: #778087;
          font-size: 14px;
          margin-top: -10px;
        }
        .point,.regist{
          color: #333;
          font-size: 14px;
          padding-top: 5px;
        }

      }
    }
    .userCreatpost,.userJoin{
      margin-top: 10px;
      background: white;
      border-radius: 5px;
      .header{
        height: 40px;
        display: flex;
        position: relative;
        background: #f6f6f6;
        justify-content: start;
        align-items: center;
        &::after{
          content: '';
          display: block;
          height: 1px;
          background: #e5e5e5;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }
        span{
          margin-left: 10px;
          font-size: 14px;
          color: #444;
        }
      }
      .main{
        ul{
          li{
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
                color: #08c;
                font-size: 15px;
                margin-left: 10px;
                a{
                  &:hover{
                    text-decoration-line: underline;
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
  }

</style>
