<template>
  <div class="notice">
    <header>
      <el-row>
        <el-col :span="12">
          <img src="@/assets/img/small-logo.png">
          丰台中小学健康大数据管理和综合服务平台
        </el-col>
      </el-row>
    </header>
    <div class="notice-frame">
      <noticeMenu></noticeMenu>
      <noticeTopNav></noticeTopNav>
      <router-view/>
    </div>
  </div>
</template>
<script>
import noticeMenu from './component/noticeMenu.vue'
import noticeTopNav from './component/noticeTopNav.vue'
export default {
  name: 'notice',
  data () {
    return {}
  },
  components: {
    noticeMenu,
    noticeTopNav
  }
}
</script>
<style lang="scss" scoped>
.notice {
  &>header {
    height: 80px;
    line-height: 80px;
    margin-bottom: 45px;
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
    }
  }
  .notice-frame {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
