<template>
  <div class="common-header">
    <header>
      <el-row>
        <el-col :span="12">
          <img src="@/assets/img/small-logo.png">
          丰台中小学健康大数据管理和综合服务平台
        </el-col>
        <el-col :span="12">
          <!-- <a style="margin-right: 24px;" href="http://hrbaojiansuo.bjedu.cn/" target="_black">怀柔区中小学卫生保健所网站</a> -->
          <span>李东华</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <!-- <img :src="userPath" v-if="userPath" alt=""> -->
              <img src="@/assets/img/default-avatar.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item >修改密码</el-dropdown-item>
              <el-dropdown-item >退出系统</el-dropdown-item>
              <el-dropdown-item  style="font-size: 0.4rem;">退出系统</el-dropdown-item>
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
      data: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.common-header {
  &>header {
    height: 80px;
    line-height: 80px;
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
