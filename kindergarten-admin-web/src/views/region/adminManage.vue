<template>
  <div class="regionAdmin">
    <div class="regionAdmin-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加区域管理员</el-button>
          <el-select size="small" v-model="onLineRegionAdmin" clearable placeholder="请选择">
            <el-option
              v-for="item in onLineRegionAdminList"
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
          border
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
      <el-dialog
        :title="isAdd ? '添加区域管理员' : '编辑区域管理员'"
        :visible.sync="regionAdminDialog"
        width="30%"
        :before-close="regionAdminDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
            <el-form-item label="管理员区域" prop="areaId">
              <el-select v-model="ruleForm.areaId" style="width: 370px;" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in areaList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="管理员名称" prop="userId">
              <el-select v-model="ruleForm.userId" style="width: 370px;" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in userNameList"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="regionAdminDialogClose">取 消</el-button>
          <el-button type="primary" @click="regionAdminDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addRegionAdmin, regionAdminList, regionList, regionUserList } from '@/api/user'
export default {
  data () {
    return {
      onLineRegionAdminList: [],
      onLineRegionAdmin: '',
      // 主体
      tableData: [],
      areaId: '',
      area: '',
      areaList: [],
      userId: '',
      userName: '',
      userNameList: [],
      // 编辑or添加弹窗
      regionAdminDialog: false,
      isAdd: true,
      ruleForm: {
        userId: '',
        areaId: ''
      },
      rules: {
        userId: [
          { required: true, message: '姓名不能为空', trigger: 'change' }
        ],
        areaId: [
          { required: true, message: '区域不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getregionAdminList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getregionAdminList()
    },
    add () {
      this.getAreaList()
      this.getRegionAdminUserList()
      this.isAdd = true
      this.regionAdminDialog = true
    },
    edit (item) {
      this.isAdd = false
      this.regionAdminDialog = true
    },
    regionAdminDialogClose () {
      this.regionAdminDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    regionAdminDialogConfirm () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          let arr = this.userNameList.filter(item => item.id * 1 === this.ruleForm.userId * 1)
          this.ruleForm.userName = arr[0].nickName
          await addRegionAdmin(this.ruleForm).then(res => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
            this.getregionAdminList()
          })
            .catch(() => {
              this.$notify.error({
                title: '错误',
                message: '操作失败'
              })
            })
          this.regionAdminDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取区域列表
    getAreaList () {
      regionList('').then(res => {
        this.areaList = res.data
      })
    },
    getRegionAdminUserList () {
      regionUserList().then(res => {
        this.userNameList = res.data
      })
    },
    getregionAdminList () {
      regionAdminList({
        areaId: this.areaId
      })
        .then(res => {
          this.tableData = res.data.records
        })
    }
  },
  mounted () {
    this.getregionAdminList()
  }
}
</script>
<style lang="scss">
.regionAdmin {
  .regionAdmin-container {
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
