<template>
  <div class="taskAdd">
    <van-nav-bar title="新的工作" left-arrow @click-left="goHome"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="title" label="标题" clearable placeholder="请输入标题" />
      <van-field v-model="workLogNewDTO.remark" rows="3" autosize label="描述" type="textarea" placeholder="请输入描述" />
      <van-cell title="上传" class="vantUpload">
        <template #right-icon>
          <van-uploader  v-model="temUploadFile" :after-read="afterRead" :before-delete="delUpload" multiple />
        </template>
      </van-cell>
      <van-field label="指派给" v-model="nowHandleUserName" placeholder="请选择" @click="handleUsernameFlag = true" readonly />
      <van-popup v-model="handleUsernameFlag" position="bottom">
        <van-picker
          show-toolbar
          value-key="nickname"
          :columns="handleUsernameList"
          @confirm="handleUsernameConfirm"
          @cancel="handleUsernameFlag = false"
        />
      </van-popup>
    </van-cell-group>
    <div class="taskAddFood">
      <van-button plain type="info" size="small" @click="$router.push('/home')">取消</van-button>
      <van-button type="info" @click="onConfirm" size="small">提交</van-button>
    </div>
  </div>
</template>
<script>
import { apiUserlist, apiUploadFile, apiDelUploadFile, apiAddWork } from '@/services/api/taskManage'
export default {
  data () {
    return {
      title: '',
      workLogNewDTO: {
        endFlag: false,
        remark: '',
        workLogAttachmentNewDTO: {
          attachmentList: []
        },
        toUserId: '',
        toUserName: ''
      },
      fileList: [],
      temUploadFile: [],
      uploadFile: '',
      area: '',
      areaId: '',
      handleUsernameList: [],
      areaAdminUserList: [],
      nowHandleUserId: '',
      nowHandleUserName: '',
      handleUsernameFlag: false
    }
  },
  methods: {
    // 返回首页
    goHome () {
      this.$router.push('/taskManage')
    },
    // 上传文件
    afterRead (file) {
      const data = new FormData()
      data.append('file', file.file)
      file.status = 'uploading'
      file.message = '上传中...'
      apiUploadFile(data)
        .then(res => {
          if (res.code === 200) {
            file.status = 'done'
            file.message = '上传成功'
            let obj = {}
            obj.filepath = res.data.filepath
            obj.filename = res.data.filename
            obj.attachmentId = res.data.attachmentId
            this.workLogNewDTO.workLogAttachmentNewDTO.attachmentList.push(obj)
            this.fileList.push(res.data)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
        .catch(() => {
          file.status = 'failed'
          file.message = '上传失败'
        })
    },
    // 删除上传文件
    delUpload (file, detail) {
      if (file.status === 'done') {
        let attachmentId = this.riskLog.riskLogAttachment.attachmentList[detail.index].attachmentId
        apiDelUploadFile(attachmentId).then(res => {
          if (res.code === 200) {
            this.workLogNewDTO.workLogAttachmentNewDTO.attachmentList.splice(detail.index, 1)
            this.temUploadFile.splice(detail.index, 1)
          }
        })
      } else {
        // 只有上传失败的图片的情况下
        this.temUploadFile.splice(detail.index, 1)
      }
    },
    // 人员选择确认
    handleUsernameConfirm (val) {
      this.nowHandleUserName = val.nickname
      this.nowHandleUserId = val.userId
      this.handleUsernameFlag = false
    },
    // 验证
    checkFrom () {
      let titleTest = /^[\s\S]{6,12}$/
      if (!this.title) {
        this.$toast('标题不能为空')
        return false
      } else if (!titleTest.test(this.title)) {
        this.$toast('标题6个12字符')
        return false
      }
      if (!this.workLogNewDTO.remark) {
        this.$toast('描述不能为空')
        return false
      }
      // if (this.workLogNewDTO.workLogAttachmentNewDTO.length === 0) {
      //   this.$toast('还未上传内容')
      //   return false
      // }
      if (!this.nowHandleUserId) {
        this.$toast('请选择指派人')
        return false
      }
      return true
    },
    // 表单提交
    onConfirm () {
      if (this.checkFrom()) {
        this.workLogNewDTO.toUserId = this.nowHandleUserId
        this.workLogNewDTO.toUserName = this.nowHandleUserName
        apiAddWork({
          workLogNewDTO: this.workLogNewDTO,
          title: this.title
        })
          .then(res => {
            if (res.status === 200) {
              this.$router.push('/taskManage')
            }
          })
      }
    },
    // 获取区域列表
    gethandleUsernameList () {
      apiUserlist().then(res => {
        this.handleUsernameList = res.data
      })
    }
  },
  mounted () {
    this.gethandleUsernameList()
  }
}
</script>
<style lang="scss">
.taskAdd {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .van-cell-group {
    padding: 0 15px;
    .van-field {
      .van-cell__title {
        width: 4em;
        text-align: right;
      }
      .van-cell__value {
        padding: 5px;
        background: #eff2f2;
        border-radius: 5px;
      }
    }
    .vantUpload {
      .van-cell__title {
        flex: 0;
        text-align: right;
        margin-right: 12px;
        span {
          display: inline-block;
          width: 4em;
        }
      }
      .van-uploader {
        .van-uploader__wrapper {
          .van-uploader__preview {
            margin: 5px 1px;
            border: 1PX dashed #ccc;
            .van-uploader__preview-delete {
              .van-uploader__preview-delete-icon {
                top: -4px;
              }
            }
          }
          .van-uploader__upload {
            margin: 5px 1px;
            border: 1PX dashed #ccc;
          }
        }
      }
    }
  }
  .taskAddFood {
    margin-top: 20px;
    text-align: center;
    .van-button {
      margin: 0 10px;
      padding:  10px 20px;
      border-radius: 15px;
    }
    .van-button:first-child {
      color: #fff;
      background: #fe657d;
      border: 1PX solid #fe657d;
    }
  }
}
</style>
