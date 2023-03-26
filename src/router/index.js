import Vue from 'vue'
import VueRouter from 'vue-router'
// import videoList from '../views/list.vue'
import videoPlay from '../views/videoPlay.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: videoList
  // },
  {
    path: '/videoPlay/cv1',
    name: 'videoPlay',
    component: videoPlay
    // component: () => import(/* webpackChunkName: "about" */ '../views/videoPlay.vue')
  },
  {
    path: '/videoPlay/:id',
    name: 'videoPlay',
    component: videoPlay
    // component: () => import(/* webpackChunkName: "about" */ '../views/videoPlay.vue')
  },
  {
    path: '/',
    redirect: 'videoPlay/cv1'
  },
  {
    path: '*',
    redirect: 'videoPlay/cv1'
  }
]

const router = new VueRouter({
  routes,
})

export default router
