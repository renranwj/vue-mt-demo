<template>
  <transition name="foodDetail">
    <div class="food" v-show="showFlag" ref="foodView">
      <div class="food-wrapper">
          <!-- 商品详情 -->
        <div class="food-content">
          <!-- 图片集合 -->
          <div class="img-wrapper">
            <img class="food-img" :src="selectFood.picture" />
            <span class="close-bt icon-close" @click="closeView"></span>
            <img class="share-bt" src="./img/share.png" />
            <img class="more-bt" src="./img/more.png" />
          </div>

          <!-- 商品信息 -->
          <div class="content-wrapper">
            <h3 class="name">{{selectFood.name}}</h3>
            <p class="saled">{{selectFood.month_saled_content}}</p>
            <img
              :src="selectFood.product_label_picture"
              class="product"
              v-show="selectFood.product_label_picture"
            />
            <p class="price">
              ￥
              <span class="text">{{selectFood.min_price}}</span>
              /
              <span class="unit">{{selectFood.unit}}</span>
            </p>

            <!-- 规格选择 -->
            <div class="cartcontrol-wrapper">
              <app-cartcontrol :food="selectFood"></app-cartcontrol>
            </div>
            <div 
            class="buy" 
            v-show="!selectFood.count || selectFood.count == 0"
            @click="addProduct"
            >选规格</div>
          </div>
        </div>

        <!-- split -->
        <app-split></app-split>

        <!-- 评价 -->
        <div class="rating-wrapper">
            <div class="rating-title">
                <!-- vue数据不能超过两级，会有警告错误，那么就在这个地方做一个判断，
                用v-if(只能)。如果对象有值，就展示 -->
                <div class="like-ratio" v-if="selectFood.rating">
                    <span class="title">{{selectFood.rating.title}}</span>
                    <span class="retio">
                        (
                            {{selectFood.rating.like_ratio_desc}}
                            <i>{{selectFood.rating.like_ratio}}</i>
                        )
                    </span>
                </div>
                <div class="snd-title" v-if="selectFood.rating">
                    <span class="text">{{selectFood.rating.snd_title}}</span>
                    <span class="icon icon-keyboard_arrow_right"></span>
                </div>
            </div>

            <!-- 评价列表 -->
            <ul class="rating-content" v-if="selectFood.rating">
                <li 
                v-for="(item, index) in selectFood.rating.comment_list" :key="index"
                class="comment-item"
                >
                <div class="comment-header">
                    <img :src="item.user_icon" v-if="item.user_icon">
                    <img src="./img/anonymity.png" v-if="!item.user_icon">
                </div>
                <div class="comment-main">
                    <div class="user">
                        {{item.user_name}}
                    </div>
                    <div class="time">
                        {{item.comment_time}}
                    </div>
                    <div class="content">
                        {{item.comment_content}}
                    </div>
                </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//引入滚动插件
import BScroll from "better-scroll";

import Vue from 'vue';
import CartControl from "../cartControl/CartControl";
import Split from "../split/Split";
export default {
  data() {
    return {
      showFlag: false
    };
  },
  props: {
    selectFood: {
      type: Object,
      default: {}
    }
  },
  components: {
    "app-cartcontrol": CartControl,
    "app-split": Split
  },
  methods: {
    showView() {
      this.showFlag = true;

        this.$nextTick(() => {
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.foodView, {
                    click:true
                })
            }else {
                this.scroll.refresh();
            }
        })
    },
    closeView() {
      this.showFlag = false;
    },
    addProduct () {
        Vue.set(this.selectFood, "count", 1)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 51px;
  background: white;
  width: 100%;
  z-index: 90;
}

/* 动画 */
.foodDetail-enter-active,
.foodDetail-leave-active {
  transition: all 1s;
}
.foodDetail-enter,
.foodDetail-leave-to {
  transform: translateX(100%);
}

