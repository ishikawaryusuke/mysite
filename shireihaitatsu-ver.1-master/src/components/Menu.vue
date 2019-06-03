<template>
  <div>
    <v-layout>
    <v-btn
      @click="dialog=true"
      v-show="true"
      color="pink"
      fab
      dark
      fixed
      bottom
      right
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog
      color="white"
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-actions>
          <v-spacer>
          <v-btn round color="pink" dark @click="transMypage">マイページ</v-btn>
          </v-spacer>
        </v-card-actions>
        <v-card-actions>
          <v-spacer>
          <v-btn round color="pink" dark @click="signout">ログアウト</v-btn>
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    signout() {
      firebase.auth().signOut()
      .then(() => {
        this.$store.commit('changeUser', null)
        this.$router.push('/')
      })
      .catch(() => {
        alert('ログアウトに失敗しました。もう一度ログアウトを押してください。')
      })
      this.dialog = false
    },
    transMypage() {
      this.$router.push(`${this.$store.getters.getUser.uid}`)
      this.dialog = false
    }
  }
}
</script>
