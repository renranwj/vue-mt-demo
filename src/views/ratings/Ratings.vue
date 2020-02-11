<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-wrapper">
      <!-- 评价评分 -->
      <div class="overview">
        <div class="overview-left">
          <!-- 商家评分 -->
          <div class="comment-score">
            <p class="score">{{ratings.comment_score}}</p>
            <p class="text">商家评分</p>
          </div>
          <!-- 其他评分 -->
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <app-star class="star" :score="ratings.quality_score"></app-star>
              <span class="score">{{ratings.quality_score}}</span>
            </div>
            <div class="pack-score item">
              <span class="text">包装</span>
              <app-star class="star" :score="ratings.pack_score"></app-star>
              <span class="score">{{ratings.pack_score}}</span>
            </div>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{ratings.delivery_score}}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>
      <app-split></app-split>

      <!-- 主体部分 -->
      <div class="content">
        <!-- tab切换 -->
        <div class="rating-select" v-if="ratings.tab">
          <span
            class="item"
            @click="selectTypeFn(2)"
            :class="{'active': selectType == 2}"
          >{{ratings.tab[0].comment_score_title}}</span>
          <span
            class="item"
            @click="selectTypeFn(1)"
            :class="{'active': selectType == 1}"
          >{{ratings.tab[1].comment_score_title}}</span>
          <span class="item" @click="selectTypeFn(0)" :class="{'active': selectType == 0}">
            <!-- <img src="./img/icon_sub_tab_dp_normal@2x.png" v-show="selectType != 0" />
            <img src="./img/icon_sub_tab_dp_highlighted@2x.png" v-show="selectType == 0" />-->
            {{ratings.tab[2].comment_score_title}}
          </span>
        </div>

        <!-- 关键词 -->
        <div class="labels-view">
          <span
            v-for="(item, index) in ratings.labels"
            :key="index"
            :class="{'heigligh': item.label_star > 0}"
            class="item"
          >{{item.content}}{{item.label_count}}</span>
        </div>

        <!-- 评价列表 -->
        <ul class="rating-list">
          <li v-for="(item, index) in selectComment" :key="index" class="comment-item">
            <div class="comment-header">
              <img :src="item.user_pic_url" v-if="item.user_pic_url" />
              <img src="./img/anonymity.png" v-if="!item.user_pic_url" />
            </div>
            <div class="comment-main">
              <div class="user">{{item.user_name}}</div>
              <div class="time">{{formatDate(item.comment_time)}}</div>
              <div class="star-wrapper">
                <span class="text">评分</span>
                <app-star :score="item.order_comment_score" class="star"></app-star>
              </div>
              <div class="content">{{item.comment}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Split from "../../components/split/Split";
import Star from "../../components/star/Star";

import BScroll from "better-scroll";
const all = 2; //全部
const picture = 1; //有图
const comment = 0; //点评
export default {
  data() {
    return {
      ratings: {},
      selectType: all
    };
  },
  components: {
    "app-split": Split,
    "app-star": Star
  },
  methods: {
    // 切换tab
    selectTypeFn(index) {
      this.selectType = index;
    },
    // 格式化时间戳
    formatDate(time) {
      let date = new Date(time * 1000);
      // console.log(date);
      let fmt = "yyyy.MM.dd";
      if (/(y+)/.test(fmt)) {
        // 年
        let year = date.getFullYear().toString();
        fmt = fmt.replace(RegExp.$1, year);
      }
      if (/(M+)/.test(fmt)) {
        // 月
        let mouth = date.getMonth() + 1;
        if (mouth < 10) {
          mouth = "0" + mouth;
        }
        fmt = fmt.replace(RegExp.$1, mouth);
      }
      if (/(d+)/.test(fmt)) {
        // 日
        let mydate = date.getDate();
        if (mydate < 10) {
          mydate = "0" + mydate;
        }
        fmt = fmt.replace(RegExp.$1, mydate);
      }
      return fmt;
    }
  },
  computed: {
    selectComment() {
      if (this.selectType == all) {
        //请求全部
        return this.ratings.comments;
      } else if (this.selectType == picture) {
        //  图片
        let arr = [];
        this.ratings.comments.forEach(ele => {
          // console.log(this.ratings.comments.comment_pics)
          // console.log(ele)
          if (ele.comment_pics.length) {
            arr.push(ele);
          }
        });
        return arr;
      } else {
        return this.ratings.comments_dp.comment;
      }
    }
  },
  created() {
    this.$axios
      .get("/api/ratings")
      .then(res => {
        this.ratings = res.data.data;
        // console.log(this.ratings)
        // console.log(this.ratings.tab[0].comment_score_title)

        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      })
      .catch(rej => {
        console.log("请求ratings错误");
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ratings {
  position: absolute;
  left: 0;
  top: 191px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

/* 评分 */
.ratings .ratings-wrapper .overview {
  padding: 20px 0 18px 0;
  display: flex;
}
.ratings .ratings-wrapper .overview .overview-left {
  flex: 1;
  padding-left: 26px;
}
.ratings .ratings-wrapper .overview .overview-left .comment-score {
  float: left;
  width: 48px;
  text-align: center;
  margin-right: 26px;
}
.ratings .ratings-wrapper .overview .overview-left .comment-score .score {
  font-size: 23px;
  font-weight: 800;
  color: #ffb000;
  margin-bottom: 9px;
}
.ratings .ratings-wrapper .overview .overview-left .comment-score .text {
  font-size: 11px;
  color: #666666;
}
.ratings .ratings-wrapper .overview .overview-left .other-score {
  float: left;
  margin-top: 3px;
}
.ratings .ratings-wrapper .overview .overview-left .other-score .item {
  height: 11px;
}
.ratings .ratings-wrapper .overview .overview-left .other-score .item .text {
  font-size: 11px;
  color: #666666;
  margin-right: 11px;
  float: left;
}
.ratings .ratings-wrapper .overview .overview-left .other-score .item .star {
  float: left;
  margin-right: 11px;
}
.ratings .ratings-wrapper .overview .overview-left .other-score .item .score {
  font-size: 11px;
  color: #ffb000;
  float: left;
}
.ratings .ratings-wrapper .overview .overview-left .other-score .quality-score {
  margin-bottom: 14px;
}
.ratings .ratings-wrapper .overview .overview-right {
  flex: 0 0 100px;
  text-align: center;
  border-left: 1px solid #9d9d9d;
}
.ratings .ratings-wrapper .overview .overview-right .delivery-score .score {
  font-size: 19px;
  font-weight: 500;
  color: #999999;
  margin-bottom: 10px;
  margin-top: 3px;
}
.ratings .ratings-wrapper .overview .overview-right .delivery-score .text {
  font-size: 11px;
  color: #999999;
}

/* 主体 */
.ratings .ratings-wrapper .content {
  padding: 16px;
}
.ratings .ratings-wrapper .content .rating-select {
  width: 100%;
  box-sizing: border-box;
  font-size: 0;
  border: 1px solid #ffb000;
  border-right: 0;
  margin-bottom: 11px;
  border-radius: 3px;
}
.ratings .ratings-wrapper .content .rating-select .item {
  width: 33.3%;
  display: inline-block;
  height: 33px;
  line-height: 33px;
  font-size: 14px;
  text-align: center;
  border-right: 1px solid #ffb000;
  box-sizing: border-box;
  color: #ffb000;
}
.ratings .ratings-wrapper .content .rating-select .item:last-child img {
  height: 14px;
  vertical-align: middle;
}
.ratings .ratings-wrapper .content .rating-select .item.active {
  background: #ffb000;
  color: black;
}
.ratings .ratings-wrapper .content .labels-view .item {
  display: inline-block;
  height: 27px;
  line-height: 27px;
  padding: 0 10px;
  font-size: 12px;
  background: #f4f4f4;
  margin-right: 3px;
  margin-bottom: 6px;
  border-radius: 3px;
  color: #999999;
}
.ratings .ratings-wrapper .content .labels-view .item.highligh {
  color: #656565;
}
.ratings .ratings-wrapper .content .rating-list {
}
.ratings .ratings-wrapper .content .rating-list .comment-item {
  padding: 16px 16px 16px 0;
  border-bottom: 1px solid #f4f4f4;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
.ratings .ratings-wrapper .content .rating-list .comment-item .comment-header {
  flex: 0 0 35px;
  margin-right: 11px;
}
.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-header
  img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.ratings .ratings-wrapper .content .rating-list .comment-item .comment-main {
  flex: 1;
}
.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .user {
  width: 50%;
  float: left;
  font-size: 11px;
  color: #333333;
}
.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .time {
  width: 50%;
  float: right;
  text-align: right;
  font-size: 9px;
  color: #666666;
}

.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .star-wrapper {
  float: left;
  margin-top: 12px;
  margin-bottom: 15px;
  width: 100%;
}

.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .star-wrapper
  .text {
  color: #999999;
  font-size: 10px;
  float: left;
  /* line-height: 14px; */

}

.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .star-wrapper
  .star {
  float: left;
  margin-left: 7px;
}

.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .c_content {
  font-size: 13px;
  line-height: 19px;
  float: left;
  width: 100%;
}

.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .c_content
  i {
  color: #576b95;
}

.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .img-wrapper {
  margin-top: 9px;
  float: left;
}

.ratings
  .ratings-wrapper
  .content
  .rating-list
  .comment-item
  .comment-main
  .img-wrapper
  img {
  width: 175px;
}
</style>