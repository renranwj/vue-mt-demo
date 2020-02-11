<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="cart-decrease icon-remove_circle_outline"
        @click.stop.prevent="decreaseCart"
        v-show="food.count"
      ></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
                                        <!-- 阻止事件冒泡 -->
    <div class="cart-add icon-add_circle" @click.stop.prevent="increaseCart">
      <i class="bg"></i>
    </div>
  </div>
</template>
  
  <script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 添加数量
    decreaseCart() {
      this.food.count--;
    },
    // 减少数量
    increaseCart() {
      if (!this.food.count) {
        // 将当前属性添加到对象(food)里面
        Vue.set(this.food, "count", 1);
        // console.log(this.food)
      } else {
        this.food.count++;
      }
    }
  }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.cartcontrol {
  font-size: 0;
}
.cartcontrol .cart-decrease {
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #b4b4b4;
}
.cartcontrol .cart-add .bg {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  position: absolute;
  left: 3px;
  top: 3px;
  z-index: -1;
}
.cartcontrol .cart-count {
  display: inline-block;
  width: 25px;
  text-align: center;
  font-size: 12px;
  line-height: 26px;
  vertical-align: top;
}
.cartcontrol .cart-add {
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  color: #ffd161;
  position: relative;
}

/* 加减动画 */
.move-enter-active,
.move-leave-active {
  transition: all 0.5s linear;
}
.move-enter,
.move-leave-to {
  transform: translateX(20px) rotate(180deg);
}


.food .food-wrapper .food-content .img-wrapper .food-img{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
}

.food .food-wrapper .food-content .img-wrapper .food-img{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
}
.food .food-wrapper .food-content .img-wrapper .close-bt{
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
.food .food-wrapper .food-content .img-wrapper .more-bt
{
	width: 30px;
	height: 30px;
	position: absolute;
	top: 10px;
}
.food .food-wrapper .food-content .img-wrapper .share-bt{
	right: 50px;
}
.food .food-wrapper .food-content .img-wrapper .more-bt{
	right: 10px;
}

</style>
  