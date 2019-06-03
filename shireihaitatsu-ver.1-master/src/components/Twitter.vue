<template>
  <div class="text-xs-center">
    <v-btn round color="#00acee" dark @click="tweet">ツイッターで指令を募集する</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Twitter',
  data() {
    return {
        twUrl : '',
    }
  },
  methods: {
    tweet() {
      window.location.href = this.twUrl
    }
  },
  mounted() {
    const userId = this.$store.getters.getUser.uid;
    var url = encodeURIComponent(`${location.protocol}//${location.host}/user/${userId}`);
    var txt = encodeURIComponent('指令してください' + ' ' + '#指令配達');
    this.twUrl = 'https://twitter.com/intent/tweet?text=' + txt + '&url=' + url;
  }
}
</script>