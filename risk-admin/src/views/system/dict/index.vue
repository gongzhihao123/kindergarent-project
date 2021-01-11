<template>
  <div class="dict">
    <!-- <div class="dict-head">
      <el-button size="mini" type="primary" icon="el-icon-plus">添加</el-button>
      <div class="dict-handle">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable>
        </el-input>
        <el-button size="mini" type="primary" icon="el-icon-search">
          搜索
        </el-button>
      </div>
    </div> -->
    <div class="dict-content">
      <div class="dictTable1 el-col el-col-22 el-col-xs-22 el-col-sm-22 el-col-md-9 el-col-lg-9 el-col-xl-9">
        <div class="dict-head">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addDict">添加</el-button>
          <div class="dict-handle">
            <el-input
              placeholder="请输入内容"
              size="mini"
              v-model="input"
              clearable>
            </el-input>
            <el-button size="mini" type="primary" icon="el-icon-search">
              搜索
            </el-button>
          </div>
        </div>
        <el-table
          :data="dictList"
          @row-click="clickDict"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名字">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click.native.stop="edit(scope.row)" type="primary">编辑</el-button>
              <el-button size="mini" @click.native.stop="delDict(scope.row)"  type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="current"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <!-- 字典详情 -->
      <div class="dictTable2 el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-14 el-col-lg-13 el-col-xl-13">
        <div class="dict-head">
          <div class="dict-handle">字典详情<span v-show="this.dictName"> / {{this.dictName}}</span></div>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="addDictDetail">添加</el-button>
        </div>
        <el-table
          :data="dictDetail"
          style="width: 100%">
          <el-table-column
            label="名字">
            <template>
              <span>{{ this.dictName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="label"
            label="字典标签">
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button size="mini" @click.native.stop="editDictDetail(scope.row)" type="primary">编辑</el-button>
              <el-button size="mini" @click.native.stop="delDictDetail(scope.row)"  type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="detailHandleCurrentChange"
          :current-page.sync="detailCurrent"
          :page-size="detailPageSize"
          layout="prev, pager, next, jumper"
          :total="detailTotal">
        </el-pagination>
        <el-dialog
          :title="detailHandleType * 1 === 1 ? '新增字典详情' : '修改字典详情'"
          :visible.sync="dictDetailFlag"
          width="30%"
          :before-close="() => {}"
          >
          <span>
            <el-form :model="detailRuleForm" :rules="dictDetailRules" ref="dictDetail" label-width="100px" class="demo-ruleForm">
              <el-form-item label="字典标签" prop="label">
                <el-input v-model="detailRuleForm.label"></el-input>
              </el-form-item>
              <el-form-item label="字典值" prop="value">
                <el-input v-model="detailRuleForm.value"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="sort">
                <el-input type="number" min="0" v-model="detailRuleForm.sort"></el-input>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="detailCancle">取 消</el-button>
            <el-button type="primary" @click="dictDetailConfirm">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <el-dialog
      :title="handleType * 1 === 1 ? '新增字典' : '修改字典'"
      :visible.sync="dictFlag"
      width="30%"
      :before-close="() => {}"
      >
      <span>
        <el-form :model="ruleForm" :rules="rules" ref="dict" label-width="100px" class="demo-ruleForm">
          <el-form-item label="字典名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { dictList, apiAddDict, apiDelDict, apiEditDict, dictDetailList, apiAddDictDetail, apiDelDictDetail, apiEditDictDetail } from '@/api/user'
import { success, error } from '@/utils/notice'
export default {
  data () {
    return {
      current: 1,
      pageSize: 7,
      total: '',
      handleType: 1,
      dictList: [],
      dictId: '',
      dictName: '',
      dictFlag: false,
      ruleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 字典详情
      dictDetail: [],
      dictDetailFlag: false,
      detailHandleType: 1,
      detailRuleForm: {
        label: '',
        value: '',
        sort: ''
      },
      dictDetailRules: {
        label: [
          { required: true, message: '请输入字典标签', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请输入字典值', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ]
      },
      detailCurrent: 1,
      detailPageSize: 7,
      detailTotal: ''
    }
  },
  methods: {
    // 添加字典
    async addDict () {
      this.handleType = 1
      this.dictFlag = true
      this.ruleForm = {}
    },
    // 删除字典
    delDict (row) {
      apiDelDict(row.dictId).then(res => {
        success(res.msg)
        this.getDictList()
      })
        .catch(res => {
          error(res.msg)
        })
    },
    // 修改字典
    edit (row) {
      this.handleType = 2
      this.dictFlag = true
      this.ruleForm.name = row.name
      this.ruleForm.description = row.description
      this.ruleForm.dictId = row.dictId
    },
    // 获取字典列表
    getDictList () {
      dictList(this.current, this.pageSize).then(res => {
        this.dictList = res.data.records
        this.current = res.data.current
        this.pageSize = res.data.size
        this.total = res.data.total
      })
    },
    // 提交
    submitForm () {
      this.$refs['dict'].validate((valid) => {
        if (valid) {
          if (this.handleType * 1 === 1) {
            // 添加
            apiAddDict(this.ruleForm).then(res => {
              this.dictFlag = false
              success(res.data)
              this.getDictList()
            })
          } else {
            // 修改
            apiEditDict(this.ruleForm).then(res => {
              this.dictFlag = false
              success(res.data)
              this.getDictList()
            })
          }
        } else {
          return false
        }
      })
    },
    // 取消
    cancle () {
      this.$refs['dict'].resetFields()
      this.dictFlag = false
    },
    // 分页
    handleCurrentChange (val) {
      this.current = val
      this.getDictList()
    },
    // 获取字典详情
    async clickDict (row) {
      this.dictId = row.dictId
      this.dictName = row.name
      await this.getDictDetail()
    },
    /**
     * 字典详情部分
     */
    addDictDetail () {
      this.detailHandleType = 1
      this.dictDetailFlag = true
      this.detailRuleForm = {}
    },
    delDictDetail (row) {
      apiDelDictDetail(row.dictDetailId).then(res => {
        success(res.msg)
        this.getDictDetail()
      })
        .catch(res => {
          error(res.msg)
        })
    },
    editDictDetail (row) {
      this.detailHandleType = 2
      this.detailRuleForm.dictDetailId = row.dictDetailId
      this.detailRuleForm.dictId = row.dictId
      this.detailRuleForm.label = row.label
      this.detailRuleForm.sort = row.sort
      this.detailRuleForm.value = row.value
      this.dictDetailFlag = true
    },
    getDictDetail () {
      dictDetailList(this.dictId, this.detailCurrent, this.detailPageSize).then(res => {
        this.dictDetail = res.data.records
        this.detailCurrent = res.data.current
        this.detailPageSize = res.data.size
        this.detailTotal = res.data.total
      })
    },
    detailCancle () {
      this.$refs['dictDetail'].resetFields()
      this.dictDetailFlag = false
    },
    dictDetailConfirm () {
      this.$refs['dictDetail'].validate((valid) => {
        if (valid) {
          this.detailRuleForm.dictId = this.dictId
          if (this.detailHandleType * 1 === 1) {
            // 添加
            apiAddDictDetail(this.detailRuleForm).then(res => {
              this.dictDetailFlag = false
              success(res.data)
              this.getDictDetail()
            })
          } else {
            // 修改
            apiEditDictDetail(this.detailRuleForm).then(res => {
              this.dictDetailFlag = false
              success(res.data)
              this.getDictDetail()
            })
          }
        } else {
          return false
        }
      })
    },
    detailHandleCurrentChange (val) {
      this.detailCurrent = val
      this.getDictDetail()
    }
  },
  mounted () {
    this.getDictList()
  }
}
</script>
<style lang="scss">
.dict {
  padding: 10px;
  .dict-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .dict-handle {
      display: flex;
      align-items: center;
      > .el-button {
        margin-left: 10px;
      }
      > span {
        display: contents;
      }
    }
  }
  .dict-content {
    .dictTable1 {
      margin: 4px;
      padding: 10px;
      border: 1px solid #e6ebf5;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .dictTable2 {
      margin: 4px;
      padding: 10px;
      border: 1px solid #e6ebf5;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .el-table {
      .el-table__body {}
    }
    .el-pagination {
      margin: 20px 0;
      text-align: center;
    }
  }
}
</style>
