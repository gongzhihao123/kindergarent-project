<template>
  <div class="proceHandle">
    <h2>{{ taskTitle }}</h2>
    <ul class="proceHandleContent" v-if="taskStatus * 1 === 1">
      <li>
        <span>任务处理：</span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="remark"
        >
        </el-input>
      </li>
      <li>
        <span>附件：</span>
        <el-upload
          class="upload-demo"
          :action="uploadPath"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          multiple
          :limit="3"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </li>
      <li>
        <span>是否结束任务：</span>
        <el-radio-group v-model="endFlag">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </li>
      <li v-if="!endFlag">
        <span>指派给：</span>
        <el-select
          v-model="toUserId"
          clearable
          size="small"
          @change="userChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.nickName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </li>
      <el-button type="primary" @click="handleConfirm">提交</el-button>
    </ul>
    <div class="proceTable">
      <h1>任务记录：</h1>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column label="时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.workLog.createTime | changeDateFormat() }}
          </template>
        </el-table-column>
        <el-table-column
          prop="workLog.operateUserName"
          label="操作者"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="workLog.remark" label="操作说明">
        </el-table-column>
        <el-table-column label="用时">
          <template slot-scope="scope">
            {{ scope.row.workLog.intervalTime }}
          </template>
        </el-table-column>
        <el-table-column label="附件">
          <template slot-scope="scope">
            <div
              v-for="imgList in scope.row.workLogAttachmentList"
              :key="imgList.id"
            >
              <div v-if="imgList.filepath" @click="downUploadFile(imgList)">
                <img src="" alt="" /><span>{{ imgList.filename }}</span>
              </div>
              <div v-else>暂无</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import api from '@/api/user'
