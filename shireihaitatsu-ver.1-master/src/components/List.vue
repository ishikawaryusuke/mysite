<template>
  <div>
    <div>
      <v-card flat color="transparent">
        <v-card-actions>
          <v-spacer/>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-img
                class="elevation-0"
                :src="user.avatarUrl"
              ></v-img>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-spacer/>
        </v-card-actions>
      </v-card>
      <!-- <v-card flat color="transparent">
        <v-card-text>
          合計: {{ favorite }} いいね
        </v-card-text>
      </v-card> -->
    </div>
    <div v-show="!isPosts">
      <h1>あなたへの指令はありません</h1>
      <Twitter></Twitter>
    </div>
    <div v-show="isPosts">
      <v-layout>
        <v-flex xs12 sm4 offset-sm4>
          <v-card v-for="(item, index) in this.posts" class="ma-3" :key="index">
            <v-img :src="item.imgUrl"></v-img>
            <v-card-title class="text-xs-center">
              <v-spacer></v-spacer>
              {{ item.message }}
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="orange" @click="twitter(item.postId)">投稿</v-btn>
              <v-btn flat color="orange" @click="trash(item, index)">破棄</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <Twitter class="my-3"></Twitter>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import Twitter from '@/components/Twitter.vue'
  import { tweetPost } from '../assets/js/tweetPost.js'
  import { mapGetters } from 'vuex'
  // import twitter from '../twitter.js'

  export default {
    name: 'Mypage',
    data() {
      return {
        user: {
          name: '',
          avatarUrl: '',
        },
        posts: [],
        favorite: 0
      }
    },
    components: {
      Twitter
    },
    computed: {
      isPosts() {
        return Object.keys(this.posts).length !== 0
      }
    },
    methods: {
      async twitter(key) {
        const twUrl = await tweetPost(key)
        window.location.href = twUrl
      },
      async trash({postId, location}, index) {
        this.$store.dispatch('deletePost', { postId, location })
        this.$delete(this.posts, index)
      },
      async edit({postId}) {
        
      }
    },
    async created() {
      await this.$store.dispatch('setPosts', { uid: this.$store.getters.getUser.uid })
      this.user = this.$store.getters.getUser
      this.posts = this.$store.getters.getPosts
      // this.favorite = await twitter(this.user.accessToken, this.user.secret, this.user.twitterId)
    }
  }
</script>

<style>
/* Simple Reset */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* body */
body {
  background: #EEEEEE;
  color: #5e5e5e;
  font: 400 87.5%/1.5em 'Open Sans', sans-serif;
    width: 100%;
}

/* Form Layout */
.mypage {
  background: #fafafa;
  margin: 5em auto;
  padding-top:10px ;
  max-width: 500px;
}
h1 {
  text-align: center;
  padding: 1em 0;
  padding-top:10px;
    color:#666666;
}

form {
  padding: 0.5em;
}

.kaitou {
      display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 21px;
    width: 80px;
    border-radius: 10px;
    cursor: pointer;
    font-size: .9rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
    background: #7FFFD4;
    font-size: 0.75rem;
    padding-bottom: 1px;
    color: #fff;
    margin-block-start: 0.5em;
    margin-left: auto;
    margin-right:right;
}

button:hover {
    color:#dddddd;
  background-color:#66CDAA;
}

.haki {
      display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 21px;
    width: 80px;
    border-radius: 10px;
    cursor: pointer;
    font-size: .9rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.8);
    background:#7FFFD4 ;
    font-size: 0.75rem;
    padding-bottom: 1px;
    color: #fff;
    margin-block-start: 0.5em;
    margin-left: auto;
    margin-right:right;
}

.container {
  max-width: 1170px;
  padding: 0 15px;
  margin: 0 auto;
}

header {
  height: 65px;
  width: 100%;
  background-color: pink;
  position :fixed;
  top: 0;
  z-index: 10;
}

.header-left {
  float: left;
}

.header-right {
  float: right;
  margin-right: -25px;
}

.header-right a {
  line-height: 65px;
  padding: 0 25px;
  color: #666666;
  display: block;
  float: left;
  transition: all 0.5s;
}

.header-right a:hover {
  background-color: #FFABCE;
}
</style>
