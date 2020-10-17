import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
import Carous from 'base/carous'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/carous',
    component: Carous
  }
]

const router = new VueRouter({
  routes
})

export default router
