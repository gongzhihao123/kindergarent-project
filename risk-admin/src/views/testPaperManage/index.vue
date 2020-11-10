<template>
  <div class="testPaperManage">
    <div class="testPaperManage-container">
      <!-- 搜索表头 -->
      <el-row>
        <el-col>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加试卷</el-button>
          <el-button type="primary" icon="el-icon-download" size="mini" @click="add">下载模板</el-button>
        </el-col>
        <el-select size="small" v-model="onLinetestPaper" clearable placeholder="请选择">
          <el-option
            v-for="item in onLinetestPaperList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
              <el-button size="mini" type="primary" icon="el-icon-s-data" @click="edit(scope.row)">查看统计</el-button>
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
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        size="small"
        :title="isAdd ? '添加试卷' : '编辑试卷'"
        :visible.sync="testPaperDialog"
        width="30%"
        :before-close="testPaperDialogClose">
        <span>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="100px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title" auto-complete="on" style="width: 310px;"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
               <el-radio-group v-model="ruleForm.type">
                <el-radio label="1">公务员</el-radio>
                <el-radio label="2">事业编</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="考试时间" prop="examTime">
              <el-input placeholder="请输入内容" style="width: 310px;"  v-model.number="ruleForm.examTime">
                <template slot="append">分钟</template>
              </el-input>
            </el-form-item>
            <el-form-item label="起止时间" prop="dateTime">
              <el-date-picker
                v-model="ruleForm.dateTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                align="right"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="模板" prop="region">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <div></div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="testPaperDialogClose" size="small">取 消</el-button>
          <el-button type="primary" @click="testPaperDialogConfirm" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        size="small"
        title="试卷详情"
        :visible.sync="testDetailFlag"
        width="30%"
        :before-close="testDetailClose">
        <div class="testPaperDetail">
          <div class="testPaperDetailInfo">
            <h2>标题</h2>
            <dl>
              <dt>起止时间：2020-08-14 12:12:12 -- 2020-08-14 12:12:12</dt>
              <dd>类型：公务员</dd>
            </dl>
          </div>
          <el-table
            :data="detailList"
            border
            style="width: 100%; margin-top: 10px">
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="testDetailClose" size="small">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      onLinetestPaperList: [],
      onLinetestPaper: '',
      // 主体
      tableData: [
        { id: 1, name: 'asd' }
      ],
      // 分页
      currentPage: 1,
      pageSize: 10,
      pageNo: 1,
      total: '',
      // 编辑or添加弹窗
      testPaperDialog: false,
      isAdd: true,
      ruleForm: {
        title: '',
        type: '1',
        examTime: '',
        dateTime: [],
        fileList: ''
      },
      rules: {
        title: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        examTime: [
          { required: true, message: '时间不能为空', trigger: 'blur' },
          { type: 'number', message: '时间必须为数字值' }
        ],
        dateTime: [
          { required: true, message: '起止日期不能为空', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      fileList: [],
      // 查看试卷详情
      testDetailFlag: false,
      detailList: []
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.gettestPaperList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.gettestPaperList()
    },
    add () {
      this.isAdd = true
      this.testPaperDialog = true
    },
    edit (item) {
      this.testDetailFlag = true
    },
    testPaperDialogClose () {
      this.testPaperDialog = false
      this.$refs['ruleForm'].resetFields()
      this.ruleForm = {}
    },
    testPaperDialogConfirm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.testPaperDialog = false
    },
    // 弹窗--上传
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 试卷详情--关闭
    testDetailClose () {
      this.testDetailFlag = false
    }
  }
}
</script>
<style lang="scss">
.testPaperManage {
  .testPaperManage-container {
    padding: 12px;
    background: #fff;
    .el-row {
      display: flex;
      justify-content: space-between;
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
    // 弹窗
    .el-dialog__wrapper {
      .el-dialog {
        min-width: 580px;
        .el-dialog__body {
          .testPaperDetail {
            margin-top: -25px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .testPaperDetailInfo {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              h2 {
                font-size: 16px;
                margin-bottom: 10px;
              }
              dl {
                width: 100%;
                display: flex;
                // flex-direction: column;
                justify-content: center;
                dt {
                  margin: 0 10px 0 -10px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
