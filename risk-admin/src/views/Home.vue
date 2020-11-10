<template>
  <div class="Home">
    <Menu></Menu>
    <div class="home-container">
      <div class="homeHeader">
        <el-dropdown @command="out" trigger="hover">
          <div class="homeOut">
            <img src="./../assets/images/login.png" alt="">
            <p v-if="userName">{{ userName }}</p>
          </div>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item >退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Menu from '@/components/adminManage/menu.vue'
export default {
  data () {
    return {
      userName: ''
    }
  },
  components: {
    Menu
  },
  methods: {
    out (e) {
      window.localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.userName = sessionStorage.getItem('userName')
  }
}
</script>
<style lang="scss" scoped>
.Home {
  padding-left: 230px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .home-container {
    background: #F2F2F2;
    height: -webkit-fill-available;
    .homeHeader {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      box-shadow: darkgrey 0 0 10px 5px ;//边框阴影
      .el-dropdown {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .homeOut {
          display: flex;
          align-items: center;
          > img {
            width: 30px;
            border-radius: 50%;
            background: #ccc;
          }
          > p {
            margin: 0 50px 0 5px;
          }
        }
      }
    }
  }
}
</style>
