<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <!-- 专场 -->
        <li class="menu-item" :class='{"current": currentIndex === 0}' @click="selectMenu(0)">
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon" />
            {{container.tag_name}}
          </p>
        </li>

        <li
          class="menu-item"
          v-for="(item, index) in goods"
          :key="index"
          :class='{"current": currentIndex === index + 1}'
          @click="selectMenu(index + 1)"
        >
          <p class="text">
            <img class="icon" :src="item.icon" v-if="item.icon" />
            {{item.name}}
          </p>
          <i class="num" v-show="calculateCount(item.spus)">
              {{calculateCount(item.spus)}}
          </i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div v-for="(item, index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url" />
          </div>
        </li>
        <!-- 具体分类 -->
        <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
          <h3 class="title">{{item.name}}</h3>

          <!-- 具体商品列表 -->
          <ul>
            <li 
            class="food-item" 
            v-for="(food, index) in item.spus" 
            :key="index"
            @click="showDetail(food)"
            >
              <div class="icon" :style="food_bg(food.picture)"></div>
              <!-- 商品详情 -->
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p v-if="food.description" class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img
                  class="product"
                  :src="food.product_label_picture"
                  v-if="food.product_label_picture"
                />
                <p class="price">
                  <span class="text">${{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
            <!-- 加入购物车 -->
            <div class="cartcontrol-wrapper">
                <!-- 将点击的food,内容传递过去 -->
                <app-cartcontrol :food="food"></app-cartcontrol>
            </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <app-shopcart :poinInfo="poinInfo" :selectFoods="selectFoods"></app-shopcart>

    <!-- 商品详情页 -->
    <app-productdetail :selectFood="selectFood" ref="foodView"></app-productdetail>
  </div>
</template>
  
  <script>
//引入滚动插件
import BScroll from "better-scroll";

import ShopCart from "../../components/shopCart/ShopCart";
import CartControl from "../../components/cartControl/CartControl";
import ProductDetail from '../../components/productDetail/ProductDetail';
export default {
  data() {
    return {
      // 专场数据
      container: {},
      //   食物商品数据
      goods: [],
      //  购物车数据
      poinInfo: {},
      //   商品分类区间的高度（累加）
      foodListHeight: [],

      menuScroll: {},
      foodScroll: {},
      //   滚动高度
      scrollY: 0,
      // 选中的商品详情页
      selectFood: {}
    };
  },
  created() {
    this.$axios
      .get("/api/goods")
      .then(res => {
        if (res.data.code == 0) {
          this.container = res.data.data.container_operation_source;
          this.goods = res.data.data.food_spu_tags;
          this.poinInfo = res.data.data.poi_info;
          //   console.log(this.container, this.goods);
            // console.log(this.poinInfo)
          // 虽然是在created里面执行的，但是这个方法，会在DOM渲染成功之后，才会执行的（这个就可
          //以获取每个区域高度了
          this.$nextTick(() => {
            //   执行滚动方法
            this.initScroll();

            //计算分类的区间高度
            this.calculateHeight();
            //监听滚动位置

            // 根据滚动位置确定下标，与左侧对应

            //通过下标，实现点击左侧，滚动右侧
          });
        }
      })
      .catch(rej => {
        console.log("请求goods错误");
      });
  },
  methods: {
    //   商品图片
    food_bg(picture) {
      return "background-image: url(" + picture + ")";
    },

    //  计算分类的区间高度
    calculateHeight() {
      // 获取元素
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      // console.log(foodList);
      // 进行累加
      let height = 0;
      this.foodListHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.foodListHeight.push(height);
      }
      //   console.log(this.foodListHeight);
    },

    //  滚动插件
    initScroll() {
      // 将实例化的对象保存，才可以使用对象添加滚动事件
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        probeType: 3, //在屏幕滑动和滚动动画中都会触发scroll事件,
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3, //在屏幕滑动和滚动动画中都会触发scroll事件,
        click: true //使用的better-scroll默认会阻止touch事件。所以在配置中需要加上click: true
      });

      //   foodScroll监听事件
      this.foodScroll.on("scroll", pos => {
        // console.log(pos);
        this.scrollY = Math.abs(Math.round(pos.y)); //取绝对值，取整
        // console.log(this.scrollY);
      });
    },
    // 分类列表点击切换
    selectMenu(index) {
      // console.log(index);
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let element = foodList[index];
      // console.log(element)

      //滚动到对应的位置
      //跳转时间
      this.foodScroll.scrollToElement(element, 450);
    },
    // 分类列表内商品选中设置
    calculateCount (spus) {
        let count = 0;
        spus.forEach(ele => {
            if(ele.count > 0) {
                count += ele.count;
            }
        })
        return count;
    },
    // 商品详情页
    showDetail (food) {
      this.selectFood = food;
      
      // 调用子级的方法
      this.$refs.foodView.showView();
    }
  },
  computed: {
    //   拿到具体foodListHeight 的下标
    currentIndex() {
      //   console.log(this.foodListHeight.length);
      for (let i = 0; i < this.foodListHeight.length; i++) {
        // 获取商品类别高度区间
        let height1 = this.foodListHeight[i];
        let height2 = this.foodListHeight[i + 1];

        //防止数组越界
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          //   console.log(i);
          return i;
        }
      }
      return 0;
    },
    // 监听数据里面的foods是否有变化，如果count>0,将他传递给shopCart
    selectFoods () {
        let food = [];
        this.goods.forEach(foods => {
            foods.spus.forEach(ele => {
                if(ele.count >= 1) {
                    food.push(ele);
                }
            })
        });
        return food;
    }
  },
  components: {
    "app-shopcart": ShopCart,
    "app-cartcontrol": CartControl,
    "app-productdetail": ProductDetail
  }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%;
}
.menu-wrapper {
  flex: 0 0 85px;
  background: #f4f4f4;
}
.foods-wrapper {
  flex: 1 1 85px;
  /* background: #abc; */
}

/* menu-item */
.menu-wrapper .menu-item {
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}
.menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.menu-wrapper .menu-item .text .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}

/* 专场 */
.goods .foods-wrapper .container-list {
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #e4e4e4;
}

.goods .foods-wrapper .container-list img {
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}

/* 具体分类商品布局 */
.goods .foods-wrapper .food-list {
  padding: 11px;
}
.goods .foods-wrapper .food-list .title {
  height: 13px;
  font-size: 13px;
  background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
  background-size: 2px 10px;
  padding-left: 7px;
  margin-bottom: 12px;
}
.goods .foods-wrapper .food-list .food-item {
  display: flex;
  margin-bottom: 25px;
  position: relative;
}
.goods .foods-wrapper .food-list .food-item .icon {
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content {
  flex: 1;
}

/* 具体商品内容 */
.goods .foods-wrapper .food-list .food-item .content .name {
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}

.goods .foods-wrapper .food-list .food-item .content .desc {
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;
  /* 超出部分显示省略号*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra {
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled {
  margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product {
  height: 15px;
  margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price {
  font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text {
  font-size: 14px;
  color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit {
  font-size: 12px;
  color: #bfbfbf;
}

/* 分类列表当前选中 */
.goods .menu-wrapper .menu-item.current {
  background: white;
  font-weight: bold;
  margin-top: -1px;
}
.goods .menu-wrapper .menu-item:first-child.current {
  margin-top: 1px;
}
.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}
.goods .menu-wrapper .menu-item .num {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  color: white;
  background: red;
  text-align: center;
  font-size: 7px;
  line-height: 13px;
}
</style>
  