.food .food-wrapper .food-content .img-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.food .food-wrapper .food-content .img-wrapper .food-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.food .food-wrapper .food-content .img-wrapper .food-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.food .food-wrapper .food-content .img-wrapper .close-bt {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 10px;
  top: 10px;
  text-align: center;
  font-size: 30px;
  color: white;
  background: #7f7f7f;
  border-radius: 50%;
}
.food .food-wrapper .food-content .img-wrapper .share-bt,
.food .food-wrapper .food-content .img-wrapper .more-bt {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
}
.food .food-wrapper .food-content .img-wrapper .share-bt {
  right: 50px;
}
.food .food-wrapper .food-content .img-wrapper .more-bt {
  right: 10px;
}

.food .food-wrapper .food-content .content-wrapper {
  padding: 0 0 16px 16px;
  position: relative;
}
.food .food-wrapper .food-content .content-wrapper .name {
  font-size: 15px;
  color: #333333;
  line-height: 30px;
  font-weight: bold;
}
.food .food-wrapper .food-content .content-wrapper .saled {
  font-size: 11px;
  color: #9d9d9d;
  margin-bottom: 6px;
}
.food .food-wrapper .food-content .content-wrapper .product {
  height: 15px;
  margin-bottom: 16px;
}
.food .food-wrapper .food-content .content-wrapper .price {
  font-size: 0;
}
.food .food-wrapper .food-content .content-wrapper .price .text {
  font-size: 17px;
  color: #fb4e44;
}
.food .food-wrapper .food-content .content-wrapper .price .unit {
  font-size: 11px;
  color: #9d9d9d;
}
.food .food-wrapper .food-content .cartcontrol-wrapper {
  position: absolute;
  right: 12px;
  bottom: 10px;
  padding: 2px;
}
.food .food-wrapper .food-content .buy {
  width: 64px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  background: #ffd161;
  border-radius: 30px;
  position: absolute;
  right: 12px;
  bottom: 10px;
}

/* 评价 */
.food .food-wrapper .rating-wrapper{
	padding-left: 16px;
}
.food .food-wrapper .rating-wrapper .rating-title{
	padding: 16px 16px 16px 0;
}
.food .food-wrapper .rating-wrapper .rating-title .like-ratio{
	float: left;
	font-size: 0;
}
.food .food-wrapper .rating-wrapper .rating-title .like-ratio .title{
	font-size: 13px;
}
.food .food-wrapper .rating-wrapper .rating-title .like-ratio .ratio{
	font-size: 11px;
}
.food .food-wrapper .rating-wrapper .rating-title .like-ratio .ratio i{
	color: #FB4E44;
	font-size: 11px;
}
.food .food-wrapper .rating-wrapper .rating-title .snd-title{
	float: right;
	font-size: 0;
}
.food .food-wrapper .rating-wrapper .rating-title .snd-title .text,
.food .food-wrapper .rating-wrapper .rating-title .snd-title .icon
{
	font-size: 13px;
	color: #9D9D9D;
	display: inline-block;
}
.food .food-wrapper .rating-wrapper .rating-title .snd-title .icon{
	margin-left: 12px;
}
.food .food-wrapper .rating-wrapper .comment-item{
	padding: 15px 14px 17px 0;
	border-bottom: 1px solid #F4F4F4;
	width: 100%;
	box-sizing: border-box;
	display: flex;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-header{
	flex: 0 0 41px;
	margin-right: 10px;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-header img{
	width: 41px;
	height: 41px;
	border-radius: 50%;
}

.food .food-wrapper .rating-wrapper .comment-item .comment-main{
	flex: 1;
	margin-top: 6px;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-main .user{
	width: 50%;
	float: left;
	font-size: 12px;
	color: #333333;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-main .time{
	width: 50%;
	float: right;
	text-align: right;
	font-size: 10px;
	color: #666666;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-main .content{
	margin-top: 17px;
	font-size: 13px;
	line-height: 19px;
}
</style>