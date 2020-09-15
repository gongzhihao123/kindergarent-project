<template>
    <!-- <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item, index) in imgData" :key="index">
        <img :src= item.imgUrl alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="login-main">
    </div> -->
  <div class="login">
    <div class="login_content" v-if="isLogin">
      <div class="logo"></div>
      <div class="form-item">
          <input class="username" v-model="loginForm.account" type="text" @keyup.enter="submit" autocomplete="off" placeholder="账号">
          <p class="tip" v-if="userFlag">请输入正确的账号</p>
      </div>
      <div class="form-item">
          <input class="password" v-model="loginForm.password" @keyup.enter="submit" type="password" autocomplete="off" placeholder="登录密码">
          <p class="tip" v-if="passwordFlag">账号或密码不正确</p>
      </div>
      <div class="form-item">
        <input type="text">
        <img :src="validCodeImg" alt="">
        <button @click="getValidCode">验证码</button>
      </div>
      <div class="form-item"><el-button type="primary" @click="submit" :loading="loginDisabled">登 录</el-button></div>
      <div class="reg-bar">
          <span class="reg" @click="goNavRegister">立即注册</span>
          <span class="forget" @click="forgetPassword">忘记密码</span>
      </div>
    </div>
    <div class="register" v-else>
      <div class="logo"></div>
      <div class="form-item">
          <input class="username" v-model="registForm.account" type="text" @keyup.enter="submit" autocomplete="off" placeholder="账号">
          <p class="tip" v-if="userFlag">请输入正确的账号</p>
      </div>
      <div class="form-item">
          <input class="email" v-model="registForm.email" type="text" @keyup.enter="submit" autocomplete="off" placeholder="邮箱">
          <p class="tip" v-if="emailFlag">{{emailMessage}}</p>
      </div>
      <div class="form-item">
          <input class="password" v-model="registForm.password" @keyup.enter="submit" type="password" autocomplete="off" placeholder="密码">
          <p class="tip" v-if="passwordFlag">密码不能为空</p>
      </div>
      <div class="form-item"><button @click="registerConfirm"  >注 册</button></div>
      <p class="register-notice">已有账号，<span @click="goNavLogin">马上登录</span></p>
    </div>
  </div>
</template>
<script>
import { validEmail } from '@/utils/validate'
import { getCode } from '@/api/user'
export default {
  data () {
    return {
      isLogin: true,
      loginDisabled: false,
      registForm: {
        account: '',
        password: '',
        email: ''
      },
      loginForm: {
        account: '',
        password: ''
      },
      userFlag: false,
      passwordFlag: false,
      emailFlag: false,
      emailMessage: '',
      redirect: undefined,
      otherQuery: {},
      validCodeImg: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    checkBox () {
      if (!this.loginForm.account) {
        this.userFlag = true
        return false
      } else {
        this.userFlag = false
      }
      if (!this.loginForm.password) {
        this.passwordFlag = true
        return false
      } else {
        this.passwordFlag = false
      }
      return true
    },
    // 登录
    submit () {
      if (this.checkBox()) {
        this.loginDisabled = true
        this.$store.dispatch('user/login', this.loginForm)
          .then(async () => {
            await this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            this.loginDisabled = false
          })
          .catch(() => {
            this.loginDisabled = false
          })
      }
    },
    // 获取验证码getCode
    getValidCode () {
      getCode()
        .then(res => {
          console.log(res)
          this.validCodeImg = res.imgBase64
        })
        .catch(res => {
          console.log('res', res)
        })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 注册验证
    registCheckBox () {
      if (!this.registForm.account) {
        this.userFlag = true
        return false
      } else {
        this.userFlag = false
      }
      if (!this.registForm.email) {
        this.emailMessage = '邮箱不能为空'
        this.emailFlag = true
        return false
      } else if (!validEmail(this.registForm.email)) {
        this.emailMessage = '邮箱格式错误'
        this.emailFlag = true
        return false
      } else {
        this.emailFlag = false
      }
      if (!this.registForm.password) {
        this.passwordFlag = true
        return false
      } else {
        this.passwordFlag = false
      }
      return true
    },
    // 注册
    registerConfirm () {
      if (this.registCheckBox()) {
        this.isLogin = true
      }
    },
    goNavLogin () {
      this.loginForm = {}
      this.userFlag = false
      this.emailFlag = false
      this.passwordFlag = false
      this.isLogin = true
    },
    // 去注册
    goNavRegister () {
      this.registForm = {}
      this.userFlag = false
      this.emailFlag = false
      this.passwordFlag = false
      this.isLogin = false
    },
    // 忘记密码
    forgetPassword () {
      this.$message('密码默认123456，如已修改，请联系测试组织者进行密码重置')
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  .register {
    .logo {
      margin-bottom: 40px;
    }
    .form-item {
      .username {
        background: url(../../assets/images/userLogo.png) 20px center no-repeat;
      }
      .email {
        background: url(../../assets/images/emil.png) 20px 14px no-repeat;
      }
    }
    .register-notice {
      text-align: center;
      color: #fff;
      font-size: 14px;
      span:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
<style lang='css'>
html { height: 100%; width: 100%; }
body { height: 100%; background: #fff url(../../assets/images/backgroud.png) 50% 50% no-repeat; background-size: cover;}
.login { position: absolute; left: 50%; top: 50%; width: 430px; height: 550px; margin: -300px 0 0 -215px; border: 1px solid #fff; border-radius: 20px; overflow: hidden;}
.logo { width: 104px; height: 104px; margin: 50px auto 80px; background: url(../../assets/images/login.png) 0 0 no-repeat; }
.login .form-item { position: relative; width: 360px; margin: 0 auto; padding-bottom: 30px;}
.login .form-item input { width: 100%; height: 48px; padding-left: 70px; border: 1px solid #fff; border-radius: 25px; font-size: 18px; color: #fff; background-color: transparent; outline: none;}
.login .form-item button { width: 360px; height: 50px; border: 0; border-radius: 25px; font-size: 18px; color: #1f6f4a; outline: none; cursor: pointer; background-color: #fff; }
.login .username { background: url(../../assets/images/emil.png) 20px 14px no-repeat; }
.login .password { background: url(../../assets/images/password.png) 23px 11px no-repeat; }
.login .tip { position: absolute; left: 20px; top: 52px; font-size: 14px; color: #f50; }
.login .reg-bar { width: 360px; margin: 20px auto 0; font-size: 14px; overflow: hidden;}
.login .reg-bar span { color: #fff; text-decoration: none; }
.login .reg-bar span:hover { text-decoration: underline; cursor: pointer; }
.login .reg-bar .reg { float: left; }
.login .reg-bar .forget { float: right; }
.login ::-webkit-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
.login :-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
.login ::-moz-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}
.login :-ms-input-placeholder { font-size: 18px; line-height: 1.4; color: #fff;}

@media screen and (max-width: 500px) {
    * { box-sizing: border-box; }
    .login { position: static; width: auto; height: auto; margin: 0 30px; border: 0; border-radius: 0; }
    .logo { margin: 50px auto; }
    .login .form-item { width: auto; }
    .login .form-item input, .login .form-item button, .login .reg-bar { width: 100%; }
}
</style>
