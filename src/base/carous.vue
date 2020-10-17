<template>
  <el-carousel
    trigger="click"
    height="250px"
    :interval="3000"
    arrow="always"
    style="width:100%"
  >
    <el-carousel-item v-for="item in banners" :key="item">
      <img
        :src="item"
        style="height:100%;width:100%;"
        alt="图片丢失了"
        :title="item"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import Vue from 'vue'
import { Carousel, CarouselItem } from 'element-ui'
Vue.use(Carousel)
Vue.use(CarouselItem)
export default {
  data() {
    return {
      banners: [],
      bannerss: [1, 2, 3, 4, 5]
    }
  },
  mounted() {
    // 获取轮播图
    this.getNewAlbumTopSwiper()
  },
  methods: {
    // 获取轮播图的url
    getNewAlbumTopSwiper() {
      this.$http
        .get(this.$api.newAlbumTop, { params: { offset: 0, limit: 8 } })
        .then(res => {
          if (res.code === 200) {
            var albumList = res.weekData.slice(0, 7)
            console.log(albumList)
            for (var i = 0; i < albumList.length; i++) {
              var pictureList = albumList[i].blurPicUrl
              console.log(pictureList)
              this.banners.push(pictureList)
            }
            console.log(this.banners)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.img-box {
  width: 100%;
  height: 200px;
}
.img-box img {
  width: 100%;
  height: 100%;
}
</style>
