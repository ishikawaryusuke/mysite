import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueHtml2Canvas from 'vue-html2canvas';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueHtml2Canvas);
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
