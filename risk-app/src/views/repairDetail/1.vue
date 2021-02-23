<template>
  <!-- 非负责任人提出 -- 园长 -->
  <div class="dispose1">
    <van-nav-bar :title="title" fixed placeholder left-arrow @click-left="goBack"></van-nav-bar>
    <div class="dispose1Content">
      <h2 v-if="isFinish"><span>已完成！</span></h2>
      <div class="logTextContent" v-if="duplicateFlag">
        已申报，<span>案件名称：<b @click="goDeclaredDetail">{{ duplicateRiskTitle }}</b></span>
      </div>
      <h2 v-if="!isFinish">当前处理人：<span>{{ nowUserName ? nowUserName : '无' }}</span></h2>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(item, index) in riskLogList" :key="index">
          <h3>
            {{ item.handlerUserName }}：{{ item.createdTime | formatReplace }} <span v-if="item.createdTime">({{ item.intervalTime }})</span>
          </h3>
          <div class="logContent">
            <div v-if="item.attachmentList.length > 0" style="display: flex; flex-wrap: wrap;">
              <div class="imgBox" v-for=" imgList in item.attachmentList " :key="imgList.attachmentId">
                <div v-if="imgList.filepath" class="imgBoxShow" >
                  <img :src="'http://123.57.161.229/k-file/' + imgList.filepath" @click.stop="changeImg(imgList)" alt="" />
                </div>
              </div>
              <van-overlay :show="imgShow" @click="imgShow = false">
                <div class="wrapper previewImg">
                  <div class="previewImgBox">
                    <img :src="imgUrl" alt="">
                  </div>
                </div>
              </van-overlay>
            </div>
            <p>{{ item.remark }}</p>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>
<script>
import { apiRiskLogList } from '@/services/api/index'
export default {
  data () {
    return {
      nowUserName: '',
      duplicateFlag: '',
      duplicateRiskId: '',
      duplicateRiskTitle: '',
      title: '',
      riskId: '',
      riskLogList: [],
      imgShow: false,
      imgUrl: '',
      isFinish: false
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
      this.$router.go(-1)
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
      this.$router.push({ path: '/declaredDetail', query: { riskId: this.duplicateRiskId, title: this.duplicateRiskTitle, nowUserName: this.nowUserName } })
    }
  },
  async created () {
    this.riskId = this.$route.query.riskId
    this.title = this.$route.query.title
    this.nowUserName = this.$route.query.nowUserName
    let isFinishIndex = this.$route.query.isFinishIndex
    if (isFinishIndex * 1 === 2 * 1) {
      this.isFinish = true
    } else {
      this.isFinish = false
    }
    if (this.$route.query.duplicateFlag) {
      this.duplicateFlag = JSON.parse(this.$route.query.duplicateFlag)
    } else {
      if (this.$route.query.duplicateRiskId) {
        this.duplicateFlag = true
      }
    }
    this.duplicateRiskId = this.$route.query.duplicateRiskId
    this.duplicateRiskTitle = this.$route.query.duplicateRiskTitle
    await apiRiskLogList(this.riskId)
      .then(res => {
        this.riskLogList = res.data
        this.getTimeLength(res.data)
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
    .logTextContent {
      margin: 10px 0;
      font-size: 15px;
      b {
        text-decoration:underline;
        color: #07c160;
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
                display: flex;
                width: 31%;
                height: 100%;
                > .imgBoxShow {
                  display: inline-flex;
                  height: 100px;
                  width: 100%;
                  margin: 0 6px;
                  overflow: hidden;
                  > img {
                    width: 100%;
                    height: 100px;
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
