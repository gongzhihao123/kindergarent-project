
<template>
  <div class="user">
    <div class="user-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addUser">添加用户</el-button>
          <!-- <el-select size="small" v-model="onLineUser" clearable placeholder="请选择">
            <el-option
              v-for="item in onLineUserList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-col>
      </el-row>
  <!-- 表格主体 -->
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="account"
            label="账号">
          </el-table-column>
          <el-table-column
            label="名称"
            property="user.nickname">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="600">
            <template slot-scope="scope">
              <el-button size="mini" type="info" icon="el-icon-refresh-left" @click="reset(scope.row)">重置密码</el-button>
              <el-button size="mini" type="info" icon="el-icon-refresh-left" @click="editUser(scope.row)">修改账号</el-button>
              <el-button size="mini" type="info" icon="el-icon-refresh-left" @click="editUserInfo(scope.row)">修改用户信息</el-button>
              <!-- <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button> -->
              <el-popconfirm title="您确定要删除此项目吗？" @confirm='delUser(scope.row)'>
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
        :current-page="current"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        :title="isEditInfo ? '修改用户信息' : '修改用户账号'"
        :visible.sync="userDialog"
        width="30%"
        :before-close="userDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item v-if="isEditInfo" label="名称" prop="nickname">
              <el-input v-model="ruleForm.nickname" auto-complete="on" style="width: 310px;"></el-input>
            </el-form-item>
            <el-form-item v-else label="账号" prop="account">
              <el-input v-model="ruleForm.account" auto-complete="on" style="width: 310px;"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userDialogClose">取 消</el-button>
          <el-button type="primary" @click="userDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { apiUserList, apiAddUser, apiResetPasseord, apiEditUser, apiEditUserInfo, apiDelUser } from '@/api/user'
import { success, error } from '@/utils/notice'
export default {
  data () {
    return {
      onLineUserList: [],
      onLineUser: '',
      // 主体
      tableData: [
        { id: 1, name: 'asd' }
      ],
      // 分页
      current: 1,
      pageSize: 10,
      total: '',
      // 编辑or添加弹窗
      handleDialog: 1,
      userDialog: false,
      isEditInfo: true,
      ruleForm: {
        account: '',
        userId: '',
        nickname: '',
        headimg: ''
      },
      rules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.current = val
      this.getUserList()
    },
    // 添加
    addUser () {
      this.$prompt('请输入用户账号', '添加用户账号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\S+/,
        inputErrorMessage: '内容不能为空'
      }).then(({ value }) => {
        apiAddUser({ account: value }).then(res => {
          this.getUserList()
          this.$message({
            type: 'success',
            message: res.data
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    delUser (val) {
      apiDelUser(val.userId).then(res => {
        success(res.data)
        this.getUserList()
        this.userDialog = false
      })
        .catch(res => {
          error(res.msg)
        })
    },
    // 重置
    reset (val) {
      this.$confirm('此操作将重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiResetPasseord({ account: val.account, userId: val.userId }).then(res => {
          this.$message({
            type: 'success',
            message: '成功!'
          })
          this.getUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    // 修改用户账号
    editUser (item) {
      this.isEditInfo = false
      this.userDialog = true
      this.ruleForm.account = item.account
      this.ruleForm.userId = item.userId
    },
    // 修改用户信息
    editUserInfo () {
      this.isEditInfo = true
      this.userDialog = true
    },
    userDialogClose () {
      this.userDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    userDialogConfirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.isEditInfo) {
            // 修改用户信息
            apiEditUserInfo(this.ruleForm).then(res => {
              success(res.data)
              this.getUserList()
              this.userDialog = false
            })
              .catch(res => {
                error(res.msg)
              })
          } else {
            // 修改用户账号
            apiEditUser(this.ruleForm).then(res => {
              success(res.data)
              this.getUserList()
              this.userDialog = false
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
      // this.userDialog = false
    },
    getUserList () {
      apiUserList(this.current, this.pageSize).then(res => {
        this.tableData = res.data.records
        this.current = res.data.current
        this.pageSize = res.data.size
        this.total = res.data.total
      })
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>
<style lang="scss">
.user {
  .user-container {
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
