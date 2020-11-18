<template>
  <div class="permission">
    <div class="permission-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addPermission">添加权限</el-button>
        </el-col>
      </el-row>
  <!-- 表格主体 -->
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="permissionName"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="permissionLabel"
            label="标签">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="600">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="editPermission(scope.row)">编辑</el-button>
              <el-popconfirm style="margin-left: 10px;" title="您确定要删除吗？" @confirm='delPermission(scope.row)'>
                <el-button slot="reference" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="total"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        :title="isAdd ? '添加权限' : '编辑权限'"
        :visible.sync="permissionDialog"
        width="30%"
        :before-close="permissionDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="权限名称" prop="permissionName">
              <el-input v-model="ruleForm.permissionName" auto-complete="on" ></el-input>
            </el-form-item>
            <el-form-item label="权限标签" prop="permissionLabel">
              <el-input v-model="ruleForm.permissionLabel" auto-complete="on" ></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="permissionDialogClose">取 消</el-button>
          <el-button type="primary" @click="permissionDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { apiPermissionList, apiAddPermission, apiEditPermission, apiDelPermission } from '@/api/user'
import { success, error } from '@/utils/notice'
export default {
  data () {
    return {
      // 主体
      tableData: [],
      // 分页
      current: 1,
      pageSize: 10,
      total: '',
      // 编辑or添加弹窗
      permissionDialog: false,
      isAdd: true,
      ruleForm: {
        permissionName: '',
        permissionLabel: ''
      },
      rules: {
        permissionName: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        permissionLabel: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 分页
    handleCurrentChange (val) {
      this.current = val
      this.getPermissionList()
    },
    // 添加权限
    addPermission () {
      this.isAdd = true
      this.permissionDialog = true
      this.ruleForm = {}
    },
    // 修改权限
    editPermission (item) {
      this.isAdd = false
      this.permissionDialog = true
      this.ruleForm.permissionId = item.permissionId
      this.ruleForm.permissionName = item.permissionName
      this.ruleForm.permissionLabel = item.permissionLabel
    },
    // 删除权限
    delPermission (row) {
      apiDelPermission(row.permissionId).then(res => {
        success(res.data)
        this.getPermissionList()
      })
        .catch(res => {
          error(res.msg)
        })
    },
    // 取消弹窗
    permissionDialogClose () {
      this.permissionDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    // 弹窗提交
    permissionDialogConfirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            // 添加
            apiAddPermission(this.ruleForm).then(res => {
              success(res.data)
              this.getPermissionList()
              this.permissionDialog = false
            })
              .catch(res => {
                error(res.msg)
              })
          } else {
            // 修改
            apiEditPermission(this.ruleForm).then(res => {
              success(res.data)
              this.getPermissionList()
              this.permissionDialog = false
            })
              .catch(res => {
                error(res.msg)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getPermissionList () {
      apiPermissionList(this.current, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.current = res.data.current
        this.pageSize = res.data.size
        this.total = res.data.total
      })
    }
  },
  mounted () {
    this.getPermissionList()
  }
}
</script>
<style lang="scss">
.permission {
  .permission-container {
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
