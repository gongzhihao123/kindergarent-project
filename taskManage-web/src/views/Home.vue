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
export default {
  data () {
    return {}
  },
  components: {
    Menu: () => import('../components/adminManage/menu.vue'),
    Header: () => import('../components/common/header.vue')
  }
}
</script>
<style lang="scss">
.Home {
  display: flex;
  flex-direction: column;
}
</style>
