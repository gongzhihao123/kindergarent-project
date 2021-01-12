<template>
  <div class="company">
    <div class="company-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加单位</el-button>
          <el-select size="small" v-model="onLineCompany" clearable placeholder="请选择">
            <el-option
              v-for="item in onLineCompanyList"
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
        :title="isAdd ? '添加单位' : '编辑单位'"
        :visible.sync="companyDialog"
        width="30%"
        :before-close="companyDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="单位名称" prop="name">
              <el-input v-model="ruleForm.name" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="单位排序" prop="sort">
              <el-input-number
                v-model.number="ruleForm.sort"
                :min="0"
                :max="999"
                controls-position="right"
                style="width: 370px;"
              />
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="companyDialogClose">取 消</el-button>
          <el-button type="primary" @click="companyDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addCompany, companyList } from '@/api/user'
export default {
  data () {
    return {
      onLineCompanyList: [],
      onLineCompany: '',
      // 主体
      tableData: [],
      // 分页
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      total: '',
      keyword: '',
      // 编辑or添加弹窗
      companyDialog: false,
      isAdd: true,
      ruleForm: {
        name: '',
        sort: ''
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getcompanyList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getcompanyList()
    },
    add () {
      this.isAdd = true
      this.companyDialog = true
    },
    edit (item) {
      this.isAdd = false
      this.companyDialog = true
    },
    companyDialogClose () {
      this.companyDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    companyDialogConfirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addCompany(this.ruleForm).then(res => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
            this.getcompanyList()
          })
            .catch(() => {
              this.$notify.error({
                title: '错误',
                message: '操作失败'
              })
            })
          this.companyDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getcompanyList () {
      companyList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        keyword: this.keyword
      })
        .then(res => {
          this.tableData = res.data.records
        })
    }
  },
  mounted () {
    this.getcompanyList()
  }
}
</script>
<style lang="scss">
.company {
  .company-container {
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
