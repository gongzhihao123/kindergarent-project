<template>
  <div class="taskHandle">
    <van-nav-bar :title="title" fixed placeholder left-arrow @click-left="goBack"></van-nav-bar>
    <div class="taskHandleContent">
      <ul v-if="!isShowCurrentPeople">
        <li>
          <van-field v-model="remark" rows="3" autosize type="textarea" placeholder="请补充说明" />
          <p>
            <!-- <span></span> -->
            <van-uploader v-model="fileList" :after-read="afterRead" accept=".pdf,.PDF,.txt,.TXT,.doc,.DOC,.docx,.XLS, image/*" :before-delete="delUpload" />
          </p>
        </li>
        <li class="isChangeDeclare">
          <van-checkbox v-model="endFlag">是否完结</van-checkbox>
          <van-field v-if="!endFlag" label="指派给" placeholder="点击选择" v-model="declared" readonly @click="declaredPicker = true" />
          <van-popup v-model="declaredPicker" position="bottom">
            <van-picker
              show-toolbar
              value-key="nickname"
              :columns="declaredList"
              @confirm="declaredConfirm"
              @cancel="declaredPicker = false"
            />
          </van-popup>
        </li>
        <li class="confirmbutton">
          <van-button type="info" size="small" @click="handleConfirm">提 交</van-button>
        </li>
      </ul>
      <h2>当前处理人：<span>{{ nowUserName ? nowUserName : '无' }}</span></h2>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in workList" :key="index">
          <h3>
            {{ item.operateUserName }}：{{ item.createdTime | formatReplace }} <span v-if="item.createdTime">({{ item.intervalTime }})</span>
          </h3>
          <div class="logContent">
            <div v-if="item.workLogAttachmentList.length > 0" style="display: flex; flex-wrap: wrap;">
              <div class="imgBox" v-for=" (imgList, index) in item.workLogAttachmentList " :key="index">
                <div v-if="imgList.filename" class="fileBox" @click="downUploadFile(imgList)">
                  <span style="color: #576B95;">{{ imgList.filename }}</span>
                </div>
              </div>
            </div>
            <p>{{ item.remark }}</p>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>
