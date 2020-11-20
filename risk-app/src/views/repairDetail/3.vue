<template>
  <!-- 非负责任人提出 -- 主任 -->
  <div class="dispose3">
    <van-nav-bar :title="title" fixed placeholder left-arrow @click-left="goBack"></van-nav-bar>
    <div class="dispose3Content">
       <ul>
        <li class="dispose3TextArea">
          <van-field v-model="remark" rows="3" show-word-limit maxlength="200" autosize type="textarea" placeholder="请补充说明" />
          <p>
            <van-uploader v-model="temUploadFile" :after-read="afterRead" :before-delete="delUpload" />
          </p>
        </li>
        <li>
          <van-radio-group v-model="duplicateFlag" direction="horizontal">
            <van-radio :name='true'>确定是同一件，可关闭</van-radio>
            <van-radio :name='false'>不是同一件</van-radio>
          </van-radio-group>
        </li>
        <li v-if="!duplicateFlag" class="nextChargePeople">
          <span>指派维修人员：</span>
          <van-field placeholder="点击选择" v-model="chargePeople" readonly @click="chargePicker = true" />
          <van-popup v-model="chargePicker" position="bottom">
            <van-picker
              show-toolbar
              value-key="nickname"
              :columns="chargeList"
              @confirm="chargeConfirm"
              @cancel="chargePicker = false"
            />
          </van-popup>
        </li>
        <li class="confirmbutton">
          <van-button type="info" size="small" @click="onConfirm">提交</van-button>
        </li>
      </ul>
      <div class="logTextContent" v-if="adminDuplicateRiskId">
        已申报，<span>案件名称：<b @click="goDeclaredDetail">{{ adminDuplicateRiskTitle }}</b></span>
      </div>
      <h2>当前处理人：<span>{{ nowUserName ? nowUserName : '无' }}</span></h2>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in riskLogList" :key="index">
          <h3>
            {{ item.handlerUserName }}：{{ item.createdTime | formatReplace }} <span>({{ item.intervalTime }})</span>
          </h3>
          <div class="logContent">
            <div v-if="item.attachmentList.length > 0" style="display: flex;">
              <div class="imgBox" v-for=" imgList in item.attachmentList " :key="imgList.attachmentId">
                <div v-if="imgList.filepath" class="imgBoxShow" >
                  <img :src="'http://123.57.161.229/k-file/' + imgList.filepath" @click.stop="changeImg(imgList)" alt="">
                </div>
                <van-overlay :show="imgShow" @click="imgShow = false">
                  <div class="wrapper previewImg">
                    <div class="previewImgBox">
                      <img :src="imgUrl" alt="">
                    </div>
                  </div>
                </van-overlay>
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
import { zhuRenConfirm, apiRepairUserList, apiUploadFile, apiDelUploadFile, apiRiskList, directorConfirm, directorHandle, apiRiskLogList } from '@/services/api/index'
export default {
  data () {
    return {
      nowUserName: '',
      adminDuplicateFlag: '',
      adminDuplicateRiskId: '',
      adminDuplicateRiskTitle: '',
      title: '',
      riskId: '',
      handleType: 1,
      remark: '',
      riskLogAttachment: {
        attachmentList: []
      },
      temUploadFile: [],
      radio: '1',
      chargePeople: '',
      chargeId: '',
      chargeList: [],
      chargePicker: false,
      duplicateFlag: false,
      declared: '',
      declaredId: '',
      declaredList: [],
      declaredPicker: false,
      riskLogList: [],
      imgShow: false,
      imgUrl: ''
    }
  },
  methods: {
    // 预览img
    changeImg (item) {
      this.imgUrl = ''
      this.imgUrl = 'http://123.57.161.229/k-file/' + item.filepath
      this.imgShow = true
    },
    // 返回上一页
    goBack () {
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
          if (res.code === 200) {
            file.status = 'done'
            file.message = '上传成功'
            this.riskLogAttachment.attachmentList.push(res.data)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
        .catch((err) => {
          file.status = 'failed'
          file.message = '上传失败'
        })
    },
    // 删除上传文件
    delUpload (file, detail) {
      if (file.status === 'done') {
        let attachmentId = this.riskLogAttachment.attachmentList[detail.index].attachmentId
        apiDelUploadFile(attachmentId).then(res => {
          if (res.code === 200) {
            this.riskLogAttachment.attachmentList.splice(detail.index, 1)
            this.temUploadFile.splice(detail.index, 1)
          }
        })
      } else {
        // 只有上传失败的图片的情况下
        this.temUploadFile.splice(detail.index, 1)
      }
    },
    // 获取维修人员列表
    getApiRepairUserList () {
      apiRepairUserList().then(res => {
        this.chargeList = res.data
      })
    },
    // // 负责人确认
    chargeConfirm (val) {
      this.chargePeople =  val.nickname
      this.chargeId = val.userId
      this.chargePicker = false
    },
    // 处理提交
    onConfirm () {
      if (!this.remark) {
        this.$toast('请填写补充说明')
        return
      }
      if (!this.duplicateFlag) {
        if (!this.chargeId) {
          this.$toast('请指派负责人')
          return
        }
      }
      zhuRenConfirm(this.riskId,{
          confirmDuplicateFlag: this.duplicateFlag,
          nextUserId: this.chargeId,
          nextUserName: this.chargePeople,
          riskLogAttachment: this.riskLogAttachment,
          remark: this.remark
        })
          .then(res => {
            if (res.status === 200) {
              this.$toast('操作成功')
              this.$router.replace('/home')
            }
          })
          .catch(() => {
            this.$toast('请求失败')
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
    goDeclaredDetail () {
      this.$router.push({ path: '/declaredDetail', query: { riskId: this.adminDuplicateRiskId, title: this.adminDuplicateRiskTitle, nowUserName: this.nowUserName } })
    }
  },
  async created () {
    let type = this.$route.query.type
    let status = this.$route.query.status
    this.riskId = this.$route.query.riskId
    this.title = this.$route.query.title
    this.nowUserName = this.$route.query.nowUserName
    if (this.$route.query.duplicateRiskId) {
      this.adminDuplicateRiskId = this.$route.query.duplicateRiskId
      this.adminDuplicateRiskTitle = this.$route.query.duplicateRiskTitle
    }
    this.getApiRepairUserList()
    await apiRiskLogList(this.riskId)
      .then(res => {
        this.riskLogList = res.data
        this.getTimeLength(res.data)
      })
  }
}
</script>
<style lang="scss">
.dispose3 {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .dispose3Content {
    padding: 10px 15px;
    ul {
      li {
        .van-radio-group {
          justify-content: space-between;
          font-size: 14px;
          margin: 10px 0;
        }
      }
      .dispose3TextArea {
        margin-bottom: 10px;
        .van-cell {
          padding: 0;
        }
        .van-field {
          border-radius: 8px;
          border: 1px solid #ccc;
          overflow: hidden;
          .van-cell__value {
            background: #eff2f2;
          }
        }
        > p {
          // text-align: right;
          padding: 5px;
          .van-uploader {
            .van-uploader__wrapper {
              .van-uploader__preview {
                margin: 5px 1px;
                border: 1PX dashed #ccc;
                .van-uploader__preview-delete {
                  .van-uploader__preview-delete-icon {
                    top: 0px;
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
        align-items: flex-end;
        .van-radio-group {
          flex: none;
          margin: 8px 0 2px 6px;
          line-height: 32px;
          font-size: 15px;
          .van-radio {
            margin: 10px 0;
          }
        }
        .van-field {
          .van-field__body {
            padding-left: 4px;
            background: #eff2f2;
            border-radius: 8px;
          }
        }
      }
      .nextChargePeople {
        display: flex;
        align-items: center;
        > span {
          font-size: 15px;
        }
        .van-cell {
          padding: 0;
          flex: 1;
        }
        .van-field {
          .van-field__body {
            padding-left: 4px;
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
    .logTextContent {
      margin: 10px 0;
      font-size: 15px;
      b {
        text-decoration:underline;
        color: #07c160;
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
                display: inline-flex;
                width: 31%;
                > .imgBoxShow {
                  display: inline-flex;
                  height: 100px;
                  width: 100%;
                  margin: 0 6px;
                  overflow: hidden;
                  > img {
                    width: 100%;
                  }
                }
                .van-overlay {
                  z-index: 22;
                  margin: 0;
                  background: rgba($color: #000, $alpha: .4);
                  .previewImg {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: auto;
                    margin: 0;
                    .previewImgBox {
                      > img {
                        width: 100%;
                      }
                    }
                  }
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
