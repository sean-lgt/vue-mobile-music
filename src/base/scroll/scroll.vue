<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
// 引进betterScorll
import BScroll from 'better-scroll'
export default {
  props: {
    // 类型
    probeType: {
      type: Number,
      default: 1
    },
    // 点击
    click: {
      type: Boolean,
      default: false
    },
    // 监听滚动
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 数据
    data: {
      type: Array,
      default: null
    },
    // 拉起
    pullup: {
      type: Boolean,
      default: false
    },
    // 滚动之前
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 延迟刷新秒数
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    // 初始化滚动
    initScroll() {
      // 如果没有这个DOM元素
      if (!this.$refs.wrapper) {
        return
      }
      // 初始化betterScroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      // 如果有监听滚动
      if (this.listenScroll) {
        const that = this
        this.scroll.on('scroll', pos => {
          that.$emit('scroll', pos)
        })
      }
      // 如果有下拉刷新
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }
      // 如果有滚动之前
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    // 禁用
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
