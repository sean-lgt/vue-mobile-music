// url地址
function baseUrl(path) {
  const baseUrl = 'http://192.168.31.175:3000'
  return baseUrl + path
}

const api = {
  newAlbumTop: baseUrl('/top/album'), // 获取新碟上架-首页推荐轮播图
  topPlayList: baseUrl('/top/playlist/highquality'), // 获取热门歌单-网友精选碟
  login: baseUrl('/personalized/newsong'),
  artistList: baseUrl('/artist/list') ,// 获取歌手列表
  singerALLSong:baseUrl('/artists'),//获取歌手所有单曲,传id
}

export default api
