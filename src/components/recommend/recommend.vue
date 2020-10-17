<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <slider></slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item" v-for="item in topPlayList" :key="item.id">
            <div class="icon">
              <img width="60" height="60" :src="item.coverImgUrl" />
            </div>
            <div class="text">
              <h2 class="name">{{ item.name }}</h2>
              <p class="desc">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
export default {
  components: {
    Slider
  },
  data() {
    return {
      // 轮播图数组
      albumListPicture: [],
      topPlayList: []
    }
  },
  mounted() {
    this.getTopPlayList()
    this.$http
      .get(this.$api.login, { params: { type: 16 } })
      .then(res => {
        console.log('res', res.data[0].album.blurPicUrl)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    // 获取热门歌单列表-网友精选碟
    getTopPlayList() {
      var paramsJson = {
        limit: 20
      }
      this.$http
        .get(this.$api.topPlayList, { params: paramsJson })
        .then(res => {
          if (res.code === 200) {
            console.log('>>>热门歌单', res)
            this.topPlayList = res.playlists
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.recommend-list
  .list-title
    height : 65px
    line-height : 65px
    text-align : center
    font-size : $font-size-medium
    color : $color-theme
  .item
    display : flex
    box-sizing : border-box
    align-items : center
    padding : 0 20px 20px 20px
    .icon
      flex : 0 0 60px
      width 60px
      padding-right 20px
    .text
      display : flex
      flex-direction :column
      justify-content : center
      flex : 1
      line-height : 20px
      overflow hidden
      font-size : $font-size-medium
      .name
        margin-bottom : 10px
        color : $color-text
      .desc
        color : $color-text-d
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
</style>
