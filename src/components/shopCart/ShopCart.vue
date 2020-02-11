<template>
  <div class="shopcart">
    <div class="shopcart-wrapper">
      <!-- 底部左侧 -->
      <div class="content-left">
        <!-- 有值的话，显示高亮 -->
        <div class="logo-wrapper" :class="{'highligh': totalCount > 0}">
          <span
            class="icon-shopping_cart logo"
            :class="{'highligh': totalCount > 0}"
            @click="toggleList"
          ></span>
          <i class="total-num" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="desc-wrapper">
          <p class="total-price" v-show="totalPrice">￥{{totalPrice}}</p>
          <p class="tip" :class="{'highligh': totalCount > 0}">另需{{poinInfo.shipping_fee_tip}}</p>
        </div>
      </div>
      <!-- 底部右侧 -->
      <div class="content-right" :class="{'highligh': totalCount > 0}">{{payStr}}</div>

      <!-- 购物车列表 -->
      <div class="shopcart-list" v-show="listShow" :class="{'show': listShow}">
        <div class="list-top" v-if="poinInfo.discounts2">{{poinInfo.discounts2[0].info}}</div>
        <div class="list-header">
          <h3 class="title">1号口袋</h3>
          <div class="empty" @click="clearAll">
            <img src="./img/ash_bin.png" />
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food-item" v-for="(item, index) in selectFoods" :key="index">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{item.name}}</p>
                  <!-- 保证只显示一个 -->
                  <p class="unit" v-show="!item.description">{{item.unit}}</p>
                  <p class="description" v-show="!item.unit">{{item.description}}</p>
                </div>
                <div class="desc-right">￥{{item.min_price}}</div>
              </div>
              <div class="cartcontrol-wrapper">
                <app-cartcontrol :food="item"></app-cartcontrol>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom"></div>
      </div>
    </div>

    <!-- 覆盖层 -->
    <div
      class="shopcart-cover"
      v-show="listShow"
      @click="hideCover"
      :class="{'highligh': totalCount > 0}"
    ></div>
  </div>
</template>

<script>
import CartControl from "../cartControl/CartControl";

