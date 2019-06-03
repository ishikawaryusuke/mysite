<template>
  <div class="post">
    <div v-show="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="pink"
        indeterminate
        class="my-5"
      ></v-progress-circular>
    </div>
    <div v-show="!loading">
      <div v-if="!isUser" class="py-5">
        <h3>ユーザーが存在しません。</h3>
      </div>
      <div v-if="isUser">
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
        </div>

        <p class="mt-3">{{ user.name }}さんに指令しよう</p>

        <div v-show="creating">
          <v-progress-circular
            :size="70"
            :width="7"
            color="pink"
            indeterminate
            class="my-5"
          ></v-progress-circular>
        </div>

        <v-layout row v-show="!creating">
          <v-flex xs8 offset-xs2>
            <v-textarea
              v-model="req"
              outline
              name="input-7-4"
              label="ここに条件を入力してください"
              value=""
            ></v-textarea>
          </v-flex>
        </v-layout>

        <v-layout row v-show="!creating">
          <v-flex xs8 offset-xs2>
            <v-textarea
              v-model="message"
              outline
              name="input-7-4"
              label="ここに指令を入力してください"
              value=""
            ></v-textarea>
          </v-flex>
        </v-layout>

        <div v-show="!creating">
          <v-btn round color="pink" dark @click="post">指令！</v-btn>
        </div>
      </div>
      <div v-show="!creating">
        <v-btn round color="pink" dark @click="transTop">トップへ戻る</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import uuidGenerator from '../assets/js/uuid.js';
  import * as request from '../request.js';

  export default {
    name: 'Post',
    data () {
      return {
        req: '',
        message: '',
        output: null,
        creating: false,
        user: {
          name: '',
          avatarUrl: ''
        },
        loading: false,
        isUser: false
      }
    },
    async created() {
      this.loading = true
      await this.$store.dispatch('setOpenUser', { uid: this.$route.params.id })
      this.user = this.$store.getters.getOpenUser(this.$route.params.id)
      if(this.user !== undefined) { this.isUser = true }
      this.loading = false
    },
    methods: {
      transTop() {
        this.$router.push('/')
      },
      post() {
        this.creating = true
        // html2canvasの所は消しておく
        const data = {
          createdAt: Date(),
          updatedAt: Date(),
          postId: '',
          requirement: this.req,
          message: this.message,
          uid: this.$route.params.id,
          imgUrl: '',
          location: ''
        }
        const result = request.addPost(data);
        this.message = '';
        this.req = '';
        alert('投稿しました');
        this.creating = false;
      }
    }
  }
</script>

<style>
.box {
   margin: 2em 0;
   width: 1200px;
   height:630px;
   border: 5px solid black;
}
.box .box-title {
   font-size: 30px;
   padding: 4px;
   text-align: left;
   font-weight: bold;
   letter-spacing: 0.05em;
   border: 1px solid black;
   color:red;
   text-decoration-color: black;

}
.box p {
   margin: 0;
   font-size: 30px;
   color:red;
   text-decoration-color: black;

}
</style>