<template>
  <div class="login">
    <div class="loginMain">
      <img src="./../assets/img/loginBg.png" alt="">
      <h1>你好，<br>欢迎使用幼儿园移动办公平台</h1>
      <ul>
        <li>
          <van-field class="userNameField" v-model="username" label="" placeholder="请输入账号" />
        </li>
        <li>
          <van-field class="passwordField" v-model="password" type="password" label="" placeholder="请输入密码" />
        </li>
        <li class="verificationImg">
          <van-field
            v-model="code"
            center
            clearable
            label=""
            placeholder="请输入验证码"
          >
          </van-field>
          <van-image width="140" @click="getCodeImgUrl" height="" :src="codeUrl" />
        </li>
        <li class="loginButton">
          <van-button type="" @click="confirmLogin">登 录</van-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { apiCodeImgUrl, apiLogin } from '@/services/api/index'
import { encrypt } from '@/lib/rsaEncrypt'
export default {
  data () {
    return {
      codeUrl: '',
      captchaKey: '',
      code: '',
      username: '',
      password: ''
    }
  },
  methods: {
    // 获取验证码
    getCodeImgUrl () {
      apiCodeImgUrl().then(res => {
        this.codeUrl = res.data.imgBase64
        this.captchaKey = res.data.captchaKey
      })
    },
    // 验证
    checkBox () {
      let titleTest = /^[\s\S]{4,12}$/
      if (!this.username) {
        this.$toast('请输入账号')
        return false
      } else if (!titleTest.test(this.username)) {
        this.$toast('账号长度为4-16位')
        return false
      }
      if (!this.password) {
        this.$toast('请输入密码')
        return false
      }
      if (!this.code) {
        this.$toast('请输入验证码')
        return false
      }
      return true
    },
    confirmLogin () {
      if (this.checkBox()) {
        // let temPassword = encrypt(this.password)
        apiLogin({
          captchaKey: this.captchaKey,
          captchaValue: this.code,
          password: this.password,
          account: this.username,
          rememberMe: false
        })
          .then(res => {
            if (res.code === 200) {
              this.$router.replace('/homePage')
            } else {
              this.$toast(res.msg)
              setTimeout(() => {
                this.getCodeImgUrl()
              }, 500)
            }
          })
      }
    }
  },
  mounted () {
    this.getCodeImgUrl()
  }
}
</script>
<style lang="scss">
.login {
  height: 100vh;
  .loginMain {
    height: 100%;
    > img {
      width: 100%;
    }
    > h1 {
      margin: 20px 50px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, sans-serif;
    }
    ul {
      padding: 30px 50px 0;
      li {
        margin: 8px 0;
        border-bottom: 1PX solid #e5e5e5;
        ::-webkit-input-placeholder{
          font-size: 16px;
          color: #666;
        }
        .userNameField {
          padding-left: 34px;
          background: #fff url(./../assets/img/login_userName.png) left no-repeat; background-size: 24px 24px;
        }
        .passwordField {
          padding-left: 34px;
          background: #fff url(./../assets/img/login_password.png) left no-repeat; background-size: 24px 24px;
        }
      }
      .verificationImg {
        display: flex;
        .van-field {
          padding-left: 34px;
          background: #fff url(./../assets/img/login_yzm.png) left no-repeat; background-size: 24px 24px;
        }
        .van-image {
          height: auto;
        }
      }
      .loginButton {
        margin-top: 60px;
        border: none;
        .van-button {
          width: 100%;
          font-size: 16px;
          border-radius: 20px;
          color: #fff;
          background: #4b8fed;
        }
      }
    }
  }
}
</style>
