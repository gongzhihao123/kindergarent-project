<template>
  <div class="testPaperManage-typeSetup">
    <div class="typeSetupBox">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加类型</el-button>
          <el-select size="small" v-model="testPaperType" clearable placeholder="请选择">
            <el-option
              v-for="item in testPaperTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
  <!-- 表格主体 -->
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="归属地">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
              <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row)'>
                <el-button slot="reference" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        :title="isAdd ? '添加类型' : '编辑类型'"
        :visible.sync="testPaperTypeDialog"
        width="30%"
        :before-close="testPaperTypeDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="类型名称" prop="name">
              <el-input v-model="ruleForm.name" auto-complete="on" style="width: 310px;"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="testPaperTypeDialogClose">取 消</el-button>
          <el-button type="primary" @click="testPaperTypeDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      testPaperTypeList: [],
      testPaperType: '',
      // 主体
      tableData: [
        { id: 1, name: 'asd' }
      ],
      // 分页
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      total: '',
      // 编辑or添加弹窗
      testPaperTypeDialog: false,
      isAdd: true,
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '类型名称不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.gettestPaperTypeList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.gettestPaperTypeList()
    },
    add () {
      this.isAdd = true
      this.testPaperTypeDialog = true
    },
    edit (item) {
      console.log(item)
      this.isAdd = false
      this.testPaperTypeDialog = true
    },
    testPaperTypeDialogClose () {
      this.testPaperTypeDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    testPaperTypeDialogConfirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.testPaperTypeDialog = false
    }
  }
}
</script>
<style lang="scss">
.testPaperManage-typeSetup {
  .typeSetupBox {
    padding: 12px;
    background: #fff;
    .el-row {
      .el-col {
        display: flex;
        justify-content: space-between;
      }
    }
    .content {
      margin: 20px 0;
      .el-table {
        overflow: auto;
        .el-table__header {
          th {
            // background-color: #e0e0e0;
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
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
