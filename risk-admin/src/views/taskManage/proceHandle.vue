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
            :key="item.userId"
            :label="item.nickname"
            :value="item.userId"
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
            {{ scope.row.createdTime | formatReplace() }}
          </template>
        </el-table-column>
        <el-table-column
          prop="operateUserName"
          label="操作者"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="remark" label="操作说明">
        </el-table-column>
        <el-table-column label="用时">
          <template slot-scope="scope">
            {{ scope.row.intervalTime }}
          </template>
        </el-table-column>
        <el-table-column label="附件">
          <template slot-scope="scope">
            <div v-if="scope.row.workLogAttachmentList.length > 0" >
              <div v-for="(imgList, index) in scope.row.workLogAttachmentList" :key="index" @click="downUploadFile(imgList)">
                <span>{{ imgList.filename }}</span>
              </div>
            </div>
            <div v-else>暂无</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { apiDelUploadFile, apiWorkHandle, apiUserlist, apiWorkLog } from '@/api/taskManage'
import { success, error } from '@/utils/notice'
export default {
  data () {
    return {
      taskTitle: '',
      taskId: '',
      taskStatus: '',
      workLogAttachmentNewDTO: {
        attachmentList: []
      },
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
      return window.location.origin + '/kzhenyouapi/workLogAttachment/attachment'
    }
  },
  methods: {
    // 上传
    uploadSuccess (file) {
      this.workLogAttachmentNewDTO.attachmentList.push(file.data)
    },
    handleRemove (file) {
      apiDelUploadFile(file.response.data.attachmentId)
        .then(res => {
          if (res.code === 200) {
            this.workLogAttachmentNewDTO.attachmentList = this.workLogAttachmentNewDTO.attachmentList.filter(
              item => item.attachmentId * 1 !== file.response.data.attachmentId * 1
            )
          }
        })
        .catch(() => {})
    },
    // 下载附件
    downUploadFile (data) {
      // let token = window.localStorage.getItem('accessToken')
      // let HTP = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
      var url = 'http://123.57.161.229/zhenyou-file/' + data.filepath
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
      const arr = this.userList.filter(item => item.userId * 1 === this.toUserId * 1)
      this.toUserName = arr[0].nickname
    },
    handleConfirm () {
      apiWorkHandle(this.taskId, {
        workLogAttachmentNewDTO: this.workLogAttachmentNewDTO,
        endFlag: this.endFlag,
        remark: this.remark,
        toUserId: this.toUserId,
        toUserName: this.toUserName
      }).then(res => {
        if (res.code === 200) {
          success(res.msg)
          this.$router.replace('/taskManage/index')
        } else {
          error(res.response.data.message)
        }
      })
    },
    getUserList () {
      apiUserlist().then(res => {
        this.userList = res
      })
    },
    getWorkLog (id) {
      apiWorkLog(id).then(res => {
        this.tableData = res
        this.getTimeLength(res)
      })
    },
    chanegTimeStamp (arr1, arr2) {
      if (!arr1) return
      if (!arr2) return
      let newString1 = arr1.replace('T', ' ')
      let newString2 = arr2.replace('T', ' ')
      let usedTime = new Date(newString2).getTime() - new Date(newString1).getTime()
      let days = Math.floor(usedTime / (24 * 3600 * 1000)) // 计算出天数
      let leavel = usedTime % (24 * 3600 * 1000) // 计算天数后剩余的时间
      let hours = Math.floor(leavel / (3600 * 1000)) // 计算剩余的小时数
      let leavel2 = leavel % (3600 * 1000) // 计算剩余小时后剩余的毫秒数
      let minutes = Math.floor(leavel2 / (60 * 1000)) // 计算剩余的分钟数
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
      for (let i = data.length - 1; i >= 0; i--) {
        if (i + 1 === data.length) {
          if (data[i].createdTime) {
            data[i].intervalTime = '开始'
          }
        } else {
          if (data[i].createdTime && data[i + 1].createdTime) {
            data[i].intervalTime = '用时：' + this.chanegTimeStamp(data[i + 1].createdTime, data[i].createdTime)
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
  padding: 20px;
  h2 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
  }
  .proceHandleContent {
    margin-left: 20px;
    li {
      display: flex;
      margin-bottom: 10px;
      > span {
        display: inline-block;
        width: 120px;
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
