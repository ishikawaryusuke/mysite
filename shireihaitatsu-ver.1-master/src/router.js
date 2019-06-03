import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Main from '@/views/Main'
import store from './store'
import { onAuth, onRedirect } from './various'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/:id',
      name: 'Main',
      component: Main,
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  store.commit('changeWaiting', true)
  await onRedirect(); // 新規登録処理
  await onAuth();     // ログイン処理
  switch (to.name) {
    case 'Home':
      if (store.getters.getIsUser) {
        next(`/${store.getters.getUser.uid}`)
      } else {
        next()
      }
      break
    case 'Main':
      next()
      break
  }
  store.commit('changeWaiting', false)
})

export default router
