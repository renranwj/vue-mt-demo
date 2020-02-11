<template>
  <div class="star">
    <span
      class="star-item"
      :class="itemClass"
      v-for="(itemClass, index) in itemClasses"
      :key="index"
    ></span>
  </div>
</template>
  
  <script>
//   星星长度
const length = 5;

// 星星状态
const star_on = "on";
const star_half = "half";
const star_off = "off";

export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses() {
      let result = [];

      //   计算是否有半星
      let score = Math.floor(this.score * 2) / 2;

      //  是否拥有半星(等于0,是全星)
      let hasHalfStar = score % 1 !== 0;

      //全星（的数量）
      let allStar = Math.floor(this.score);

      //  遍历星星
      for (let i = 0; i < allStar; i++) {
        result.push(star_on);
      }

      //处理半星
      if (hasHalfStar) {
        result.push(star_half);
      }

      //   补齐
      while (result.length < length) {
        result.push(star_off);
      }

      return result;
    }
  }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.star {
  font-size: 0;
}
.star .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}
.star .star-item:last-child {
  margin-right: 0;
}
/* 星星图片 */
.star .on {
  background-image: url(img/star24_on@2x.png);
}
.star .half {
  background-image: url(img/star24_half@2x.png);
}
.star .off {
  background-image: url(img/star24_off@2x.png);
}
</style>
  