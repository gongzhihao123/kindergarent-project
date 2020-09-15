<template>
  <div class="region">
    <div class="region-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加区域</el-button>
          <div>
            <el-input
              placeholder="请输入内容"
              v-model="keyword"
              size="mini"
              clearable>
            </el-input>
            <el-button type="primary" size="mini" @click="searchList">搜索</el-button>
          </div>
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
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">管理员设置</el-button>
              <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delPlan(scope.row.id)'>
                <el-button slot="reference" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="regionDialogFlag"
        width="35%"
        :before-close="handleClose">
        <span>
          <el-transfer
            :titles="['成员列表', '管理人员列表']"
            v-model="regionAdminUserList"
            :props="{
              key: 'id',
              label: 'nickName'
            }"
            @change="chanegTrans"
            @right-check-change="getChanegTransRightData"
            :data="regionUserList">
          </el-transfer>
        </span>
      </el-dialog>
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
        :title="isAdd ? '添加区域' : '编辑区域'"
        :visible.sync="regionDialog"
        width="30%"
        :before-close="regionDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="区域名称" prop="name">
              <el-input v-model="ruleForm.name" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="区域排序" prop="sort">
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
          <el-button @click="regionDialogClose">取 消</el-button>
          <el-button type="primary" @click="regionDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addRegion, regionList, delRegion, regionUserList, regionAdminList, addRegionAdmin, delRegionAdmin } from '@/api/user'
export default {
  data () {
    return {
      onLineRegionList: [],
      onLineRegion: '',
      // 主体
      tableData: [],
      // 分页
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      total: '',
      keyword: '',
      // 编辑or添加弹窗
      regionDialog: false,
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
      },
      regionUserList: [],
      regionDialogFlag: false,
      regionAdminUserList: [],
      tempAdminUserList: [],
      chanegTransRightData: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getregionList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getregionList()
    },
    searchList () {
      this.getregionList()
    },
    // 删除
    delPlan (id) {
      delRegion(id).then(res => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success'
        })
        this.getregionList()
      })
        .catch(() => {
          this.$notify.error({
            title: '错误',
            message: '操作失败'
          })
        })
    },
    add () {
      this.isAdd = true
      this.regionDialog = true
    },
    edit (item) {
      this.areaId = item.id
      this.getRegionUserList()
      this.getRegionAdminList(item.id)
      this.regionDialogFlag = true
    },
    regionDialogClose () {
      this.regionDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    regionDialogConfirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addRegion(this.ruleForm).then(res => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
            this.getregionList()
          })
            .catch(() => {
              this.$notify.error({
                title: '错误',
                message: '操作失败'
              })
            })
          this.regionDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 区域人员列表
    getRegionUserList () {
      regionUserList().then(res => {
        this.regionUserList = res.data
      })
    },
    // 区域人管理员员列表
    getRegionAdminList (id) {
      regionAdminList({ areaId: id }).then(res => {
        let newArr = []
        this.regionAdminUserList = []
        this.tempAdminUserList = res.data
        newArr = res.data.map(item => {
          item.nickName = item.userName
          return item
        })
        for (let i = 0; i < newArr.length; i++) {
          this.regionAdminUserList.push(newArr[i].userId)
        }
      })
    },
    // 获取trans右框数组
    getChanegTransRightData (e) {
      console.log(e)
      this.chanegTransRightData = e
    },
    chanegTrans (e, direc, arr) {
      console.log(e, direc)
      if (direc === 'right') {
        // 添加区域管理员
        if (e.length > 0) {
          for (let i = 0; i < e.length; i++) {
            this.addRegionAdmin(e[i])
          }
        }
      } else if (direc === 'left') {
        // 删除区域管理员
        if (this.chanegTransRightData.length > 0) {
          let newArr = this.chanegTransRightData
          let tempInfo = this.tempAdminUserList
          for (let i = 0; i < newArr.length; i++) {
            console.log(newArr, tempInfo)
            for (let j = 0; j < tempInfo.length; j++) {
              if (newArr * 1 === tempInfo[j].userId * 1) {
                this.getDelRegionAdmin(tempInfo[0].id)
              }
            }
          }
        }
      }
    },
    // 添加区域管理人员
    addRegionAdmin (e) {
      let arr = []
      arr = this.regionUserList.filter(item => item.id * 1 === e * 1)
      addRegionAdmin({
        areaId: this.areaId,
        userId: arr[0].id,
        userName: arr[0].nickName
      })
        .then(res => {
          this.getRegionUserList()
          this.getRegionAdminList(this.areaId)
        })
        .catch(() => {
          this.getRegionUserList()
          this.getRegionAdminList(this.areaId)
        })
    },
    getDelRegionAdmin (e) {
      delRegionAdmin(e).then(res => {
        this.getRegionUserList()
        this.getRegionAdminList(this.areaId)
      })
        .catch(() => {
          this.getRegionUserList()
          this.getRegionAdminList(this.areaId)
        })
    },
    getregionList () {
      regionList(this.keyword)
        .then(res => {
          this.tableData = res.data
        })
    },
    handleClose () {
      this.regionDialogFlag = false
    }
  },
  mounted () {
    this.getregionList()
  }
}
</script>
<style lang="scss">
.region {
  .region-container {
    padding: 12px;
    background: #fff;
    .el-row {
      .el-col {
        display: flex;
        justify-content: space-between;
        > div {
          display: flex;
          > .el-button {
            margin-left: 10px;
          }
        }
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
    .el-dialog__wrapper {
      .el-dialog {
        .elTransfer {
          display: flex;
          > div {
            width: 50%;
            max-height: 100%;
            border: 1px solid #ebeef5;
            background: #fff;
            h1 {
              height: 40px;
              line-height: 40px;
              padding-left: 15px;
              background: #f5f7fa;
              border-bottom: 1px solid #ebeef5;
              color: #000;
              font-size: 14px;
            }
            > ul {
              height: 249px;
              overflow: auto;
              li {
                padding-left: 15px;
                padding: 8px 15px;
              }
              > li:hover {
                color: #fff;
                background: rgb(14, 131, 209);
                cursor: pointer;
              }
            }
          }
          .elTransferRight {
            li {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              i {
                display: none;
              }
            }
            li:hover {
              i {
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
