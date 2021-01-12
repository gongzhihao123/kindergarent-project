<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data () {
    return {
      currentRole: 'adminDashboard',
      updateCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created () {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
  // beforeRouteLeave (to, from, next) { // 离开当前页
  //   this.$confirm('即将离开当前页，请确定是否保存当前数据？', '离开当前页', {
  //     confirmButtonText: '保存',
  //     cancelButtonText: '不保存',
  //     type: 'warning'
  //   }).then(() => {
  //     // ...todo 这里调接口 保存数据

  //     next()
  //   }).catch(() => { next() })
  // }
}
</script>
