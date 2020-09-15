<template>
  <div class="noticeTopNav">
    <p>新闻资讯中心 >> <span>{{showNoticeTopNav}}</span></p>
  </div>
</template>
<script>
export default {
  name: 'noticeTopNav',
  data () {
    return {}
  },
  computed: {
    showNoticeTopNav: function () {
      let navInfo = this.$store.state.noticeNav
      let noticeTopNavInfo = ''
      if (navInfo === '/notice/noticeNews') {
        noticeTopNavInfo = '新闻动态'
      } else if (navInfo === '/notice/noticeAnnounce') {
        noticeTopNavInfo = '通知公告'
      } else if (navInfo === '/notice/noticeThemeActive') {
        noticeTopNavInfo = '学校主题活动'
      } else if (navInfo === '/notice/noticeEducation') {
        noticeTopNavInfo = '教育资讯'
      } else if (navInfo === '/notice/noticeHealth') {
        noticeTopNavInfo = '健康资讯'
      } else {
        noticeTopNavInfo = '新闻动态'
      }
      return noticeTopNavInfo
    }
  }
}
</script>
<style lang="scss" scoped>
.noticeTopNav {
  margin-bottom: 38px;
  &>p {
    display: inline-block;
    margin-top: 7px;
    span {
      color: #4A90E2;
    }
  }
}
</style>
