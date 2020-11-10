<template>
  <div class="adminAnalysis">
    <div class="handleHead">
      <!-- <el-radio-group v-model="adminAnalysisType" size="small">
        <el-radio-button  label="1">单选</el-radio-button>
        <el-radio-button  label="2">多选</el-radio-button>
        <el-radio-button  label="3">判断</el-radio-button>
      </el-radio-group> -->
    </div>
    <div class="adminAnalysis-container">
       <el-table
        :data="tableData"
        border
        style="width: 100%;">
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
            <el-button size="mini" type="primary" icon="el-icon-s-data" @click="edit(scope.row)">导出</el-button>
            <el-button size="mini" type="primary" icon="el-icon-s-data" @click="edit(scope.row)">查看统计</el-button>
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
      <el-dialog
        title="习题详情"
        :visible.sync="adminAnalysisFlag"
        width="30%"
        :before-close="exapleDiaClose">
        <span class="adminAnalysisBox">
          <div>
            <el-table
              :data="tableData"
              border
              style="width: 100%;">
              <el-table-column
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
            <el-pagination
              v-if="detailTotal"
              @size-change="detailSizeChange"
              @current-change="detailCurrentChange"
              :current-page="detailCurrentPage"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="detailPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="detailTotal">
            </el-pagination>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="adminAnalysisFlag = false">取 消</el-button>
          <el-button type="primary" @click="adminAnalysisFlag = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // adminAnalysisType: 1,
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
      pageSize: 10,
      // 弹窗
      adminAnalysisFlag: false,
      detailTotal: '',
      detailCurrentPage: 1,
      detailPageSize: 10
    }
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {},
    edit (e) {
      this.$router.push('/gradeManage/adminAnalysisDetail')
    },
    delPlan () {},
    exapleDiaClose () {},
    // 弹窗分页
    detailSizeChange () {},
    detailCurrentChange () {}
  }
}
</script>
<style lang="scss">
.adminAnalysis {
  padding: 12px;
  background: #fff;
  .adminAnalysis-container {
    .el-table {
      overflow: auto;
      margin-top: 10px;
      .el-table__header {
        th {
          .cell {
            text-align: center;
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
    .el-dialog__wrapper {
      .el-dialog__body {
        padding-top: 0;
        .adminAnalysisBox {}
      }
    }
  }
}
</style>
