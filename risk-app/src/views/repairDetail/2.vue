<template>
  <!-- 非负责任人提出 -- 本地负责人 -->
  <div class="dispose2">
    <van-nav-bar :title="title" fixed placeholder left-arrow @click-left="goBack"></van-nav-bar>
    <div class="dispose2Content">
       <ul v-if="!isShowCurrentPeople">
        <li class="isChangeDeclare">
          <van-radio-group v-model="duplicateFlag">
            <van-radio :name='false'>未申报</van-radio>
            <van-radio :name="true">已申报</van-radio>
          </van-radio-group>
          <van-field v-if="duplicateFlag" placeholder="点击选择" v-model="declared" readonly @click="declaredPicker = true" />
          <van-popup v-model="declaredPicker" position="bottom">
            <van-picker
              show-toolbar
              value-key="title"
              :columns="declaredList"
              @confirm="declaredConfirm"
              @cancel="declaredPicker = false"
            />
          </van-popup>
        </li>
        <li class="confirmbutton">
          <van-button type="info" size="small" @click="onConfirm">提交</van-button>
        </li>
      </ul>
      <h2>当前处理人：<span>A主任</span></h2>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in riskLogList" :key="index">
          <h3>
            {{ item.riskLog.handlerUserName }}：{{ item.riskLog.createTime | changeDateFormat }} <span v-if="item.riskLog">({{ item.riskLog.intervalTime }})</span>
          </h3>
          <div class="logContent">
            <!-- <div class="imgBox" v-for=" imgList in item.riskLogImageList " :key="imgList.id">
              <div v-if="imgList.path" class="imgBoxShow" >
                <img :src="'http://39.104.113.97/static/' + imgList.path" @click.stop="changeImg(imgList)" alt="">
              </div>
              <van-overlay :show="imgShow" @click="imgShow = false">
                <div class="wrapper previewImg">
                  <div class="previewImgBox">
                    <img :src="imgUrl" alt="">
                  </div>
                </div>
              </van-overlay>
            </div>
            <p>{{ item.riskLog.remark }}</p> -->
            <div class="logTextContent">
              已申报，<span>案件名称：
              <b>关于教室窗户无法正常上锁的问题</b></span>
            </div>
          </div>
        </van-step>
        <van-step>
          <!-- <h3>
            {{ item.riskLog.handlerUserName }}：{{ item.riskLog.createTime | changeDateFormat }} <span v-if="item.riskLog">({{ item.riskLog.intervalTime }})</span>
          </h3> -->
          <div class="logContent">
            <div class="logTextContent">
              已申报，<span>案件名称：
              <b>关于教室窗户无法正常上锁的问题</b></span>
            </div>
          </div>
        </van-step>
        <van-step>
          <!-- <h3>
            {{ item.riskLog.handlerUserName }}：{{ item.riskLog.createTime | changeDateFormat }} <span v-if="item.riskLog">({{ item.riskLog.intervalTime }})</span>
          </h3> -->
          <div class="logContent">
            <div class="logTextContent">
              已申报，<span>案件名称：
              <b>关于教室窗户无法正常上锁的问题</b></span>
            </div>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>
