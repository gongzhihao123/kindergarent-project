
<template>
  <div class="user">
    <div class="user-container">
  <!-- 表格主体 -->
      <div class="content">
        <div class="table1 el-col el-col-22 el-col-xs-22 el-col-sm-22 el-col-md-13 el-col-lg-13 el-col-xl-16">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addUser">添加</el-button>
          <el-table
            :data="tableData"
            @row-click="clickUser"
            highlight-current-row
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
              width="320">
              <template slot-scope="scope">
                <el-button size="mini" type="info" icon="el-icon-refresh-left" @click="reset(scope.row)">重置密码</el-button>
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="editUser(scope.row)">修改账号</el-button>
                <el-popconfirm title="您确定要删除此项目吗？" @confirm='delUser(scope.row)'>
                  <el-button slot="reference" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
                </el-popconfirm>
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
        <div class="userPermissBox el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-7 el-col-lg-7 el-col-xl-6">
          <div class="userPermissBox-header">
            <span>角色设置</span>
            <div></div>
          </div>
          <el-checkbox-group v-model="checkUserRoleList" >
            <el-checkbox @change="changeRole(item, $event)" v-for="(item, index) in userRoleList" :key="index" :label="item.roleId">{{ item.roleName }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 添加用户 -->
      <el-dialog
        :title="isEdit ? '修改用户' : '添加用户'"
        class="addUserDia"
        :visible.sync="addUserDialog"
        width="30%"
        :before-close="addUserDialogClose">
        <span>
            <ul>
              <li>
                <span>账号</span>
                <el-input v-model="addRuleForm.account" auto-complete="on" style="width: 310px;"></el-input>
              </li>
              <li>
                <span>名称</span>
                <el-input v-model="userNickname" auto-complete="on" style="width: 310px;"></el-input>
              </li>
              <li>
                <span>头像</span>
                <el-upload
                  ref="my-upload"
                  :class="{uoloadSty:showBtnImg,disUoloadSty:noneBtnImg}"
                  :file-list="fileList"
                  :action="uploadPath"
                  list-type="picture-card"
                  :on-success="uploadSuccess"
                  :limit="1"
                  :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file"  slot-scope="{file}">
                      <img
                        v-if="file.filepath"
                        class="el-upload-list__item-thumbnail"
                        :src="'http://123.57.161.229/zhenyou-file/' + file.filepath" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file, fileList)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="imgdialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </li>
            </ul>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogClose">取 消</el-button>
          <el-button type="primary" @click="addUserDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { apiUserList, apiAddUser, apiResetPasseord, apiEditUser, apiDelUser, apiUserRoleList, apiAddUserRole, apiDelUserRole, apiDelUpload } from '@/api/user'