import BScroll from "better-scroll";
export default {
  data() {
    return {
      // 购物车个数是否为空，是true，否false
      flag: true
    };
  },
  props: {
    poinInfo: {
      type: Object,
      default: {}
    },
    selectFoods: {
      type: Array,
      // array的default是一个方法
      default() {
        return [];
      }
    }
  },
  computed: {
    // 计算总量
    totalCount() {
      let num = 0;
      this.selectFoods.forEach(ele => {
        num += ele.count;
      });
      // console.log(this.selectFoods)
      // console.log(this.poinInfo)

      return num;
    },
    // 计算总价
    totalPrice() {
      let price = 0;
      this.selectFoods.forEach(ele => {
        price += ele.min_price * ele.count;
      });
      return price;
    },
    // 结算部分显示内容
    payStr() {
      if (this.totalCount > 0) {
        return "去结算";
      } else {
        return this.poinInfo.min_price_tip;
      }
    },
    // 购物车列表展示与否
    listShow() {
      if (!this.totalCount) {
        // 是空，不展示
        this.flag = true;
        return false;
      }
      // 不是空 展示
      let show = !this.flag;
      if (show) {
        //如果列表存在，再进行实例化滚动插件
        this.$nextTick(() => {
          //DOM渲染完成
          if (!this.shopScroll) {
            this.shopScroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            //当页面已经发生变化或者数据发生变化了，会实现refresh，进行刷新
            this.shopScroll.refresh();
          }
        });
      }
      return show;
    }
  },
  components: {
    "app-cartcontrol": CartControl
  },
  methods: {
    toggleList() {
      //   判断购物车个数是否为空
      if (!this.totalCount) {
        return;
      }
      this.flag = !this.flag;
    },
    //   清空购物车
    clearAll() {
      this.selectFoods.forEach(ele => {
        ele.count = 0;
      });
    },
    // 覆盖层
    hideCover() {
      // 购物车数量为空
      this.flag = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/common/css/icon.css");

.shopcart-wrapper {
  width: 100%;
  height: 51px;
  background: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 99;
}

.shopcart-wrapper .content-left {
  flex: 1;
}

.shopcart-wrapper .content-right {
  flex: 0 0 110px;
  font-size: 15px;
  color: #bab9b9;
  line-height: 51px;
  text-align: center;
  font-weight: bold;
}

.shopcart-wrapper .content-left .logo-wrapper {
  width: 50px;
  height: 50px;
  background: #666666;
  border-radius: 50%;
  position: relative;
  top: -14px;
  left: 10px;
  text-align: center;
  float: left;
}

.shopcart-wrapper .content-left .logo-wrapper .logo {
  font-size: 28px;
  color: #c4c4c4;
  line-height: 50px;
}

.shopcart-wrapper .content-left .desc-wrapper {
  float: left;
  margin-left: 13px;
}

.shopcart-wrapper .content-left .desc-wrapper .tip {
  font-size: 12px;
  color: #bab9b9;
  line-height: 51px;
}

/* 高亮样式 */
.shopcart-wrapper .content-left .logo-wrapper.highligh {
  background: #ffd161;
}
.shopcart-wrapper .content-left .logo-wrapper .logo.highligh {
  color: #2d2b2a;
}
.shopcart-wrapper .content-left .logo-wrapper .total-num {
  width: 15px;
  height: 15px;
  line-height: 15px;
  border-radius: 50%;
  font-size: 9px;
  color: white;
  background: red;
  position: absolute;
  right: 0;
  top: 0;
}
.shopcart-wrapper .content-left .desc-wrapper .tip.highligh {
  line-height: 12px;
}
.shopcart-wrapper .content-right.highligh {
  background: #ffd161;
  color: #2d2b2a;
}
.shopcart-wrapper .content-left .desc-wrapper .total-price {
  font-size: 18px;
  line-height: 33px;
  color: white;
}

/* 购物车列表 */
.shopcart-wrapper .shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
}
.shopcart-wrapper .shopcart-list.show {
  transform: translateY(-100%);
}
.shopcart-wrapper .shopcart-list .list-top {
  height: 30px;
  text-align: center;
  font-size: 11px;
  background: #f3e6c6;
  line-height: 30px;
  color: #646158;
}
.shopcart-wrapper .shopcart-list .list-header {
  height: 30px;
  background: #f4f4f4;
}
.shopcart-wrapper .shopcart-list .list-header .title {
  float: left;
  border-left: 4px solid #53c123;
  padding-left: 6px;
  line-height: 30px;
  font-size: 12px;
}
.shopcart-wrapper .shopcart-list .list-header .empty {
  float: right;
  line-height: 30px;
  margin-right: 10px;
  font-size: 0;
}
.shopcart-wrapper .shopcart-list .list-header .empty img {
  height: 14px;
  margin-right: 9px;
  vertical-align: middle;
}
.shopcart-wrapper .shopcart-list .list-header .empty span {
  font-size: 12px;
  vertical-align: middle;
}
.shopcart-wrapper .shopcart-list .list-content {
  max-height: 360px;
  overflow: hidden;
  background: white;
}
.shopcart-wrapper .shopcart-list .list-content .food-item {
  height: 38px;
  padding: 12px 12px 10px 12px;
  border-bottom: 1px solid #f4f4f4;
}
.shopcart-wrapper .shopcart-list .list-content .food-item .desc-wrapper {
  float: left;
  width: 240px;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left {
  float: left;
  width: 170px;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .name {
  font-size: 16px;
  margin-bottom: 8px;
  /* 超出部分隐藏*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 16px;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .unit {
  font-size: 12px;
  color: #b4b4b4;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .description {
  font-size: 12px;
  color: #b4b4b4;
  /* 超出部分隐藏*/
  overflow: hidden;
  height: 12px;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-right {
  float: right;
  width: 70px;
  text-align: right;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-right
  .price {
  font-size: 12px;
  line-height: 38px;
}
.shopcart-wrapper .shopcart-list .list-content .food-item .cartcontrol-wrapper {
  float: right;
  margin-top: 6px;
}

/* 覆盖层样式 */
.shopcart .shopcart-cover{
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 98;
	background: rgba(7,17,27,0.6);
}
</style>