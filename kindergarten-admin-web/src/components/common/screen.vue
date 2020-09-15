<template>
  <div class="screen">
    <div class="handle">
      <el-cascader
        v-model="value"
        :options="schoolList"
        :props="changeProps"
        @change="handleChange">
      </el-cascader>
    </div>
    <div class="header-search">
      <!-- <el-select v-model="searchValue" placeholder="所有区域">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <el-input
        placeholder="请输入学校名称或代码"
        v-model="searchInput"
        clearable>
      </el-input>
      <el-button type="success">搜索</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchInput: '',
      value: [],
      options: [],
      changeProps: { lable: 'name', value: 'id' },
      schoolList: []
    }
  },
  methods: {
    handleChange (data) {
      this.$emit('schoolInfo', data)
    },
    // 获取学校列表
    getSchoolList () {
      this.$store.dispatch('schoolList', {
        pageNo: 1,
        pageSize: 10
      })
        .then(res => {
          if (res.code === 1) {
            this.schoolList = res.records
          }
        })
    }
  },
  mounted () {
    this.getSchoolList()
  }
}
</script>
<style lang="scss" scoped>
.screen {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .handle {}
  .header-search {
    .el-select {
      width: 150px;
      .el-input {
        width: 150px;
        margin: auto;
      }
    }
    .el-input {
      width: 220px;
      margin: 0 10px;
    }
  }
}
</style>
