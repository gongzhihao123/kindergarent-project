<template>
  <div class="common-header">
    <header>
      <el-row>
        <el-col :span="12">
          <img src="@/assets/img/small-logo.png">
          幼儿园管理后台
        </el-col>
        <el-col :span="12">
          <span v-if="onlineUser.nickName">{{ onlineUser.nickName }}</span>
          <el-dropdown @command="handleDrop">
            <span class="el-dropdown-link">
              <!-- <img :src="userPath" v-if="userPath" alt=""> -->
              <img src="@/assets/img/default-avatar.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:0px;" >
              <!-- <el-dropdown-item command='1'>个人信息</el-dropdown-item>
              <el-dropdown-item command='2'>修改密码</el-dropdown-item> -->
              <el-dropdown-item command='3'>退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </header>
  </div>
</template>
<script>
export default {
  data () {
    return {
      editPasswordFlag: false,
      onlineUser: {}
    }
  },
  methods: {
    handleDrop (e) {
      if (e * 1 === 3) {
        window.localStorage.removeItem('token')
        this.$router.replace('/login')
      }
    }
  },
  mounted () {
    this.onlineUser = JSON.parse(window.localStorage.getItem('onlineUser'))
  }
}
</script>
<style lang="scss" scoped>
.common-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  -webkit-z-index: 222;
  -moz-z-index: 222;
  -ms-z-index: 222;
  -o-z-index: 222;
  z-index: 222;
  background: linear-gradient(135deg,rgba(76,124,251,1) 0%,rgba(82,125,255,0.82) 50%,rgba(65,114,255,1) 100%);
  &>header {
    height: 70px;
    line-height: 70px;
    color: #fff;
    background: linear-gradient(135deg,rgba(76,124,251,1) 0%,rgba(82,125,255,0.82) 50%,rgba(65,114,255,1) 100%);

    &>.el-row {
      width: 96%;
      margin: 0 auto;
      .el-col:nth-child(1) {
        font-size: 24px;
        img {
          vertical-align: middle;
          width: 50px;
          margin-right: 10px;
        }
      }

      .el-col:nth-child(2) {
        padding-right: 20px;
        font-size: 16px;
        text-align: right;
        &>span {
          font-size: 16px;
          margin-right: 10px;
        }
        .el-dropdown-link{
          cursor: pointer;
          display: inline-block;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #96BBF8;
          color: #fff;
          text-align: center;
          line-height: 36px;
          vertical-align: middle;
          img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
