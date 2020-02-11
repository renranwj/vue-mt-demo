<template>
  <div class="seller" ref="sellerView">
    <div class="seller-wrapper">
      <app-split></app-split>
      <div class="seller-view">
        <!-- 地址 -->
        <div class="address-wrapper">
          <div class="address-left">{{seller.address}}</div>
          <div class="adress-right">
            <div class="content"></div>
          </div>
        </div>
        <!-- 图片滚动 -->
        <div class="pics-wrapper" ref="picsView" v-if="seller.poi_env">
          <ul class="pics-list" ref="picsList">
            <li
              ref="picItem"
              class="pics-item"
              v-for="(item, index) in seller.poi_env.thumbnails_url_list"
              :key="index"
            >
              <img :src="item" />
            </li>
          </ul>
        </div>
        <div class="safety-wrapper">
          查看食品安全档案
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <app-split></app-split>

      <!-- 配送 -->
      <div class="tip-wrapper">
        <div class="delivery-wrapper">配送服务： {{seller.app_delivery_tip}}</div>
        <div class="shipping-wrapper">配送时间：{{seller.shipping_time}}</div>
      </div>
      <app-split></app-split>

      <!-- 其他服务 -->
      <div class="other-wrapper">
        <div class="server-wrapper">
          商家服务
          <div class="poi-server" v-for="(item, index) in seller.poi_service" :key="index">
            <img :src="item.icon" />
            {{item.content}}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div class="discounts-item" v-for="(item, index) in seller.discounts2" :key="index">
            <img :src="item.icon_url" class="img" />
            <div class="text">{{item.info}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import BScroll from "better-scroll";
import Split from "../../components/split/Split";
export default {
  data() {
    return {
      seller: {}
    };
  },
  components: {
    "app-split": Split
  },
  created() {
    this.$axios
      .get("/api/seller")
      .then(res => {
        // console.log(res)
        this.seller = res.data.data;
        // console.log(this.seller);
        // console.log(this.seller.poi_env.thumbnails_url_list)

        this.$nextTick(() => {
          if (this.seller.poi_env.thumbnails_url_list) {
            let imgW = this.$refs.picItem[0].clientWidth;
            let marginR = 11;
            // 整个图片横过来宽度
            let width =
              (imgW + marginR) * this.seller.poi_env.thumbnails_url_list.length;
            this.$refs.picsList.style.width = width + "px";
            // console.log(this.$refs.picsList.style.width)
            // console.log(width)
            // console.log(this.$refs.picsList.style.width)
            this.scroll = new BScroll(this.$refs.picsView, {
              scrollX: true, //横向滚动,
              click: true
            });
            // console.log(this.scroll)
          }
          this.sellerView = new BScroll(this.$refs.sellerView);
        });
      })
      .catch(rej => {
        console.log("请求seller错误");
      });
  }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.seller {
  position: absolute;
  left: 0;
  top: 191px;
  bottom: 0px;
  width: 100%;
  background: #f4f4f4;
  overflow: hidden;
}
.seller .seller-wrapper {
  background: white;
}
.seller .seller-wrapper .seller-view {
  padding-left: 15px;
}
.seller .seller-wrapper .seller-view .address-wrapper {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #f4f4f4;
}
.seller .seller-wrapper .seller-view .address-wrapper .address-left {
  flex: 1;
  background: url(./img/address.png) no-repeat left center;
  padding-left: 26px;
  padding-right: 31px;
  background-size: 14px 16px;
  font-size: 14px;
  line-height: 19px;
}
.seller .seller-wrapper .seller-view .address-wrapper .address-right {
  flex: 0 0 60px;
  background: url(./img/line.png) no-repeat left center;
  background-size: 1px 15px;
}
.seller .seller-wrapper .seller-view .address-wrapper .address-right .content {
  width: 100%;
  height: 100%;
  background: url(./img/phone.png) no-repeat center center;
  background-size: 18px 18px;
}
.seller .seller-wrapper .seller-view .pics-wrapper {
  padding: 10px 0;
  overflow: hidden;
  border-bottom: 1px solid #f4f4f4;
  white-space: nowrap;
}
.seller .seller-wrapper .seller-view .pics-wrapper .pics-list {
    /* display: inline-block; */
}
.seller .seller-wrapper .seller-view .pics-wrapper .pics-list .pics-item {
  display: inline-block;
  margin-right: 11px;
  width: 93px;
  height: 75px;
}
.seller .seller-wrapper .seller-view .pics-wrapper .pics-list .pics-item img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.seller .seller-wrapper .seller-view .safety-wrapper {
  padding: 15px 14px 15px 25px;
  background: url(./img/safety.png) no-repeat left center;
  background-size: 14px 16px;
  font-size: 14px;
}
.seller .seller-wrapper .seller-view .safety-wrapper span {
  float: right;
  font-size: 14px;
}
.seller .seller-wrapper .tip-wrapper {
  padding-left: 15px;
}
.seller .seller-wrapper .tip-wrapper .delivery-wrapper {
  background: url(./img/delivery.png) no-repeat left center;
  background-size: 14px 16px;
  padding: 15px 0 15px 25px;
  font-size: 14px;
  border-bottom: 1px solid #f4f4f4;
}
.seller .seller-wrapper .tip-wrapper .shipping-wrapper {
  background: url(./img/time.png) no-repeat left center;
  padding: 15px 17px 15px 25px;
  background-size: 15px 15px;
  font-size: 14px;
  line-height: 18px;
}
.seller .seller-wrapper .other-wrapper {
  padding-left: 15px;
}
.seller .seller-wrapper .other-wrapper .server-wrapper {
  background: url(./img/server.png) no-repeat left center;
  background-size: 15px 15px;
  padding: 15px 0 17px 25px;
  font-size: 14px;
  border-bottom: 1px solid #f4f4f4;
}
.seller .seller-wrapper .other-wrapper .server-wrapper .poi-server {
  display: inline-block;
  margin-left: 17px;
}
.seller .seller-wrapper .other-wrapper .server-wrapper .poi-server img {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  vertical-align: middle;
}
.seller .seller-wrapper .other-wrapper .discounts-wrapper {
  padding: 17px 24px 19px 0;
}
.seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item {
  display: flex;
}
.seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item .img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.seller
  .seller-wrapper
  .other-wrapper
  .discounts-wrapper
  .discounts-item
  .icon {
  flex: 0 0 25px;
}
.seller
  .seller-wrapper
  .other-wrapper
  .discounts-wrapper
  .discounts-item
  .icon
  img {
  width: 15px;
  height: 15px;
}
.seller
  .seller-wrapper
  .other-wrapper
  .discounts-wrapper
  .discounts-item
  .text {
  flex: 1;
  font-size: 14px;
  line-height: 18px;
}
</style>
  