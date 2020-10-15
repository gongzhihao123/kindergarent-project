<template>
  <!-- 非负责任人提出 -- 园长 -->
  <div class="dispose1">
    <van-nav-bar :title="title" fixed placeholder left-arrow @click-left="goBack"></van-nav-bar>
    <div class="dispose1Content">
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
.dispose1 {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .dispose1Content {
    padding: 10px 15px;
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
