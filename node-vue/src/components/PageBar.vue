<template>
  <div class="page-wrapper">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-show="ismore">......</button>
    <button @click="changeBtn(item)" v-for="item in Pages" :class="{active: selectIndex === item}">{{item}}</button>
    <button @click="changeBtn">下一页</button>
  </div>
    
</template>

<script>
    export default {
        name: "PageBar",
        data:function () {
          return{
            Pages:[1,2,3,4,5,'......'],
            selectIndex:1,
            ismore:false//是否显示前面的......
          }
        },
        methods:{
          changeBtn(page){
            if (typeof page !== 'number') {
              if (typeof page === 'string'){
                return
              }
              let str = page.currentTarget.innerText
              switch (str) {
                case '首页':
                  this.Pages = [1,2,3,4,5,'......'];
                  this.changeBtn(1);
                  break
                case '上一页':
                  this.$jq('button.active').prev().click()
                  break
                case '下一页':
                  this.$jq('button.active').next().click()
                  break
              }
              return
            }
            this.selectIndex = page;
            if(page>4){
              this.ismore = true;
            }else{
              this.ismore = false;
            }
            if(page == this.Pages[4] ){
              this.Pages.shift();
              this.Pages.splice(4,0,this.Pages[3]+1);
            }else if(page == this.Pages[0] && page !=1){
              this.Pages.unshift(this.Pages[0]-1);
              this.Pages.splice(5,1);
            }
            this.$emit('changePage',page)
          }
        }
    }
</script>

<style lang="scss" scoped>
  .page-wrapper{
    width: 850px;
    height: 50px;
    background: white;
    display: flex;
    justify-content: start;
    align-items: center;
    button{
      border: 1px solid #dddddd;
      margin-left: 15px;
      padding: 3px 5px;
      border-radius: 5px;
      min-width: 40px;
      &:focus{
        outline: none;
      }
      &.active{
        background: #80bd01;
        color: white;
        border: 1px solid #80bd01;
      }
    }

  }
</style>
