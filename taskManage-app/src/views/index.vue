<template>
  <div class="index">
    <router-view></router-view>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import Footer from './../components/common/footer'
// import { apiList } from '@/services/api/index'

export default {
  name: 'index',
  // components: {
  //   Footer
  // },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.index {
  height: 100%;
}

</style>
