<template>
  <div id="app">
    <!-- header -->
    <app-header :poinInfo="poiInfo"></app-header>

    <!-- nav -->
    <app-nav :commentNum="commentNum"></app-nav>

    <!-- content -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import Header from './components/header/Header';
  import Nav from './components/nav/Nav'
  export default {
    components: {
      "app-header": Header,
      "app-nav": Nav
    },
    data () {
      return {
        poiInfo: {},
        commentNum: 0
      }
    },
    created () {
      this.$axios.get('/api/goods').then(
        res => {
          if(res.data.code == 0) {
            this.poiInfo = res.data.data.poi_info;
          }
        }
      ).catch(
        rej => {
          console.log('请求goods错误');
        }
      )

      this.$axios.get('/api/ratings').then(
        res => {
          if(res.data.code == 0) {
            this.commentNum = res.data.data.comment_num;
          }
        }
      ).catch(
        rej => {
          console.log('请求ratings错误');
        }
      )
    }
  } 
</script>

<style scoped>

</style>
