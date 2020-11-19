<template>
  <div class="login1">
      <div class="login1Box">
        <div class="form-item">
          <div class="inputDiv">
            <img round :src="require('./../assets/img/login1_mobile_user.png')" />
            <input class="username" v-model="user.name" type="text" @keyup.enter="submit" autocomplete="off" placeholder="手机号码">
            <p class="tip" v-if="userFlag">请输入正确的手机号码</p>
          </div>
        </div>
        <div class="form-item">
          <div class="inputDiv">
            <img :src="require('./../assets/img/login1_mobile_password.png')" />
            <input class="password" v-model="user.password" @keyup.enter="submit" type="password" autocomplete="off" placeholder="密码">
            <p class="tip" v-if="passwordFlag">手机号码或密码不正确</p>
          </div>
        </div>
        <div class="form-item">
          <div class="inputDiv">
            <img :src="require('./../assets/img/login1_mobile_password.png')" />
            <input class="password" v-model="user.password" @keyup.enter="submit" type="password" autocomplete="off" placeholder="密码">
            <p class="tip" v-if="passwordFlag">手机号码或密码不正确</p>
          </div>
        </div>
        <div class="form-item"><button @click="submit">登 录</button></div>
        <!-- <div class="form-item" v-if="isReg"><button @click="regConfirm">注 册</button></div> -->
        <div class="reg-bar">
            <div class="reg">
              <span @click="reg">立即注册</span>
              <img round :src="require('./../assets/img/login1_mobile_user.png')" />
              </div>
            <div class="forget" v-on:click="showForgetPopup">
              <span>忘记密码</span>
              <img round :src="require('./../assets/img/login1_mobile_fotget.png')" />
            </div>
        </div>
      </div>
      <van-popup v-model="showForget" round position="bottom" :style="{ height: '16%' }" >
        <div class="fotgetPopup">
          <van-image :src="require('./../assets/img/forget_phone.jpg')" height="70" width="70"/>
          <div class="popContent">
            <p>请联系技术支持</p>
            <!-- <p>曹老师 <a href="tel:15611131830">15611131830</a></p> -->
            <p>曹老师 <a href="tel:13146032798">13146032798</a></p>
          </div>
        </div>
      </van-popup>
  </div>
</template>
<script>
import { encrypt } from '@/lib/rsaEncrypt'
import { apilogin1, apiReg } from '@/services/api/index'
export default {
  data () {
    return {
      userName: '',
      user: {
        name: '',
        password: ''
      },
      userFlag: false,
      password: '',
      passwordFlag: false,
      isReg: false,
      showForget: false
    }
  },
  methods: {
    reg () {
      this.$router.push('/register')
    },
    regConfirm () {
      if (!this.user.name) {
        this.userFlag = true
      } else {
        apiReg({ account: this.user.name })
          .then(res => {
            if (res.code === 1) {
              this.$toast.success(res.message)
              this.isReg = false
            } else {
              this.$toast.fail(res.message)
            }
          })
      }
    },
    // 验证
    checkBox () {
      if (!this.user.name) {
        this.userFlag = true
        return false
      } else {
        this.userFlag = false
      }
      if (!this.user.password) {
        this.passwordFlag = true
        return false
      } else {
        this.passwordFlag = false
      }
      return true
    },
    submit () {
      if (this.checkBox()) {
        let encrPassword = encrypt(this.user.password)
        apilogin1({
          account: this.user.name,
          password: encrPassword
        })
          .then((res) => {
            if (res.code === 1) {
              window.localStorage.setItem('userName', this.user.name)
              window.localStorage.setItem('token', res.data)
              this.$router.push('/home')
            }
            this.$toast(res.message)
          })
      }
    },
    showForgetPopup () {
      this.showForget = true
    }
  },
  mounted () {
    // const token = window.localStorage.getItem('token')
    // if (token !== null) {
    //   console.log(token !== null)
    //   this.$router.push('/home')
    // }
  }
}
</script>
<style>
  * { margin: 0; padding: 0; }
  html { height: 100%; }
  body { height: 100%; }
  .login1 { height: 100%; width: 100%;   }
  .login1Box { position: absolute; display:flex; flex-direction: column; justify-content: center; left: 50%; top: 50%; width: 100%; height: 100%; border-radius: 20px; overflow: hidden;
  /* background: #fff url(./../assets/img/login1_mobile.png) 50% 50% no-repeat; background-size: cover;  */
  border: 1px solid #fff;}
  .login1Box > .form-item:first-child { margin-top: 70%; }
  .login1 .form-item { display: inline-flex;  width: 360px; margin: 0 auto; margin-bottom: 30px;}
  .login1 .form-item input { width: 248px; height: 48px; padding-left: 20px; border-radius: 25px; font-size: 18px; color: #08AE8E; background-color: transparent; outline: none;}
  .login1 .form-item button { height: 50px; border: 0; border-radius: 25px; font-size: 18px; color: #fff; outline: none; cursor: pointer; background: linear-gradient(45deg, #07e6da, #08AE8E); }
  .login1 .form-item .inputDiv { display: inline-flex; align-items: center; height: 48px; border: 1PX solid #08AE8E; border-radius: 25px;}
  .login1 .form-item .inputDiv img {  height: 28px; margin-left: 14px; vertical-align: middle;}
  .login1 .form-item .inputDiv:last-child { width: 100%; }
  .login1 .tip { position: absolute; left: 20px; top: 52px; font-size: 14px; color: #f50; }
  .login1 .reg-bar { margin: 20px auto 0; font-size: 14px; overflow: hidden;}
  .login1 .reg-bar span { color: #08AE8E; text-decoration: none; font-size: 16px;}
  .login1 .reg-bar span:hover { text-decoration: underline; }
  .login1 .reg-bar .reg { float: left; padding-left: 10px;}
  .login1 .reg-bar .reg span { vertical-align: middle; }
  .login1 .reg-bar .reg img { vertical-align: middle; margin-left:3px; width: 16px; }

  .login1 .reg-bar .forget { float: right; padding-right: 10px; }
  .login1 .reg-bar .forget span { vertical-align: middle; }
  .login1 .reg-bar .forget img { vertical-align: middle; margin-left:3px; width: 16px; }
  .login1 ::-webkit-input-placeholder { font-size: 18px; line-height: 1.4; color: #08AE8E;}
  .login1 :-moz-placeholder { font-size: 18px; line-height: 1.4; color: #08AE8E;}
  .login1 ::-moz-placeholder { font-size: 18px; line-height: 1.4; color: #08AE8E;}
  .login1 :-ms-input-placeholder { font-size: 18px; line-height: 1.4; color: #08AE8E;}

  @media screen and (max-width: 500px) {
      * { box-sizing: border-box; }
      .login1 {  width: auto; height: 100%; min-height: 568px; }
      .login1Box {
        padding: 0 30px;
        position: static;
        border: 0; border-radius: 0;
      }
      .logo { margin: 50px auto; }
      .login1 .form-item { width: 100%; }
      .login1 .form-item input, .form-item button, .reg-bar { width: 100%; font-size: 24px; }
  }
  .fotgetPopup { display: inline-flex; padding-left: 50px; }
  .fotgetPopup .popContent { margin-left: 6px;font-size: 16px; padding-top: 15px; line-height: 20px;}
</style>
