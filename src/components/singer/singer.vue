<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import ListView from 'base/listview/listview'
import pinyin from '../../../node_modules/js-pinyin/index'
export default {
  components: {
    ListView
  },
  data() {
    return {
      singers: [],
      popular: {
        firstLetter: '热门',
        arrData: []
      }
    }
  },
  mounted() {
    this.getSingerALList()
    var arr = ['中国', '陈三', '张三', '林三', '阿三']
    console.log(pinyin.getCamelChars('hahah'))
  },
  methods: {
    getSingerALList() {
      const singerGroupList = localStorage.getItem('singerGroupList')
      // console.log('有没有缓存', singerGroupList)
      if (singerGroupList != null) {
        this.singers = JSON.parse(singerGroupList)
        return
      }
      const singerList = []
      const datajson = {
        type: 1,
        limit: 100,
        offset: 0,
        // initial: -1,
        timestamp: new Date().getTime()
      }
      // 遍历拿到500
      for (let page = 1; page <= 1; page++) {
        datajson.offset += 1
        this.$http.get(this.$api.artistList, { params: datajson }).then(res => {
          console.log('热门歌手数据>>', res)
          res.artists.forEach((item, index) => {
            singerList.push(item)
          })
          console.log('所有歌手数据>>>>>', singerList)
          this.handleSingerGroup(singerList)
        })
      }
      // 获取热门歌手
    },
    handleSingerGroup(singerList) {
      // 首先需要对数组进行遍历然后给其添加一个首字母firstLetter
      const singerGroupList = []
      singerList.forEach((item, index) => {
        const name = pinyin.getCamelChars(item.name.toString())
        const firstLetter = name.slice(0, 1)
        item.firstLetter = firstLetter.toUpperCase()
      })

      singerList.forEach((singerItem, singerIndex) => {
        const isHasFirstLetter = singerGroupList.findIndex(
          value => value.firstLetter === singerItem.firstLetter
        )
        if (isHasFirstLetter === -1) {
          const json = {
            firstLetter: singerItem.firstLetter,
            arrData: [singerItem]
          }
          singerGroupList.push(json)
        } else {
          singerGroupList[isHasFirstLetter].arrData.push(singerItem)
        }
      })
      // 需要重新排序
      singerGroupList.sort(function(a, b) {
        return (a.firstLetter + '').localeCompare(b.firstLetter + '')
      })
      const datajson = {
        type: 1,
        limit: 30,
        offset: 0,
        initial: -1,
        timestamp: new Date().getTime()
      }
      // 获取热门歌手数据
      this.$http.get(this.$api.artistList, { params: datajson }).then(res => {
        this.popular.arrData = res.artists
        singerGroupList.unshift(this.popular)
        this.singers = singerGroupList
        localStorage.setItem('singerGroupList', JSON.stringify(singerGroupList))
        console.log('分组后的内容', singerGroupList)
      })
    },
    selectSinger() {}
  }
}
</script>

<style lang="stylus" scoped>
.singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
