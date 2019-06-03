<template>
  <v-app id="app">
    <Header></Header>
    <div v-show="waiting">
      <v-spacer/>
      <v-progress-circular
        :size="70"
        :width="7"
        color="pink"
        indeterminate
        class="my-5"
      ></v-progress-circular>
      <v-spacer/>
    </div>
    <router-view v-show="!waiting" id="content"/>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import firebase from 'firebase'

export default {
  components: {
    Header,
  },
  computed: {
    waiting: function() {
      return this.$store.getters.getWaiting
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
