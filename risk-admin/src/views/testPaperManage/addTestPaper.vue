<template>
  <div class="addTestPaper">
    <ul class="addTestPaperBox">
      <li class="testPaperTitle">
        <span>试卷标题：</span>
        <el-input size="small" v-model="input" placeholder="请输入"></el-input>
      </li>
      <li class="testPaperType">
        <span>试卷类型：</span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
        </el-checkbox-group>
      </li>
      <li class="testPaperDate">
        <span>起止时间：</span>
        <el-date-picker
          size="small"
          v-model="dateRange"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </li>
      <li class="testPaperupload">
        <span>试题模板：</span>
        <!-- <el-button>下载模板</el-button> -->
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传</div>
        </el-upload>
      </li>
      <li class="testPaperButton">
        <el-button type="info" plain>重 置</el-button>
        <el-button type="success" plain>确 定</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      checkList: ['', '复选框 A'],
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
      dateRange: [],
      fileList: []
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
    }
  }
}
</script>
<style lang="scss">
.addTestPaper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .addTestPaperBox {
    height: 100%;
    margin-top: 30px;
    li {
      display: flex;
      align-items: center;
      margin-top: 10px;
      > span {}
      > .el-input {
        width: 220px;
        margin-left: 8px;
      }
      > .el-checkbox-group {
        margin-left: 8px;
      }
      > .el-range-editor {
        margin-left: 8px;
      }
    }
    .testPaperupload {
      align-items: flex-start;
      > .upload-demo {
        margin-left: 8px;
      }
    }
    .testPaperButton {
      margin-left: 20px;
      margin-top: 40px;
      .el-button {
        margin: 0 20px;
      }
    }
  }
}
</style>
