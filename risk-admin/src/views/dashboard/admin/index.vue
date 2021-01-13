<template>
  <div class="dashboard-admin-container">
    <div>
      <i class="el-icon-s-platform"></i>
      <span>幼儿园办公平台</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
  width: 100%;
  height: calc(100vh - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(18, 108, 182);
    font-weight: 600;
    i {
      margin-bottom: 10px;
      font-size: 100px;
    }
    > span {
      padding: 20px 40px;
      font-size: 50px;
      border-top: 5px solid rgb(18, 108, 182);
    }
  }
}
</style>
