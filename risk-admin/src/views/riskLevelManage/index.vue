<template>
  <div class="riskLevel">
    <div class="riskLevelContent" v-loading="loading">
      <div class="handleButton">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添 加</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="name"
          label="等级名称">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)"  type="primary" size="small">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="del(scope.row)">
              <el-button :disabled="scope.row.publishFlag" slot="reference" type="danger" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="total"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 弹窗 -->
      <el-dialog
        :title="isAddRiskLevel ? '添加区角' : '编辑区角'"
        :visible.sync="riskLevelDialog"
        width="630px"
        :before-close="handleClose">
        <span>
          <el-form :model="riskLevel" :rules="riskLevelRules" ref="riskLevel" size="small" label-width="130px" class="demo-ruleForm">
            <el-row>
              <el-col :span="20">
                <el-form-item label="等级名称" prop="name">
                  <el-input v-model="riskLevel.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="所属主任" prop="manageUserId">
                  <el-select
                    v-model="riskLevel.manageUserId"
                    placeholder="请选择">
                    <el-option
                      v-for="item in directorList"
                      :key="item.userId"
                      :label="item.nickname"
                      :value="item.userId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="handleClose" size="small">取 消</el-button>
          <el-button type="primary" @click="onSubmit" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { success, error } from '@/utils/notice'
import { riskLevelList, riskLevelManageList, addRiskLevel, delRiskLevel, editRiskLevel } from '@/api/risk/index'
export default {
  data () {
    return {
      loading: false,
      tableData: [],
      directorList: [],
      // 弹窗
      isAddRiskLevel: true,
      riskLevelDialog: false,
      riskLevel: {
        name: '',
        manageUserId: '',
        riskLevelId: ''
      },
      riskLevelRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        manageUserId: [
          { required: true, message: '请选择' }
        ]
      }
    }
  },
  methods: {
    del (val) {
      delRiskLevel(val.riskLevelId).then(res => {
        success(res.msg)
        this.getRiskLevelList()
      })
        .catch(err => {
          error(err.msg)
        })
    },
    add () {
      this.riskLevel.name = ''
      this.isAddRiskLevel = true
      this.riskLevelDialog = true
    },
    edit (val) {
      this.riskLevel.name = val.name
      this.riskLevel.manageUserId = val.manageUserId
      this.riskLevel.riskLevelId = val.riskLevelId
      this.isAddRiskLevel = false
      this.riskLevelDialog = true
    },
    handleCurrentChange (val) {
      this.current = val
      this.getRiskLevelList()
    },
    onSubmit () {
      if (this.isAddRiskLevel) {
        // 添加
        this.$refs['riskLevel'].validate((valid) => {
          if (valid) {
            addRiskLevel(this.riskLevel).then(res => {
              success(res.msg)
              this.getRiskLevelList()
              this.riskLevelDialog = false
            })
              .catch(err => {
                error(err.msg)
              })
          } else {
            return false
          }
        })
      } else {
        // 编辑
        this.$refs['riskLevel'].validate((valid) => {
          if (valid) {
            editRiskLevel(this.riskLevel).then(res => {
              success(res.msg)
              this.getRiskLevelList()
              this.riskLevelDialog = false
            })
              .catch(err => {
                error(err.msg)
              })
          } else {
            return false
          }
        })
      }
    },
    handleClose () {
      this.riskLevel = {
        name: '',
        manageUserId: ''
      }
      this.$refs['riskLevel'].resetFields()
      this.riskLevelDialog = false
    },
    // 获取主任列表
    getRiskLevelManageList () {
      riskLevelManageList().then(res => {
        this.directorList = res.data
      })
    },
    getRiskLevelList () {
      this.loading = false
      riskLevelList().then(res => {
        this.tableData = res.data
        this.loading = false
      })
        .catch(err => {
          error(err.msg)
        })
    }
  },
  created () {
    this.getRiskLevelList()
    this.getRiskLevelManageList()
  }
}
</script>
<style lang="scss" scoped>
.riskLevel {
  padding: 12px;
  .riskLevelContent {
    .handleButton {
      margin-bottom: 20px;
    }
    .el-table {
      .cell {
        > span {
          margin-left: 10px;
        }
      }
    }
    .el-pagination {
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
