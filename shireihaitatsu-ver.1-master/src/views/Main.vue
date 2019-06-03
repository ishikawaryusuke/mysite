<template>
  <div>
    <Post v-if="!isMypage" />
    <List v-if="isMypage" />
    <Menu v-show="isUser"/>
  </div>
</template>


<script>
  import Post from '@/components/Post.vue'
  import List from '@/components/List.vue'
  import Menu from '@/components/Menu.vue'

  export default {
    name: 'Mypage',
    components: {
      Menu,
      Post,
      List
    },
    computed: {
      isUser() {
        return this.$store.getters.getIsUser
      },
      isMypage() {
        if (this.isUser) {
          if (this.$store.getters.getUser.uid === this.$route.params.id) {
            return true
          }
        }
        return false 
      },
    }
  }
</script>
