<template>
  <div class="userManage">
    <div class="userManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加用户</el-button>
          <el-select size="small" v-model="onLineUser" clearable placeholder="请选择">
            <el-option
              v-for="item in onLineUserList"
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
            prop="nickName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="账号">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="默认123456" placement="left-start">
                <el-button size="mini" type="info" icon="el-icon-refresh-left" @click="edit(scope.row)">重置密码</el-button>
              </el-tooltip>
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
        :current-page="pageNo"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        :title="isAdd ? '添加用户' : '编辑用户'"
        :visible.sync="userDialog"
        width="30%"
        :before-close="userDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" auto-complete="on" style="width: 310px;"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <el-input v-model="ruleForm.account" auto-complete="on" style="width: 310px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone" auto-complete="on" style="width: 310px;"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="region">
              <el-radio-group v-model="ruleForm.region">
                <el-radio label="1">公务员</el-radio>
                <el-radio label="2">事业编</el-radio>
              </el-radio-group>
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
import { userList } from '@/api/user'
export default {
  data () {
    return {
      onLineUserList: [],
      onLineUser: '',
      // 主体
      tableData: [],
      // 分页
      pageSize: 10,
      pageNo: 1,
      total: '',
      // 编辑or添加弹窗
      userDialog: false,
      isAdd: true,
      ruleForm: {
        name: '',
        account: '',
        phone: '',
        region: '1'
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getUserList()
    },
    add () {
      this.isAdd = true
      this.userDialog = true
    },
    edit (item) {
      this.isAdd = false
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
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.userDialog = false
    },
    getUserList () {
      userList({
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
        .then(res => {
          this.tableData = res.data.records
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
.userManage {
  .userManage-container {
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
