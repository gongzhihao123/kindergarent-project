<template>
  <div class="studentAnalysis">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-s-data" @click="seeDetail(scope.row)">查看详情</el-button>
          <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row)'>
            <el-button slot="reference" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      // 分页
      total: '',
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {},
    seeDetail () {
      this.$router.push('/gradeManage/studentAnalysisDetail')
    }
  }
}
</script>
<style lang="scss">
.studentAnalysis {
  padding: 12px;
  .el-table {
    overflow: auto;
    margin-top: 10px;
    .el-table__header {
      th {
        .cell {
          text-align: center;
          font-weight: bold;
        }
      }
    }
    td {
      text-align: center;
      .el-popover__reference {
        margin-left: 10px;
      }
    }
  }
  .el-pagination {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
