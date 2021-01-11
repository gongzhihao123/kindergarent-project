<template>
  <div class="role">
    <div class="role-container">
  <!-- 表格主体 -->
      <div class="content">
        <div class="table1 el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-16 el-col-lg-16 el-col-xl-17">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addRole">添加</el-button>
          <el-table
            :data="tableData"
            @row-click="clickRole"
            highlight-current-row
            style="width: 100%; margin-top: 20px">
            <el-table-column
              prop="roleName"
              label="名称">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click.native.stop="editRole(scope.row)">编辑</el-button>
                <el-button size="mini" icon="el-icon-delete" type="danger" @click.native.stop='delRole(scope.row)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="total"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
        <div class="rolePermissBox el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-7 el-col-lg-7 el-col-xl-6">
          <div class="rolePermissBox-header">
            <span>权限设置</span>
            <div></div>
          </div>
          <el-checkbox-group v-model="checkPermissList" >
            <el-checkbox @change="changePermiss(item, $event)" v-for="(item, index) in rolePermissList" :key="index" :label="item.permissionName">{{ item.permissionLabel }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <el-dialog
        :title="isAdd ? '添加角色' : '编辑角色'"
        :visible.sync="roleDialog"
        width="30%"
        :before-close="roleDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="ruleForm.roleName" auto-complete="on" ></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="roleDialogClose">取 消</el-button>
          <el-button type="primary" @click="roleDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { apiRoleList, apiAddRole, apiEditRole, apiDelRole, apiRolePermissionList, apiAddRolePermission, apiDelRolePermission } from '@/api/user'
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
      roleDialog: false,
      isAdd: true,
      ruleForm: {
        roleName: ''
      },
      rules: {
        roleName: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      // 用户角色权限设置
      checkPermissList: [],
      rolePermissList: [],
      roleId: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.current = val
      this.getRoleList()
    },
    addRole () {
      this.isAdd = true
      this.roleDialog = true
      this.ruleForm = {}
    },
    editRole (item) {
      this.isAdd = false
      this.roleDialog = true
      this.ruleForm.roleId = item.roleId
      this.ruleForm.roleName = item.roleName
    },
    delRole (row) {
      apiDelRole(row.roleId).then(res => {
        success(res.msg)
        this.getRoleList()
      })
        .catch(res => {
          error(res.msg)
        })
    },
    roleDialogClose () {
      this.roleDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    roleDialogConfirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            // 添加
            apiAddRole(this.ruleForm).then(res => {
              success(res.msg)
              this.getRoleList()
              this.roleDialog = false
            })
              .catch(res => {
                error(res.msg)
              })
          } else {
            // 修改
            apiEditRole(this.ruleForm).then(res => {
              success(res.msg)
              this.getRoleList()
              this.roleDialog = false
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
    getRoleList () {
      apiRoleList(this.current, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.current = res.data.current
        this.pageSize = res.data.size
        this.total = res.data.total
      })
    },
    // 查看用户权限
    clickRole (row) {
      this.roleId = row.roleId
      this.checkPermissList = []
      this.checkPermissList = row.permissionList.map(item => {
        return item.permissionName
      })
    },
    changePermiss (val, e) {
      if (e) {
        // 为true 添加
        apiAddRolePermission({ roleId: this.roleId, permissionId: val.permissionId }).then(res => {
          success(res.msg)
          this.getRoleList()
        })
          .catch(res => {
            error(res.msg)
          })
      } else {
        // 为false 删除
        apiDelRolePermission({ roleId: this.roleId, permissionId: val.permissionId }).then(res => {
          success(res.msg)
          this.getRoleList()
        })
          .catch(res => {
            error(res.msg)
          })
      }
    },
    // 获取角色权限列表
    getRolePermissList () {
      apiRolePermissionList().then(res => {
        this.rolePermissList = res.data
      })
    }
  },
  mounted () {
    this.getRoleList()
    this.getRolePermissList()
  }
}
</script>
<style lang="scss">
.role {
  .role-container {
    padding: 14px;
    background: #fff;
    .el-row {
      .el-col {
        display: flex;
        justify-content: space-between;
      }
    }
    .content {
      // margin: 20px 0;
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
      .el-pagination {
        margin: 10px 0;
        text-align: center;
      }
      > div {
        border-radius: 4px;
        border: 1px solid #e6ebf5;
      }
      .table1 {
        margin-right: 7.5px;
        > .el-button {
          margin: 10px;
        }
      }
      .rolePermissBox {
        margin-left: 7.5px;
        .rolePermissBox-header {
          display: flex;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid #e6ebf5;
        }
        .el-checkbox-group {
          padding: 20px;
        }
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
