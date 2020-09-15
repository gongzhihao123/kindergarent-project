<template>
  <div class="noticeMenu">
    <el-menu
      router
      default-active="/notice/noticeNews"
      class="el-menu-vertical-demo"
      @select='navShow'>
      <h2>新闻资讯中心</h2>
      <template v-for="(item, index) in noticeNav" >
        <el-menu-item :index="item.path" :key="index">
          <i :class="item.icon"></i>
          <span slot="title" >{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      noticeNav: [
        { path: '/notice/noticeNews', icon: 'el-icon-news', title: '新闻动态' },
        { path: '/notice/noticeAnnounce', icon: 'el-icon-message-solid', title: '通知公告' },
        { path: '/notice/noticeThemeActive', icon: 'el-icon-school', title: '学校主题活动' },
        { path: '/notice/noticeEducation', icon: 'noticeEducationImg', title: '教育资讯' },
        { path: '/notice/noticeHealth', icon: 'el-icon-message-solid', title: '健康资讯' }
      ]
    }
  },
  methods: {
    navShow (item) {
      this.$store.commit('saveNoticeNav', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.noticeMenu {
  &>.el-menu {
    width: 250px;
    float: left;
    border: none;
    &>h2 {
      margin-bottom: 20px;
      font-size: 26px;
      font-family:MicrosoftYaHei;
      color:rgba(34,34,34,1);
      line-height:26px;
    }
    &>.el-menu-item {
      .noticeEducationImg {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 12px;
        background: url('./../../../assets/img/noticeEducation.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
