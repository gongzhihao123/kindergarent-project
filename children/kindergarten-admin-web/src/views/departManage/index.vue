/* eslint-disable import/no-duplicates */
<template>
  <div class="departManage">
    <div class="departManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加部门</el-button>
          <el-select size="small" v-model="onLineDepart" clearable placeholder="请选择">
            <el-option
              v-for="item in onLineDepartList"
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
          ref="table"
          :data="tableData"
          row-key="id"
          lazy
          :load="getDeptDatas"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="sort"
            label="序号">
          </el-table-column>
          <el-table-column label="状态" align="center" prop="enableFlag">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enableFlag"
                :disabled="scope.row.id === 1"
                active-color="#409EFF"
                inactive-color="#F56C6C"
                @change.stop="changeEnabled(scope.row, scope.row.enableFlag)"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建日期">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | changeDateFormat() }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click.native.stop="edit(scope.row)">编辑</el-button>
              <el-popconfirm title="您确定要删除此项目吗？" @onConfirm='delDeptConfirm(scope.row.id)'>
                <el-button slot="reference" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-pagination
        v-if="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
      <el-dialog
        :title="isAdd ? '添加部门' : '编辑部门'"
        :visible.sync="departDialog"
        width="30%"
        :before-close="departDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" inline ref="ruleForm" label-width="100px">
            <el-form-item label="部门名称">
              <el-input v-model="ruleForm.name" style="width: 370px;" />
            </el-form-item>
            <el-form-item label="部门排序">
              <el-input-number
                v-model.number="ruleForm.sort"
                :min="0"
                :max="999"
                controls-position="right"
                style="width: 370px;"
              />
            </el-form-item>
            <el-form-item label="顶级部门">
              <el-radio-group v-model="ruleForm.isTop" style="width: 140px">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="enableFlag">
              <el-radio v-for="item in enabledTypeOptions" :key="item.id" v-model="ruleForm.enableFlag" :label="item.key">{{ item.display_name }}</el-radio>
            </el-form-item>
            <el-form-item v-if="ruleForm.isTop === '0'" style="margin-bottom: 0;" label="上级部门" prop="pid">
              <treeselect
                v-model="ruleForm.pid"
                :options="depts"
                :load-options="loadDepts"
                :normalizer="normalizer"
                style="width: 370px;"
                placeholder="选择上级类目"
              />
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="departDialogClose">取 消</el-button>
          <el-button type="primary" @click="departDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addDept, deptList, editDept, delDept } from '@/api/dept'
import Treeselect, { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  data () {
    return {
      onLineDepartList: [],
      onLineDepart: '',
      // 主体
      tableData: [],
      // 分页
      keyword: '',
      // pageSize: 10,
      // pageNo: 1,
      // total: '',
      // 编辑or添加弹窗
      departDialog: false,
      isAdd: true,
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
        ]
      },
      enabledTypeOptions: [
        { key: true, display_name: '正常' },
        { key: false, display_name: '禁用' }
      ],
      depts: []
    }
  },
  components: {
    Treeselect
  },
  methods: {
    // tree 方法
    // tree数据格式化
    getDeptDatas (tree, treeNode, resolve) {
      const params = { pid: tree.id }
      setTimeout(() => {
        deptList(params).then(res => {
          let treeList = res.data
          treeList.forEach((item) => {
            item.hasChildren = true
          })
          resolve(treeList)
        })
      }, 100)
    },
    // 新增与编辑前做的操作
    getTreeList (form) {
      if (form.pid !== null) {
        form.isTop = '0'
      } else if (form.id !== null) {
        form.isTop = '1'
      }
      form.enableFlag = `${form.enableFlag}`
      if (form.id != null) {
        this.getSupDepts(form.id)
      } else {
        this.getDepts()
      }
    },
    getSupDepts (id) {
      deptList().then(res => {
        const date = res.data
        this.buildDepts(date)
        this.depts = date
      })
    },
    buildDepts (depts) {
      depts.forEach(data => {
        if (data.children) {
          this.buildDepts(data.children)
        }
        if (!data.children) {
          data.children = null
        }
      })
    },
    getDepts () {
      deptList().then(res => {
        this.depts = res.data.map(function (obj) {
          // if (obj.hasChildren) {
          obj.children = null
          // }
          return obj
        })
      })
    },
    // 获取弹窗内部门数据
    loadDepts ({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        deptList({ pid: parentNode.id }).then(res => {
          parentNode.children = res.data.map(function (obj) {
            if (obj.hasChildren) {
              obj.children = null
              obj.hasChildren = true
            }
            return obj
          })
          setTimeout(() => {
            callback()
          }, 100)
        })
      }
    },
    normalizer (node) {
      // 去掉children=[]的children属性
      // if (node.child == null || node.child.length === 0) {
      //   delete node.child
      // }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    },
    add () {
      this.getDepts()
      this.isAdd = true
      this.departDialog = true
    },
    edit (item) {
      this.getTreeList(item)
      this.ruleForm = item
      this.isAdd = false
      this.departDialog = true
      // editDept()
    },
    // 改变状态
    changeEnabled (data, val) {
      console.log('asdas')
      this.$confirm('此操作将 "' + this.dict.label.enabledTypeOptions[val] + '" ' + data.name + '部门, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editDept(data).then(res => {
          // this.crud.notify(this.dict.label.dept_status[val] + '成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          console.log(val)
        }).catch(err => {
          data.enableFlag = !data.enableFlag
          console.log(err.response.data.message)
        })
      }).catch(() => {
        data.enableFlag = !data.enableFlag
      })
    },
    // 重置弹窗内容
    departDialogClose () {
      this.departDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    // 弹窗内容提交
    departDialogConfirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addDept(this.ruleForm).then(res => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
            this.getdepartList()
          })
            .catch((err) => {
              this.$notify.error({
                title: '错误',
                message: '操作失败,' + err.response.data.message
              })
            })
          this.departDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除部门
    delDeptConfirm (id) {
      delDept(id).then(res => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success'
        })
        this.getdepartList()
      })
        .catch(() => {
          this.$notify.error({
            title: '错误',
            message: '操作失败'
          })
        })
    },
    getdepartList () {
      deptList({
        pid: this.pid,
        keyword: this.keyword
      })
        .then(res => {
          this.tableData = res.data.map(item => {
            item.hasChildren = true
            return item
          })
        })
    }
  },
  mounted () {
    this.getdepartList()
  }
}
</script>
<style lang="scss">
.departManage {
  .departManage-container {
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
              // text-align: center;
            }
          }
        }
        td {
          // text-align: center;
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
<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
