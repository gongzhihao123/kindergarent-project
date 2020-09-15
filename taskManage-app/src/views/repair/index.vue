<template>
  <div class="repair">
    <van-nav-bar title="报修新隐患" left-arrow @click-left="goHome"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="title" label="标题" clearable placeholder="请输入标题" />
      <van-field v-model="newWorkLogDto.remark" rows="3" autosize label="描述" type="textarea" placeholder="请输入描述" />
      <van-cell title="上传" class="vantUpload">
        <template #right-icon>
          <van-uploader  v-model="temUploadFile" :after-read="afterRead" :before-delete="delUpload" multiple />
        </template>
      </van-cell>
      <van-field label="指派给" v-model="nowHandleUserName" placeholder="请选择" @click="handleUsernameFlag = true" readonly />
      <van-popup v-model="handleUsernameFlag" position="bottom">
        <van-picker
          show-toolbar
          value-key="nickName"
          :columns="handleUsernameList"
          @confirm="handleUsernameConfirm"
          @cancel="handleUsernameFlag = false"
        />
      </van-popup>
    </van-cell-group>
    <div class="repairFood">
      <van-button plain type="info" size="small" @click="$router.push('/home')">取消</van-button>
      <van-button type="info" @click="onConfirm" size="small">提交</van-button>
    </div>
  </div>
</template>
<script>
import { apiUserlist, apiUploadFile, apiAddWork } from '@/services/api/index'
export default {
  data () {
    return {
      title: '',
      newWorkLogDto: {
        remark: '',
        attachmentList: []
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
      this.$router.push('/home')
    },
    // 上传文件
    afterRead (file) {
      const data = new FormData()
      data.append('file', file.file)
      file.status = 'uploading'
      file.message = '上传中...'
      apiUploadFile(data)
        .then(res => {
          if (res.resultCode === 1) {
            file.status = 'done'
            file.message = '上传成功'
            let obj = {}
            obj.filepath = res.filepath
            obj.filename = res.filename
            this.newWorkLogDto.attachmentList.push(obj)
            this.fileList.push(res)
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
      this.newWorkLogDto.attachmentList.splice(detail.index, 1)
      this.temUploadFile.splice(detail.index, 1)
    },
    // 人员选择确认
    handleUsernameConfirm (val) {
      this.nowHandleUserName = val.nickName
      this.nowHandleUserId = val.id
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
      if (!this.newWorkLogDto.remark) {
        this.$toast('描述不能为空')
        return false
      }
      if (this.newWorkLogDto.attachmentList.length === 0) {
        this.$toast('还未上传内容')
        return false
      }
      if (!this.nowHandleUserId) {
        this.$toast('请选择指派人')
        return false
      }
      return true
    },
    // 表单提交
    onConfirm () {
      if (this.checkFrom()) {
        apiAddWork({
          nowUserId: this.nowHandleUserId,
          nowUserName: this.nowHandleUserName,
          newWorkLogDto: this.newWorkLogDto,
          title: this.title
        })
          .then(res => {
            if (res.status === 201) {
              this.$router.push('/home')
            }
          })
      }
    },
    // 获取区域列表
    gethandleUsernameList () {
      apiUserlist().then(res => {
        this.handleUsernameList = res
      })
    }
  },
  mounted () {
    this.gethandleUsernameList()
  }
}
</script>
<style lang="scss">
.repair {
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
  .repairFood {
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
