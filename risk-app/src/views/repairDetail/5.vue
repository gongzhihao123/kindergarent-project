<template>
  <!-- 负责任人本人提出 -- 主任 -->
  <div class="dispose5">
    <van-nav-bar :title="title" fixed placeholder left-arrow @click-left="goBack"></van-nav-bar>
    <div class="dispose5Content">
       <ul>
        <li class="dispose5TextArea">
          <van-field v-model="remark" rows="3" show-word-limit maxlength="200" autosize type="textarea" placeholder="请补充说明" />
          <p>
            <van-uploader v-model="fileList" :after-read="afterRead" :before-delete="delUpload" />
          </p>
        </li>
        <!-- <li class="isChangeDeclare">
          <h1>隐患针对</h1>
          <van-radio-group v-model="duplicateFlag" direction="horizontal">
            <van-radio :name='true'>给予处理</van-radio>
            <van-radio :name='false'>不予处理</van-radio>
          </van-radio-group>
        </li> -->
        <li class="nextChargePeople">
          <span>指派维修人员：</span>
          <van-field placeholder="点击选择" v-model="declared" readonly @click="declaredPicker = true" />
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
          <van-button type="info" size="small" @click="onConfirm">指派</van-button>
        </li>
      </ul>
      <div class="logTextContent" v-if="adminDuplicateFlag">
        已申报，<span>案件名称：<b>{{ adminDuplicateRiskTitle }}</b></span>
      </div>
      <h2>当前处理人：<span>{{ nowUserName ? nowUserName : '无' }}</span></h2>
      <van-steps direction="vertical" active="0">
        <van-step v-for="(item, index) in riskLogList" :key="index">
          <h3>
            {{ item.handlerUserName }}：{{ item.createdTime | formatReplace }} <span>({{ item.intervalTime }})</span>
          </h3>
          <div class="logContent">
            <div v-if="item.attachmentList.length > 0" style="display: flex;">
              <div class="imgBox" v-for=" imgList in item.attachmentList " :key="imgList.attachmentId">
                <div v-if="imgList.filepath" class="imgBoxShow" >
                  <img :src="'http://39.104.113.97/static/' + imgList.filepath" @click.stop="changeImg(imgList)" alt="">
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
import { apiRepairUserList, zhuRenHandle, apiUploadFile, apiDelUploadFile, apiRiskLogList } from '@/services/api/index'
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
      fileList: [],
      radio: '1',
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
      this.imgUrl = 'http://39.104.113.97/static/' + item.path
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
          if (res.resultCode === 1) {
            file.status = 'done'
            file.message = '上传成功'
            this.riskLogAttachment.attachmentList.push(res.filepath)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
    },
    delUpload (file, detail) {
      let filepath = this.riskLogAttachment.attachmentList[detail.index]
      apiDelUploadFile({ filepath: filepath }).then(res => {
        if (res.status === 202) {
          this.riskLogAttachment.attachmentList.splice(detail.index, 1)
          this.fileList.splice(detail.index, 1)
        }
      })
    },
    // 维修人员列表
    getApiRepairUserList () {
      apiRepairUserList().then(res => {
        this.declaredList = res.data
      })
    },
    // 指派维修人员确认
    declaredConfirm (val) {
      this.declared = val.nickname
      this.declaredId = val.userId
      this.declaredPicker = false
    },
    // 处理提交
    onConfirm () {
      if (this.duplicateFlag) {
        if (!this.declaredId) {
          this.$toast('请选择指派人员')
          return
        }
      } else {
        if (!this.remark) {
          this.$toast('请输入补充内容')
          return
        }
      }
      zhuRenHandle(this.riskId,{
          confirmFlag: this.duplicateFlag,
          nextUserId: this.declaredId,
          nextUserName: this.declared,
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
      let usedTime = new Date(newString2).getTime() - new Date(newString1).getTime()
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
    }
  },
  async created () {
    let type = this.$route.query.type
    let status = this.$route.query.status
    this.riskId = this.$route.query.riskId
    this.title = this.$route.query.title
    this.nowUserName = this.$route.query.nowUserName
    if (this.$route.query.duplicateFlag) {
      this.adminDuplicateFlag = JSON.parse(this.$route.query.duplicateFlag)
    }
    this.adminDuplicateRiskId = this.$route.query.duplicateRiskId
    this.adminDuplicateRiskTitle = this.$route.query.duplicateRiskTitle
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
.dispose5 {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .dispose5Content {
    padding: 10px 15px;
    ul {
      li {
        .van-radio-group {
          justify-content: space-between;
          font-size: 14px;
          margin: 10px 0;
        }
      }
      .dispose5TextArea {
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
        margin: 10px 0;
        .van-button {
          padding: 8px 16px;
          border-radius: 6px;
        }
      }
      .isChangeDeclare {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > h1 {
          font-size: 16px;
        }
        .van-radio-group {
          flex: none;
          line-height: 32px;
          font-size: 15px;
          .van-radio {
            margin: 0 10px;
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
                    height: 100%;
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
