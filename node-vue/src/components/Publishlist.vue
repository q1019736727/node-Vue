<template>
    <div class="publish-wrapper">
      <div class="postlist">
        <ul>
          <li v-for="item in postlistData">
              <div>
                <img :src="item.author.avatar_url" alt="">
                <span class="views">
                  <span>{{item.reply_count}}/</span><span>{{item.visit_count}}</span>
                </span>
                <span class="title"><a href="javascript:void(0)">{{item.title}}</a></span>
              </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Publishlist",
        data:function () {
          return{
            postlistData:[]
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
                page:1
              }
            }).then((response)=>{
              this.postlistData = response.data.data
            })
          }
        }
    }
</script>

<style lang="scss" scoped>
  .publish-wrapper{
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
    background: white;
    .postlist{
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
          div{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: start;
            align-items: center;
            .title{
              display: inline-block;
              vertical-align: top;
              overflow: hidden;
              max-width: 70%;
              white-space: nowrap;
              text-overflow:ellipsis;
              color: #333;
              font-size: 16px;
            }
            img{
              width: 30px;
              height: 30px;
              margin-left: 10px;
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
          }
        }
      }
    }
  }
</style>