<script>
import { chargePersonConfirm, apiUploadFile, apiDelUploadFile, apiRiskList, directorConfirm, directorHandle, apiRiskLogList } from '@/services/api/index'
export default {
  data () {
    return {
      title: '',
      riskId: '',
      handleType: 1,
      isShowCurrentPeople: false,
      remark: '',
      newRiskLogImageDto: {
        riskImages: []
      },
      fileList: [],
      radio: '1',
      chargePeople: '',
      chargeId: '',
      chargeList: [{ id: 1, name: 'A主任' }],
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
      this.imgUrl = 'http://39.104.113.97/static/' + item.path
      this.imgShow = true
    },
    // 返回上一页
    goBack () {
      this.$router.go(-1)
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
            this.newRiskLogImageDto.riskImages.push(res.filepath)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
    },
    delUpload (file, detail) {
      let filepath = this.newRiskLogImageDto.riskImages[detail.index]
      apiDelUploadFile({ filepath: filepath }).then(res => {
        if (res.status === 202) {
          this.newRiskLogImageDto.riskImages.splice(detail.index, 1)
          this.fileList.splice(detail.index, 1)
        }
      })
    },
    // 处理中的安全隐患列表
    getHandleIngRiskList () {
      apiRiskList({status: 1}).then(res => {
        this.declaredList = res
      })
    },
    // // 负责人确认
    // chargeConfirm (val) {
    //   this.chargePeople = '下一步负责人：'+ val.name
    //   this.chargeId = val.id
    //   this.chargePicker = false
    // },
    // 已申报项目确认
    declaredConfirm (val) {
      this.declared = val.title
      this.declaredId = val.id
      this.declaredPicker = false
    },
    // 处理提交
    // onConfirm () {
    //   if (!this.remark) {
    //     this.$toast('内容不能为空')
    //     return
    //   }
    //   let remarkReg = /^[\s\S]{6,200}$/
    //   if (!remarkReg.test(this.remark)) {
    //     this.$toast('内容应为6到200个字')
    //     return
    //   }
    //   if (this.handleType * 1 === 1) {
    //     // 主任直接提交--别人发现
    //     directorHandle(this.riskId, {
    //       newRiskLogImageDto: this.newRiskLogImageDto,
    //       remark: this.remark
    //     })
    //       .then(res => {
    //         if (res.status === 201) {
    //           this.$toast('操作成功')
    //           this.$router.replace('/home')
    //         }
    //       })
    //       .catch(() => {
    //         this.$toast('请求失败')
    //       })
    //   } else if (this.handleType * 1 === 2) {
    //     // 负责人确认
    //     chargePersonConfirm(this.riskId, {
    //       duplicateFlag: this.duplicateFlag,
    //       duplicateRiskId: this.declaredId,
    //       duplicateRiskTitle: this.declared,
    //       newRiskLogImageDto: this.newRiskLogImageDto,
    //       remark: this.remark
    //     })
    //       .then(res => {
    //         if (res.status === 201) {
    //           this.$toast('操作成功')
    //           this.$router.replace('/home')
    //         }
    //       })
    //       .catch(() => {
    //         this.$toast('请求失败')
    //       })
    //   } else if (this.handleType * 1 === 3) {
    //     // 主任处理操作--非本人发现
    //     directorConfirm(this.riskId, {
    //       duplicateFlag: this.duplicateFlag,
    //       newRiskLogImageDto: this.newRiskLogImageDto,
    //       remark: this.remark
    //     })
    //     .then(res => {
    //       if (res.status === 201) {
    //         this.$toast('操作成功')
    //         this.$router.replace('/home')
    //       }
    //     })
    //     .catch(() => {
    //       this.$toast('请求失败')
    //     })
    //   }
    // },
    chanegTimeStamp (arr1, arr2) {
      if (!arr1) return
      if (!arr2) return
      let newString1 = arr1[0] + '-' + arr1[1] + '-' + arr1[2] + ' ' + arr1[3] + ':' + arr1[4] + ':' + arr1[5]
      let newString2 = arr2[0] + '-' + arr2[1] + '-' + arr2[2] + ' ' + arr2[3] + ':' + arr2[4] + ':' + arr2[5]
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
      for (let i = 0; i < data.length; i++) {
        if (i * 1 === 0) {
          if (data[i].riskLog !== 'undefined' && data[i].riskLog) {
            data[i].riskLog.intervalTime = '开始'
          }
        }
        if (i * 1 > 1 || i * 1 === 1) {
          if ((data[i].riskLog  !== 'undefined' && data[i].riskLog) && (data[i - 1].riskLog !== 'undefined' && data[i - 1].riskLog)) {
            data[i].riskLog.intervalTime = this.chanegTimeStamp(data[i - 1].riskLog.createTime, data[i].riskLog.createTime)
          }
        }
      }
    }
  },
  async created () {
    this.isShowCurrentPeople = JSON.parse(this.$route.query.isShowCurrentPeople)
    let type = this.$route.query.type
    let status = this.$route.query.status
    this.riskId = this.$route.query.id
    this.title = this.$route.query.title
    // if (status * 1 === 1) {
    //   // 处理中
    //   if (type * 1 === 1) {
    //     // 本人提出
    //     this.handleType = 1
    //   } else if (type * 1 === 2) {
    //     // 非本人提出
    //     this.handleType = 3
    //   }
    // } else if (status * 1 === 0) {
    //   // 待确认
    //   if (type * 1 === 1) {
    //     // 本人提出
    //     this.isShowCurrentPeople = true
    //   } else if (type * 1 === 2) {
    //     // 非本人提出
    //     this.handleType = 2
    //     this.getHandleIngRiskList()
    //   }
    // } else if (status * 1 === 2) {
    //   // 已完成
    //   this.isShowCurrentPeople = true
    // }
    await apiRiskLogList(this.riskId)
      .then(res => {
        this.riskLogList = res
        this.getTimeLength(res)
      })
  }
}
</script>
<style lang="scss">
.dispose2 {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .dispose2Content {
    padding: 10px 15px;
    ul {
      li {
        .van-radio-group {
          justify-content: space-between;
          font-size: 14px;
          margin: 10px 0;
        }
      }
      .dispose2TextArea {
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
              .logTextContent {
                b {
                  text-decoration:underline;
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
