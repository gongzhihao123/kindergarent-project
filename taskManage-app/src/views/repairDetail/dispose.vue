<template>
  <div class="dispose">
    <van-nav-bar :title="title" fixed placeholder left-arrow @click-left="goBack"></van-nav-bar>
    <div class="disposeContent">
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
              value-key="nickName"
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
      <!-- <h2 v-if="isShowCurrentPeople">当前处理人：<span>A主任</span></h2> -->
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in workList" :key="index">
          <h3>
            {{ item.workLog.operateUserName }}：{{ item.workLog.createTime | changeDateFormat }} <span v-if="item.workLog">({{ item.workLog.intervalTime }})</span>
          </h3>
          <div>
            <div class="imgBox" v-for=" imgList in item.workLogAttachmentList " :key="imgList.id">
              <div v-if="imgList.filepath" >
                <div class="fileBox" v-if="!checkIsImg(imgList.filename)" @click="downUploadFile(imgList)">
                  <img src="imgList.filepath" alt="">
                  <span>{{ imgList.filename }}</span>
                </div>
                <img v-if="checkIsImg(imgList.filename)" src="./../../assets/logo.png" alt="" @click="downUploadFile(item)">
              </div>
            </div>
            <p>{{ item.workLog.remark }}</p>
          </div>
          <span>指派给：<i>{{ item.workLog.toUserName }}</i></span>
        </van-step>
        <!-- <van-step>
          <h3>
            A负责人：2020-05-14 09:12 （1小时23分钟）
          </h3>
          <div>
            <img src="./../../assets/logo.png" alt="">
            <p>已申报，案件名称：<b>关于教室窗户无法正常上锁的问题</b></p>
          </div>
          <span>指派给：<i>A负责人</i></span>
        </van-step> -->
      </van-steps>
    </div>
  </div>
</template>
<script>
import { apiWorkHandle, apiUserlist, apiUploadFile, apiDelUploadFile, apiWorkLog } from '@/services/api/index'
export default {
  data () {
    return {
      workId: '',
      title: '',
      workList: [],
      isShowCurrentPeople: false,
      attachmentList: [],
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
      this.declared = val.nickName
      this.declaredId = val.id
      this.declaredPicker = false
    },
    // 处理提交
    handleConfirm () {
      apiWorkHandle(this.workId, {
        attachmentList: this.attachmentList,
        endFlag: this.endFlag,
        toUserId: this.declaredId,
        toUserName: this.declared,
        remark: this.remark
      })
        .then(res => {
          if (res.status === 201) {
            this.$router.replace('/home')
          } else {
            console.log(res.response)
          }
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
          if (res.resultCode === 1) {
            file.status = 'done'
            file.message = '上传成功'
            let obj = {}
            obj.filepath = res.filepath
            obj.filename = res.filename
            this.attachmentList.push(obj)
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
      let filepath = this.attachmentList[detail.index].filepath
      apiDelUploadFile({ filepath: filepath }).then(res => {
        if (res.status === 202) {
          this.attachmentList.splice(detail.index, 1)
          this.fileList.splice(detail.index, 1)
        }
      })
    },
    // 下载上传的附件
    downUploadFile (data) {
      let token = window.localStorage.getItem('accessToken')
      let HTP = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '')
      var url = HTP + '/workLogAttachment/attachment?filepath=' + data.filepath
      window.open()
      var xhr = new XMLHttpRequest();
        //GET请求,请求路径url,async(是否异步)
        xhr.open('GET', url, true);
        //设置请求头参数的方式,如果没有可忽略此行代码
        xhr.setRequestHeader("Authorization", token);
        //设置响应类型为 blob
        xhr.responseType = 'blob';
        //关键部分
        xhr.onload = function (e) {
            //如果请求执行成功
            if (this.status == 200) {
                var blob = this.response;
                var filename = data.filename;//这个名字可以自定义或者根据后端的返回值设置
                var a = document.createElement('a');  //创建一个`a`标签
                // blob.type = "application/octet-stream"; //如果类型是这个就可以不同设置
                //创键临时url对象
                var url = URL.createObjectURL(blob);
                a.href = url;
                a.download=filename;
                a.click();
                //释放之前创建的URL对象
                window.URL.revokeObjectURL(url);
            }
        };
        //发送请求
        xhr.send()
    },
    getUserList () {
      // 指派人列表
      apiUserlist().then(res => {
        this.declaredList = res
      })
    },
    // 查看工作记录
    getWorkLog (id) {
      apiWorkLog(id).then(res => {
        this.workList = res
        this.getTimeLength(res)
      })
    },
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
          if (data[i].workLog !== 'undefined' && data[i].workLog) {
            data[i].workLog.intervalTime = '开始'
          }
        }
        if (i * 1 > 1 || i * 1 === 1) {
          if ((data[i].workLog  !== 'undefined' && data[i].workLog) && (data[i - 1].workLog !== 'undefined' && data[i - 1].workLog)) {
            data[i].workLog.intervalTime = this.chanegTimeStamp(data[i - 1].workLog.createTime, data[i].workLog.createTime)
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
.dispose {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .disposeContent {
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
              background: #eff2f2;
              border-radius: 13px;
              padding: 6px;
              .imgBox {
                width: 100%;
                display: inline-flex;
                > div {
                  width: 100%;
                  margin: 0 6px ;
                  .fileBox {
                    display: inline-flex;
                    flex-direction: column;
                    span {
                      width: 100%;
                    }
                  }
                  > img {
                    display: inline-block;
                    width: 31%;
                  }
                }
              }
              p {
                padding: 6px;
                min-width: max-content;
                word-wrap: break-word;
              }
            }
            > span {
                display: block;
                padding: 6px ;
                i {
                  font-style: normal;
                }
              }
          }
        }
      }
    }
  }
}
</style>
