<template>
  <div class="homePage">
    <Header></Header>
    <section>
      <doctorTop v-if="flag"></doctorTop>
      <div class="homePage-top">
        账号<el-input v-model="name" placeholder="请输入"></el-input>
      密码<el-input v-model="password" placeholder="请输入"></el-input>
      <el-button @click="login">登录</el-button>
      <el-button @click="llll">qweqw</el-button>
      <el-button @click="login">des</el-button>
      </div>
      <div class="homePage-foot">
        <div class="foot-left"><healthLeft></healthLeft></div>
        <div class="foot-right"><healthRight></healthRight></div>
      </div>
    </section>
  </div>
</template>
<script>
import Header from '@/components/common/header.vue'
import healthLeft from '@/components/homePage/health/health-left.vue'
import healthRight from '@/components/homePage/health/health-right.vue'
import doctorTop from '@/components/homePage/doctor/doctor-top.vue'
import { setCookie } from '@/utils/cookie.js'
export default {
  name: 'homePage',
  data () {
    return {
      name: '',
      password: '',
      flag: false
    }
  },
  components: {
    Header,
    healthLeft,
    healthRight,
    doctorTop
  },
  methods: {
    async login () {
      await this.$store.dispatch('login', {
        account: 'superadmin',
        password: '123456'
      })
        .then((res) => {
          setCookie('token', res.data)
          // this.$store.commit('setUser', res.data)
          // console.log(this.$store.state.user)
        })
    },
    async llll () {
      await this.$store.dispatch('ces')
    }
  }
}
</script>
<style lang="scss" scoped>
.homePage {
  display: flex;
  flex-direction: column;
  section {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .homePage-top {
      width: 1200px;
      height: 485px;
      // margin: 25px auto 58px;
      border: 1px solid #ccc;
    }
    .homePage-foot {
      display: flex;
      .foot-left {
        width: 590px;
        height: 502px;
        border: 1px solid #ccc;
      }
      .foot-right {
        width: 590px;
        height: 308px;
        margin-left: 20px;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>
