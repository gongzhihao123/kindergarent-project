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
        <div class="table1 el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-16 el-col-lg-16 el-col-xl-17">
          <el-table
            :data="tableData"
            @row-click="clickArea"
            highlight-current-row
            style="width: 100%; margin-top: 20px">
            <el-table-column
              prop="areaName"
              label="名称">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <!-- <el-button size="mini" type="primary" icon="el-icon-edit" @click.native.stop="edit(scope.row)">编辑</el-button> -->
                <el-button size="mini" icon="el-icon-delete" type="danger" @click.native.stop='delArea(scope.row)'>删除</el-button>
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
            <span>区域管理员设置</span>
            <div></div>
          </div>
          <el-checkbox-group v-model="regionAdminUserList" >
            <el-checkbox @change="changePermiss(item, $event)" v-for="(item, index) in regionUserList" :key="index" :label="item.userId">{{ item.nickname }}</el-checkbox>
          </el-checkbox-group>
          <!-- <el-radio-group v-model="radio">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group> -->
        </div>
      </div>
      <el-dialog
        :title="isAdd ? '添加区域' : '编辑区域'"
        :visible.sync="regionDialog"
        width="30%"
        :before-close="regionDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="区域名称" prop="areaName">
              <el-input v-model="ruleForm.areaName" />
            </el-form-item>
            <el-form-item label="区域排序" prop="sort">
              <el-input-number
                v-model.number="ruleForm.sort"
                :min="0"
                :max="999"
                controls-position="right"
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
import { addRegion, regionList, delRegion, regionUserList, addRegionAdmin } from '@/api/risk/index'
import { success, error } from '@/utils/notice'
export default {
  data () {
    return {
      onLineRegionList: [],
      onLineRegion: '',
      // 主体
      tableData: [],
      // 分页
      current: 1,
      pageSize: 10,
      total: '',
      keyword: '',
      // 编辑or添加弹窗
      regionDialog: false,
      isAdd: true,
      ruleForm: {
        areaName: '',
        sort: ''
      },
      rules: {
        areaName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 6, max: 40, message: '长度在 6 到 40 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' },
          { type: 'number', message: '年龄必须为数字值' }
        ]
      },
      regionUserList: [],
      regionAdminUserList: [],
      tempAdminUserList: [],
      chanegTransRightData: []
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.current = val
      this.getregionList()
    },
    searchList () {
      this.getregionList()
    },
    // 删除
    delArea (val) {
      delRegion(val.areaId).then(res => {
        success(res.msg)
        this.getregionList()
      })
        .catch((err) => {
          error(err.msg)
        })
    },
    add () {
      this.ruleForm = {}
      this.isAdd = true
      this.regionDialog = true
    },
    edit (item) {
      this.isAdd = false
      this.areaId = item.id
      this.regionDialog = true
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
              message: res.message,
              type: 'success'
            })
            this.getregionList()
          })
            .catch((res) => {
              this.$notify.error({
                title: '错误',
                message: res.message
              })
            })
          this.regionDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击区域表格
    clickArea (row) {
      this.areaId = row.areaId
      this.regionAdminUserList = []
      if (row.admin) {
        this.regionAdminUserList.push(row.admin.userId)
      } else {
        this.regionAdminUserList = []
      }
    },
    // 设置区域管理员
    changePermiss (val, e) {
      addRegionAdmin({ areaId: this.areaId, userId: val.userId }).then(res => {
        success(res.msg)
        this.getregionList()
      })
        .catch(res => {
          error(res.msg)
        })
    },
    // 区域人员列表
    getRegionUserList () {
      regionUserList().then(res => {
        this.regionUserList = res.data
      })
    },
    getregionList () {
      regionList({ pageNo: this.current, pageSize: this.pageSize, keyword: this.keyword })
        .then(res => {
          this.tableData = res.data.records
        })
    }
  },
  mounted () {
    this.getregionList()
    this.getRegionUserList()
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
