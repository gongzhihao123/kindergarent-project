<template>
  <div class="Home">
    <Header></Header>
    <div>
      <Menu></Menu>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Menu from '@/components/adminManage/menu.vue'
import Header from '@/components/common/header.vue'
export default {
  data () {
    return {}
  },
  components: {
    Menu,
    Header
  }
}
</script>
<style lang="scss">
.Home {
  display: flex;
  flex-direction: column;
}
</style>
