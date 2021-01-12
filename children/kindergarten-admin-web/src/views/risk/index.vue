<template>
  <div class="risk">
    <div class="risk-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">新增安全隐患</el-button>
          <el-select size="small" v-model="onLineRisk" clearable placeholder="请选择">
            <el-option
              v-for="item in onLineRiskList"
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
        :current-page="pageNo"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        :title="isAdd ? '添加' : '编辑'"
        :visible.sync="riskDialog"
        width="30%"
        :before-close="riskDialogClose">
        <span>
          <ul>
            <li>
              <span>标题</span>
              <el-input
                placeholder="请输入"
                v-model="riskTitle"
                clearable>
              </el-input>
            </li>
            <li>
              <span>区域</span>
              <el-select v-model="areaId" filterable @change="getRegionId" placeholder="请选择">
                <el-option
                  v-for="item in regionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>区域管理员</span>
              <el-select v-model="adminUserId" filterable placeholder="请选择">
                <el-option
                  v-for="item in regionAdminUserList"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>图片上传</span>
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false">
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
              </el-upload>
            </li>
          </ul>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="riskDialogClose">取 消</el-button>
          <el-button type="primary" @click="riskDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { regionList, regionAdminList } from '@/api/user'
export default {
  data () {
    return {
      onLineRiskList: [],
      onLineRisk: '',
      // 主体
      tableData: [],
      // 分页
      pageSize: 10,
      pageNo: 1,
      total: '',
      keyword: '',
      // 编辑or添加弹窗
      riskDialog: false,
      isAdd: true,
      riskTitle: '',
      regionList: [],
      areaId: '',
      regionAdminUserList: [],
      adminUserId: '',
      adminUserName: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getriskList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getriskList()
    },
    add () {
      this.isAdd = true
      this.riskDialog = true
    },
    edit (item) {
      this.isAdd = false
      this.riskDialog = true
    },
    riskDialogClose () {},
    riskDialogConfirm () {},
    getriskList () {
      // riskList({
      //   pageNo: this.pageNo,
      //   pageSize: this.pageSize,
      //   keyword: this.keyword
      // })
      //   .then(res => {
      //     this.tableData = res.data.records
      //   })
    },
    // 获取区域列表
    getregionList () {
      regionList('')
        .then(res => {
          this.regionList = res.data
        })
    },
    getRegionId (id) {
      this.getRegionAdminList(id)
    },
    // 区域人管理员员列表
    getRegionAdminList (id) {
      regionAdminList({ areaId: id }).then(res => {
        this.regionAdminUserList = res.data
      })
    },
    // 上传
    handleRemove (file) {
      console.log(file)
    }
  },
  mounted () {
    this.getriskList()
    this.getregionList()
  }
}
</script>
<style lang="scss">
.risk {
  .risk-container {
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
