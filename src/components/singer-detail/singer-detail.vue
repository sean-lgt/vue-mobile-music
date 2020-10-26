<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from "components/music-list/music-list";
export default {
  components:{
      MusicList
  },
  data() {
    return {
        singerID:'',
        songs:[],
        title:'',
        bgImage:'',
    }
  },
  created(){
      console.log("vuex跳转",this.getStateSinger)
      this.getSingerALLSong()
  },
  methods:{
      getSingerALLSong(){
          if(!this.getStateSinger.id){
              this.$router.push('singer')
              return
          }
          this.$http.get(this.$api.singerALLSong,{ params: {id:this.getStateSinger.id} }).then(res=>{
              console.log("歌手的单曲",res)
              this.songs=res.hotSongs
              this.title = res.artist.name
              this.bgImage = res.artist.picUrl
          })
      },
  },
  computed:{

      getStateSinger(){
          return this.$store.state.singer
      }   
  },
  
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

 .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
