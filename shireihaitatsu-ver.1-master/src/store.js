import Vue from 'vue'
import Vuex from 'vuex'
import * as request from './request'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    user: null,
    isUser: false,
    posts: [],
    isPost: false,
    openUsers: [],
    waiting: false,
    isMypage: false,
  },
  mutations: {
    changeUser(state, user) {
      state.user = user
      state.isUser = !!user
    },
    changeWaiting(state, flag) {
      state.waiting = flag
    },
    changePosts(state, data) {
      state.posts = data
    },
    addOpenUsers(state, user) {
      state.openUsers.push(user)
    },
    changeIsMypage(state, flag) {
      state.isMypage = flag
    },
  },
  actions: {
    deletePost({ commit }, {postId, location}) {
      request.deletePost(postId);
    },
    async setUser({ commit }, payload) {
      if(this.getters.getIsUser) { return }
      const uid = payload.uid;
      const user = await request.getUser(uid);
      commit('changeUser', user);
      return
    },
    async setPosts({ commit }, payload) {
      const posts = await request.getPosts(payload.uid);
      commit('changePosts', posts);
      return 
    },
    async setOpenUser({ commit }, payload) {
      const user = await request.getOpenuser(payload.uid);
      commit('addOpenUsers', user);
      return
    }
  },
  getters: {
    getIsUser: state => state.isUser,
    getUser: state => state.user,
    getWaiting: state => state.waiting,
    getPosts: state => state.posts,
    getOpenUser: state => uid => {
      return state.openUsers.find(item => {
        if(!item) { return false }
        return item.uid === uid
      })
    },
    getOpenUsers: state => state.openUsers,
    getIsMypage: state => state.isMypage,
  }
})

export default store