export default {
  data () {
    return {
      taskTitle: '',
      taskId: '',
      taskStatus: '',
      attachmentList: [],
      endFlag: true,
      remark: '',
      toUserId: '',
      toUserName: '',
      userList: [],
      fileList: [],
      tableData: []
    }
  },
  computed: {
    uploadPath () {
      return window.location.origin + '/platform/workLogAttachment/attachment'
    }
  },
  methods: {
    // 上传
    uploadSuccess (file) {
      const obj = {}
      obj.filepath = file.filepath
      obj.filename = file.filename
      this.attachmentList.push(obj)
    },
    handleRemove (file) {
      api.apiDelUploadFile({ filepath: file.response.filepath })
        .then(res => {
          if (res.status === 202) {
            this.attachmentList = this.attachmentList.filter(item => item.filepath !== file.response.filepath)
          }
        })
        .catch(() => {})
    },
    // 下载附件
    downUploadFile (data) {
      // let token = window.localStorage.getItem('accessToken')
      // let HTP = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
      var url = 'http://39.104.113.97' + '/static/' + data.filepath
      // window.location.href = url
      var xhr = new XMLHttpRequest()
      // GET请求,请求路径url,async(是否异步)
      xhr.open('GET', url, true)
      // 设置请求头参数的方式,如果没有可忽略此行代码
      // xhr.setRequestHeader('Authorization', token)
      // 设置响应类型为 blob
      xhr.responseType = 'blob'
      // 关键部分
      xhr.onload = function () {
        // 如果请求执行成功
        if (this.status * 1 === 200) {
          var blob = this.response
          var filename = data.filename // 这个名字可以自定义或者根据后端的返回值设置
          var a = document.createElement('a') // 创建一个`a`标签
          // blob.type = "application/octet-stream"; //如果类型是这个就可以不同设置 // 创键临时url对象
          var url = URL.createObjectURL(blob)
          a.href = url
          a.download = filename
          a.click()
          // 释放之前创建的URL对象
          window.URL.revokeObjectURL(url)
        }
      }
      // 发送请求
      xhr.send()
    },
    // 选择指派人
    userChange () {
      const arr = this.userList.filter(item => item.id * 1 === this.toUserId * 1)
      this.toUserName = arr[0].nickName
    },
    handleConfirm () {
      api.apiWorkHandle(this.taskId, {
        attachmentList: this.attachmentList,
        endFlag: this.endFlag,
        remark: this.remark,
        toUserId: this.toUserId,
        toUserName: this.toUserName
      }).then(res => {
        if (res.status === 201) {
          this.$router.replace('/procedureManage')
        } else {
          console.log(res.response)
        }
      })
    },
    getUserList () {
      api.apiUserlist().then(res => {
        this.userList = res
      })
    },
    getWorkLog (id) {
      api.apiWorkLog(id).then(res => {
        this.tableData = res
        this.getTimeLength(res)
      })
    },
    chanegTimeStamp (arr1, arr2) {
      if (!arr1) return
      if (!arr2) return
      const newString1 =
        arr1[0] +
        '-' +
        arr1[1] +
        '-' +
        arr1[2] +
        ' ' +
        arr1[3] +
        ':' +
        arr1[4] +
        ':' +
        arr1[5]
      const newString2 =
        arr2[0] +
        '-' +
        arr2[1] +
        '-' +
        arr2[2] +
        ' ' +
        arr2[3] +
        ':' +
        arr2[4] +
        ':' +
        arr2[5]
      const usedTime =
        new Date(newString2).getTime() - new Date(newString1).getTime()
      const days = Math.floor(usedTime / (24 * 3600 * 1000)) // 计算出天数
      const leavel = usedTime % (24 * 3600 * 1000) // 计算天数后剩余的时间
      const hours = Math.floor(leavel / (3600 * 1000)) // 计算剩余的小时数
      const leavel2 = leavel % (3600 * 1000) // 计算剩余小时后剩余的毫秒数
      const minutes = Math.floor(leavel2 / (60 * 1000)) // 计算剩余的分钟数
      var leave3 = leavel2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      // eslint-disable-next-line use-isnan
      if (seconds === 'undefined' || seconds === NaN) {
        seconds = '00'
      }
      // return days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"
      if (days * 1 > 0) {
        // 有天数
        return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
      } else {
        // 没有天数
        if (hours > 0) {
          // 有小时
          return hours + '小时' + minutes + '分钟' + seconds + '秒'
        } else {
          // 没有小时
          if (minutes > 0) {
            // 有分钟
            return minutes + '分钟' + seconds + '秒'
          } else {
            // 没有分钟
            return seconds + '秒'
          }
        }
      }
    },
    getTimeLength (data) {
      for (let i = 0; i < data.length; i++) {
        if (i * 1 === 0) {
          if (data[i].workLog !== 'undefined' && data[i].workLog) {
            data[i].workLog.intervalTime = '-'
          }
        }
        if (i * 1 > 1 || i * 1 === 1) {
          if (
            data[i].workLog !== 'undefined' &&
            data[i].workLog &&
            data[i - 1].workLog !== 'undefined' &&
            data[i - 1].workLog
          ) {
            data[i].workLog.intervalTime = this.chanegTimeStamp(
              data[i - 1].workLog.createTime,
              data[i].workLog.createTime
            )
          }
        }
      }
    }
  },
  mounted () {
    this.taskTitle = this.$route.query.taskTitle
    this.taskId = this.$route.query.taskId
    this.taskStatus = this.$route.query.type
    this.getUserList()
    this.getWorkLog(this.taskId)
  }
}
</script>
<style lang="scss">
.proceHandle {
  margin: 70px 0 0 230px;
  padding: 30px 20px;
  h2 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
  }
  .proceHandleContent {
    li {
      display: flex;
      margin-bottom: 10px;
      > span {
        display: inline-block;
        width: 110px;
        text-align: right;
      }
      > .el-textarea {
        width: 500px;
      }
    }
    > .el-button {
      margin: 30px 0 0 100px;
    }
  }
  .proceTable {
    h1 {
      margin: 10px 0;
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
