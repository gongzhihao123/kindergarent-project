<template>
  <div class="homePage">
    <h1>欢迎使用幼儿园移动办公平台</h1>
    <section>
      <ul>
        <li @click="goHome(1)">
          <img src="./../../assets/img/risk.png" alt="">
          <p>安全隐患报修</p>
        </li>
        <li @click="goHome(2)">
          <img src="./../../assets/img/task.png" alt="">
          <p>工作任务管理</p>
        </li>
      </ul>
      <div class="homeBack" @click="backShow = true">
        <img src="./../../assets/img/homeBack.png" alt="">
      </div>
      <van-overlay class="homePageOverlay" :show="backShow">
        <div class="backOverlay">
          <h1>退出平台</h1>
          <p>确定要退出平台吗？</p>
          <div>
            <van-button size="small" type="info" @click="backShow = false">取消</van-button>
            <van-button size="small" type="info" @click="goBack">确定</van-button>
          </div>
        </div>
      </van-overlay>
    </section>
  </div>
</template>
<script>
import { apiUserInfo, apiBack } from '@/services/api/index'
export default {
  data () {
    return {
      backShow: false
    }
  },
  methods: {
    getUserInfo () {
      apiUserInfo().then(res => {
        if (res.code === 200) {
          window.localStorage.setItem('userInfo', JSON.stringify(res.data))
        } else {
          this.$router.push('/login')
        }
      })
    },
    goHome (val) {
      if (val * 1 === 1) {
        // risk
        this.$router.push('/home')
      } else if (val * 1 === 2) {
        // taskManage
        this.$router.push('/taskManage')
      }
    },
    goBack () {
      apiBack().then(res => {
        if (res.code === 200) {
          this.$toast(res.msg)
          this.$router.push('/login')
        }
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style scoped>
.homePage {
  width: 100%;
  /* height: 100vh; */
}
.homePage > h1 {
  padding: 30px 0 70px;
  text-align: center;
  font-size: 18px;
  color: #000;
}
.homePage > section > ul {
  width: 100%;
  height: 100%;
  /* padding: 0 30px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.homePage ul > li {
  width: 110px;
  height: 110px;
  /* margin: 10px 0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}

.homePage ul > li  img {
  width: 60px;
  height: 60px;
  margin: 0 0 10px;
}

.homePage ul > li  p {
  font-size: 14px;
  color: #000;
}
.homeBack {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
.homePageOverlay {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.backOverlay {
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
}

.backOverlay > p {
  margin: 12px 0;
  font-size: 14px;
  color: rgb(197, 197, 186);
}

.backOverlay > div {
  width: 100%;
  margin: 12px 0;
  display: flex;
  justify-content: space-around;
}

.backOverlay > div .van-button {
  width: 100px;
  font-size: 14px;
  border-radius: 16px;
}

.backOverlay > div .van-button:first-child {
  background: coral;
  border: 1px solid coral;
}

</style>