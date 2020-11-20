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
        <div>
          <li @click="goBack">
            <img src="./../../assets/img/logout.png" alt="">
            <p>退出系统</p>
          </li>
        </div>
        
      </ul>
    </section>
  </div>
</template>
<script>
import { apiUserInfo, apiBack } from '@/services/api/index'
export default {
  data () {
    return {}
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

.homePage ul > div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.homePage ul > div > li {
  width: 110px;
  height: 110px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}

.homePage ul > div > li  img {
  width: 60px;
  height: 60px;
  margin: 0 0 10px;
}

.homePage ul > div > li  p {
  font-size: 14px;
  color: #000;
}

</style>