<script>
import { apiWorkHandle, apiUserlist, apiUploadFile, apiDelUploadFile, apiWorkLog } from '@/services/api/taskManage'
import { Toast } from 'vant'
// import { downFile } from '@/lib/downFile.js'
export default {
  data () {
    return {
      nowUserName: '',
      workId: '',
      title: '',
      workList: [],
      isShowCurrentPeople: false,
      workLogAttachmentNewDTO: {
        attachmentList: []
      },
      fileList: [],
      endFlag: false,
      remark: '',
      declared: '',
      declaredId: '',
      declaredList: [],
      declaredPicker: false
    }
  },
  methods: {
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    // 负责人确认
    chargeConfirm (val) {
      this.chargePeople = '下一步负责人：'+ val.name
      this.chargeId = val.id
    },
    // 已申报项目确认
    declaredConfirm (val) {
      this.declared = val.nickname
      this.declaredId = val.userId
      this.declaredPicker = false
    },
    // 处理提交
    handleConfirm () {
      let titleTest = /^[\s\S]{6,}$/
      if (!titleTest.test(this.remark)) {
        this.$toast('内容最少6个字符')
        return
      }
      if (!this.endFlag) {
        if (!this.declaredId) {
          this.$toast('请选择指派人')
          return
        }
      }
      apiWorkHandle(this.workId, {
        workLogAttachmentNewDTO: this.workLogAttachmentNewDTO,
        endFlag: this.endFlag,
        toUserId: this.declaredId,
        toUserName: this.declared,
        remark: this.remark
      })
        .then(res => {
          if (res.code === 200) {
            this.$toast(res.msg)
            this.$router.replace('/taskManage')
          } else {
            if (res.response) {
              this.$toast(res.response.data.message)
            }
          }
        })
        .catch(err => {
          this.$toast(res.data.data.message)
        })
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
            this.workLogAttachmentNewDTO.attachmentList.push(res.data)
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
    delUpload (file, detail) {
      if (file.status === 'done') {
        let attachmentId = this.workLogAttachmentNewDTO.attachmentList[detail.index].attachmentId
        apiDelUploadFile(attachmentId).then(res => {
          if (res.code === 200) {
            this.workLogAttachmentNewDTO.attachmentList.splice(detail.index, 1)
            this.temUploadFile.splice(detail.index, 1)
          }
        })
      } else {
        // 只有上传失败的图片的情况下
        this.temUploadFile.splice(detail.index, 1)
      }
    },
    // 下载上传的附件
    downUploadFile (data) {
	    window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
      var url = 'http://123.57.161.229/zhenyou-file/' + data.filepath
      window.location.href = url
    },
    getUserList () {
      // 指派人列表
      apiUserlist().then(res => {
        this.declaredList = res.data
      })
    },
    // 查看工作记录
    getWorkLog (id) {
      apiWorkLog(id).then(res => {
        this.workList = res.data
        this.getTimeLength(res.data)
      })
    },
    chanegTimeStamp (arr1, arr2) {
      if (!arr1) return
      if (!arr2) return
      let newString1 = arr1.replace('T', ' ')
      let newString2 = arr2.replace('T', ' ')
      let androidTime = new Date(newString2).getTime() - new Date(newString1).getTime()
      let iosTime = Date.parse(newString2.replace(/-/g, "/")) - Date.parse(newString1.replace(/-/g, "/"))
      let usedTime = androidTime || iosTime
      let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
      let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
      let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
      let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
      let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
      var leave3=leavel2%(60*1000)      //计算分钟数后剩余的毫秒数
      var seconds=Math.round(leave3/1000)
      if (seconds === 'undefined' || seconds === NaN) {
        seconds = '00'
      }
      // return days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"
      if (days * 1 > 0) {
        // 有天数
        return days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒"
      } else {
        // 没有天数
        if (hours > 0) {
          // 有小时
          return hours + "小时" + minutes + "分钟" + seconds+"秒"
        } else {
          // 没有小时
          if (minutes > 0) {
            // 有分钟
            return minutes + "分钟" + seconds + "秒"
          } else {
            // 没有分钟
            return seconds + "秒"
          }
        }
      }
    },
    getTimeLength (data) {
      for (let i = data.length-1; i >= 0; i--) {
        if (i + 1 === data.length) {
          if (data[i].createdTime) {
            data[i].intervalTime = '开始'
          }
        } else {
          if (data[i].createdTime && data[i + 1].createdTime) {
            data[i].intervalTime = '用时：' + this.chanegTimeStamp(data[i+1].createdTime, data[i].createdTime)
          }
        }
      }
    },
    // 判断是否是图片
    checkIsImg (str) {
      if ((str.indexOf(".jpg") != -1) || (str.indexOf(".png") != -1) ) {
        return true
      }
    }
  },
  mounted () {
    this.workId = this.$route.query.wordId
    this.title = this.$route.query.title
    this.nowUserName = this.$route.query.nowUserName
    if (this.$route.query.type * 1 === 1) {
      this.isShowCurrentPeople = false
    } else {
      this.isShowCurrentPeople = true
    }
    this.getWorkLog(this.workId)
    this.getUserList()
  }
}
</script>
<style lang="scss">
.taskHandle {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .taskHandleContent {
    padding: 10px 30px;
    ul {
      li {
        .van-cell {
          padding: 10px 0;
        }
        .van-field {
          .van-cell__value {
            padding: 5px;
            border-radius: 5px;
          }
        }
        .van-radio-group {
          justify-content: space-between;
          font-size: 14px;
        }
      }
      li:first-child {
        // background: #eff2f2;
        border-radius: 8px;
        // border: 1px solid #ccc;
        overflow: hidden;
        margin-bottom: 10px;
        .van-cell {
          padding: 0;
        }
        .van-field {
          .van-cell__value {
            background: #eff2f2;
          }
        }
        > p {
          padding: 5px;
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
      .confirmbutton {
        text-align: right;
        .van-button {
          padding: 8px 16px;
          border-radius: 6px;
        }
      }
      .isChangeDeclare {
        display: flex;
        align-items: center;
        font-size: 14px;
        .van-checkbox {
          flex: none;
          margin-right: 10px;
        }
        .van-field {
          align-items: center;
          .van-field__label {
            width: auto;
          }
          .van-field__body {
            padding-left: 6px;
            background: #eff2f2;
            border-radius: 8px;
          }
        }
      }
    }
    h2 {
      font-size: 16px;
      > span {
        color: #1989fa;
      }
    }
    .van-steps {
      .van-steps__items {
        .van-step {
          .van-step__title {
            > div {
              width: 100%;
              padding: 6px;
              background: #eff2f2;
              border-radius: 13px;
              .imgBox {
                width: 100%;
                height: 100%;
                > .fileBox {
                  display: inline-flex;
                  width: 100%;
                  margin: 2px 0;
                  overflow: hidden;
                }
              }
              p {
                padding: 6px;
              }
            }
            > span {
              display: block;
              padding: 6px ;
            }
          }
        }
      }
    }
  }
}
</style>