import { success, error, warning } from '@/utils/notice'
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
      pageSize: 8,
      total: '',
      // 编辑or添加弹窗
      handleDialog: 1,
      userDialog: false,
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
      },
      // 添加用户弹窗
      addUserDialog: false,
      isEdit: true,
      addRuleForm: {
        account: '',
        user: {
          headimg: '',
          nickname: ''
        },
        userId: ''
      },
      userNickname: '',
      userHeadimg: '',
      headimgAttachmentId: '',
      addRules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      },
      userRoleList: [],
      checkUserRoleList: [],
      userId: '',
      // 上传参数
      fileList: [],
      showBtnImg: true,
      noneBtnImg: false,
      limitCountImg: 1, // 上传图片的最大数量,
      imgUrl: ''
    }
  },
  computed: {
    uploadPath () {
      // const routePath = '/activity'
      return window.location.origin + process.env.VUE_APP_BASE_API + '/manage/userAccount/attachment'
    }
  },
  methods: {
    // 上传操作
    // 删除上传图片
    handleRemove (file, fileList) {
      // 添加删除
      apiDelUpload(file.attachmentId)
        .then((res) => {
          if (res.code === 200) {
            this.getUserList()
            success(res.msg)
            this.fileList = []
            this.noneBtnImg = false
          }
        })
      this.fileList = fileList.filter(f => f.attachmentId * 1 !== file.attachmentId * 1)
      this.$refs['my-upload'].clearFiles()
    },
    uploadSuccess (res) {
      this.headimgAttachmentId = res.data.attachmentId
      this.userHeadimg = res.data.filepath
      this.fileList.push(res.data)
      success(res.msg)
    },
    imgChange (file, fileList) {
      this.noneBtnImg = fileList.length >= this.limitCountImg
    },
    // 分页
    handleCurrentChange (val) {
      this.current = val
      this.getUserList()
    },
    // 添加用户
    addUser () {
      this.addUserDialog = true
      this.isEdit = false
      this.addRuleForm = {}
      this.userNickname = ''
      this.fileList = []
    },
    // 修改用户
    editUser (item) {
      this.fileList = []
      this.isEdit = true
      this.addUserDialog = true
      this.addRuleForm.account = item.account
      this.addRuleForm.userId = item.userId
      if (item.imgAttachment) {
        this.userHeadimg = item.imgAttachment.filepath
        this.fileList.push(item.imgAttachment)
      }
      this.userNickname = item.user.nickname
    },
    // 添加用户确认
    addUserDialogConfirm () {
      let accountReg = /^[0-9a-zA-Z_]{6,12}$/
      if (!this.addRuleForm.account) {
        warning('账号不能为空')
        return
      } else if (!accountReg.test(this.addRuleForm.account)) {
        warning('请输入6到12位账号')
        return
      }
      let user = {
        headimgAttachmentId: this.headimgAttachmentId,
        nickname: this.userNickname
      }
      this.addRuleForm.user = user
      if (this.isEdit) {
        // 修改
        apiEditUser(this.addRuleForm).then(res => {
          success(res.msg)
          this.getUserList()
          this.addUserDialog = false
        })
          .catch(res => {
            error(res.msg)
          })
      } else {
        // 添加
        apiAddUser(this.addRuleForm).then(res => {
          this.addUserDialog = false
          this.getUserList()
          success(res.msg)
        }).catch(err => {
          error(err.msg)
        })
      }
    },
    addUserDialogClose () {
      this.addUserDialog = false
      this.addRuleForm = {}
    },
    // 删除用户
    delUser (val) {
      apiDelUser(val.userId).then(res => {
        success(res.msg)
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
    clickUser (row) {
      this.userId = row.userId
      this.checkUserRoleList = []
      if (row.roleList.length > 0) {
        this.checkUserRoleList = row.roleList.map(item => {
          return item.roleId
        })
      }
    },
    changeRole (val, e) {
      if (e) {
        // 为true 添加
        apiAddUserRole({ userId: this.userId, roleId: val.roleId }).then(res => {
          success(res.msg)
          this.getUserList()
          this.userId = ''
        })
          .catch(res => {
            error(res.msg)
          })
      } else {
        // 为false 删除
        apiDelUserRole({ userId: this.userId, roleId: val.roleId }).then(res => {
          success(res.msg)
          this.getUserList()
          this.userId = ''
        })
          .catch(res => {
            error(res.msg)
          })
      }
    },
    // 获取用户角色列表
    getUserRoleList () {
      apiUserRoleList().then(res => {
        this.userRoleList = res.data
      })
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
    this.getUserRoleList()
  }
}
</script>
<style lang="scss">
.user {
  .user-container {
    padding: 14px;
    background: #fff;
    .el-row {
      .el-col {
        display: flex;
        justify-content: space-between;
      }
    }
    .content {
      .el-table {
        overflow: auto;
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
      .userPermissBox {
        margin-left: 7.5px;
        .userPermissBox-header {
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
    .addUserDia {
      .el-dialog__body {
        display: flex;
        justify-content: center;
        ul {
          li {
            margin: 10px 0;
            span {
              margin-right: 10px;
            }
            .el-upload-list {
              .el-upload-list__item {
                width: 100px;
                height: 100px;
                .el-upload-list__item-actions {
                  width: 100px;
                  height: 100px;
                }
              }
            }
          }
          li:first-child {
            span:before {
              content: '*';
              color: #f00;
              margin: 0 5px 0 -12px;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.uoloadSty {
  display: inline-block;
}
.uoloadSty .el-upload--picture-card{
  width:110px;
  height:110px;
  line-height:110px;
}
.disUoloadSty .el-upload--picture-card{
  display:none;
}
</style>
