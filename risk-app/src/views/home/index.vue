<template>
  <div class="home">
    <van-nav-bar title="安全隐患列表"  left-arrow @click-left="onClickLeft">
      <template #right>
        <!-- <van-button type="info" size="mini" @click="goRepair">我要添加</van-button> -->
        <van-button type="info" icon="plus" size="mini" @click="goRepair">添加</van-button>
      </template>
    </van-nav-bar>
    <div class="home-container">
      <van-tabs v-model="handleStatus" @click="changeHandleStatus" sticky>
        <van-sticky :offset-top="43">
          <div class="vanButtonGrounp">
            <!-- <van-button v-for="(item, index) in buttonList" @change="changeHandleStatus" :key="index" :class="changePickerFlag * 1 === index ? 'van-button-activity' : ''"
            size="small" @click="changePicker(item.type, index)">{{ item.typeName }}({{ item.count }})</van-button> -->
            <!-- <van-switch v-model="checked" size="24px" /> -->
            <van-cell center :title="switchVal" v-if="this.isShowSwitch">
              <template #right-icon>
                <van-switch @change="changeSwitch" v-model="checked" size="24" />
              </template>
            </van-cell>
          </div> 
        </van-sticky>
        <!-- 未完成 -->
        <van-tab name="false" title="未完成">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ul>
              <li v-for="(item, index) in riskList" :key="index" >
                <dl>
                  <dt>{{ index + 1 }}</dt>
                  <dd>
                    <p>{{ item.title }}</p>
                    <span v-if="item.nowUserName">处理人：{{item.nowUserName}}</span>
                  </dd>
                </dl>
                <div>
                  <van-tag v-if="isShowTag(item)" type="warning">{{ item.typeLabel }}</van-tag>
                  <van-button :type="quanxiankongzhiButton(item) ? 'info' : 'warning'" size="small" @click="goHandle(item, 2)">{{ quanxiankongzhiButton(item) ? '查看' : '处理' }}</van-button>
                </div>
              </li>
            </ul>
          </van-list>
        </van-tab>
        <!-- 已完成 -->
        <van-tab name="true" title="已完成">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ul>
              <li v-for="(item, index) in riskList" :key="index" >
                <dl>
                  <dt>{{ index + 1 }}</dt>
                  <dd>
                    <p>{{ item.title }}</p>
                    <span v-if="item.nowUserName">处理人：{{item.nowUserName}}</span>
                  </dd>
                </dl>
                <div>
                  <van-tag type="warning">{{ item.typeLabel }}</van-tag>
                  <van-button :type="quanxiankongzhiButton(item) ? 'info' : 'warning'" size="small" @click="goHandle(item, 2)">{{ quanxiankongzhiButton(item) ? '查看' : '处理' }}</van-button>
                </div>
              </li>
            </ul>
          </van-list>
        </van-tab>
      </van-tabs>
      <!-- <div><van-empty image="network" description="网络错误或内容为空" /></div> -->
    </div>
  </div>
</template>
<script>
import { apiRiskPage } from '@/services/api/index'
export default {
  data () {
    return {
      checked: false,
      switchVal: '全部',
      authority: [],
      handleStatus: 'false',
      handleType: '',
      changePickerFlag: 0,
      completed: 3,
      processing: 10,
      riskList: [],
      tabList: [],
      buttonList: [],
      current: 1,
      pageSize: 12,
      total: 0,
      // 列表
      list: [],
      loading: false,
      finished: false,
      normalButtonFlag: 1,
      isShowSwitch: false
    }
  },
  methods: {
    // 返回主页
    onClickLeft () {
      this.$router.push('/homePage')
    },
    changePicker (id, val) {
      this.handleType = id
      this.getRiskList()
    },
    // 是否本人显示
    changeSwitch (val) {
      this.checked = val
      if (val) {
        this.switchVal = '负责区域内非本人上报'
      } else {
        this.switchVal = '全部'
      }
      this.getRiskList()
    },
    // 切换处理状态
    async changeHandleStatus (data) {
      this.handleStatus = data
      this.riskList = []
      this.current = 1
      await this.getRiskList()
    },
    onLoad() {
      this.current++
      this.getRiskList()
    },
    // 去报修
    goRepair () {
      this.$router.push('/repair')
    },
    // 去处理详情页
    goHandle (item, index) {
      // 非本人提出
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      let loginUserId = userInfo.user.userId
      let queryParams = { nowUserName: item.nowUserName, title: item.title, riskId: item.riskId,
              duplicateFlag: item.duplicateFlag, duplicateRiskId: item.duplicateRiskId, duplicateRiskTitle: item.duplicateRiskTitle, adminUserId: item.adminUserId }
      if (item.type * 1 === 2) {
        if (item.nowUserId * 1 === loginUserId * 1) {
          switch (item.status) {
            case 0:
              // 负责人确认
              this.$router.push({ path: '/dispose2', query: queryParams })
              break
            case 1:
              // 主任确认
              this.$router.push({ path: '/dispose3', query: queryParams })
              break
            case 2:
              // 维修确认
              this.$router.push({ path: '/dispose4', query: queryParams })
              break
            case 3:
              // 区域管理员确认
              this.$router.push({ path: '/dispose7', query: Object.assign({ repairUserId: item.repairUserId  }, queryParams) })
              break
            case 4:
              // 已完成查看
              this.$router.push({ path: '/dispose1', query: queryParams })
              break
            default:
              console.log('default')
          }
        } else {
          this.$router.push({ path: '/dispose1', query: queryParams })
        }
      } else {
        // 本人提出
        if (item.nowUserId * 1 === loginUserId * 1) {
          switch (item.status) {
            case 0:
              // 负责人提出
              this.$router.push({ path: '/dispose6', query: queryParams })
              break
            case 1:
              // 主任提出
              this.$router.push({ path: '/dispose5', query: queryParams })
              break
            case 2:
              // 维修人员提出
              this.$router.push({ path: '/dispose4', query: queryParams })
              break
            case 3:
              // 责任负责人确定
              this.$router.push({ path: '/dispose7', query: Object.assign({ repairUserId: item.repairUserId  }, queryParams) })
              break
            case 4:
              // 已完成查看
              this.$router.push({ path: '/dispose1', query: queryParams })
            default:
              console.log('default')
          }
        } else {
          this.$router.push({ path: '/dispose1', query: queryParams })
        }
      }
    },
    getRiskList () {
      apiRiskPage({
        pageSize: this.pageSize,
        current: this.current,
        finishedFlag: this.handleStatus,
        onlyMyselfFlag: this.checked
      }).then(res => {
        let dataArr = res.data.records
        this.total = res.data.total
        this.loading = false
        if (dataArr == null || dataArr.length === 0) {
          // 加载结束
          this.finished = true
          return
        }
        // 数据合并
        this.riskList = this.riskList.concat(dataArr)
        if (this.riskList.length >= this.total) {
          this.finished = true
        }
      })
    },
    isShowTag (item) {
      let tagFlag = false
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      let loginUserId = userInfo.user.userId
      if (item.adminUserId * 1 === loginUserId * 1) {
        tagFlag = true
      }
      return tagFlag
    },
    // 普通用户权限按钮显示
    quanxiankongzhiButton (item) {
      let quanButtonFlag = true
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      let loginUserId = userInfo.user.userId
      if (this.handleStatus === 'true') {
        quanButtonFlag = true 
      } else {
        if (item.nowUserId * 1 === loginUserId * 1) {
          quanButtonFlag = false 
        } else {
          quanButtonFlag = true 
        }
      }
      
      return quanButtonFlag
    }
  },
  async mounted () {
    await this.getRiskList()
    this.isShowSwitch = JSON.parse(window.localStorage.getItem('userInfo')).roleList.filter(item => item.roleId * 1 === 10 * 1).length > 0
  }
}
</script>
<style lang="scss">
.home {
  .van-nav-bar {
    .van-nav-bar__left {
      .van-icon {
        color: #000;
      }
    }
    .van-nav-bar__right {
      .van-icon {
        color: #fff;
      }
      .van-button--mini {
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
  .home-container {
    .van-tabs {
      .van-tabs__content {
        .vanButtonGrounp {
          display: flex;
          justify-content: flex-end;
          padding-right: 10px;
          background: #fff;
          // .van-button {
          //   background: #fff;
          //   border: none;
          // }
          // .van-button-activity {
          //   border-bottom: 3PX solid #1989fa;
          // }
        }
        .van-tab__pane {
          .van-list {
            > ul {
              li {
                padding: 12px 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1PX solid #eff2f2;
                dl {
                  display: flex;
                  align-items: center;
                  font-size: 16px;
                  dt {
                    width: 20px;
                  }
                  dd {
                    width: 200px;
                    margin-left: 10px;
                    color: #333;
                    word-break:keep-all;/* 不换行 */
                    white-space:nowrap;/* 不换行 */
                    overflow:hidden;
                    text-overflow:ellipsis;
                    > span {
                      margin-top: 3px;
                      font-size: 12px;
                      color: #666;
                    }
                  }
                }
                > div {
                  display: flex;
                  align-items: center;
                  .van-tag {
                    position: absolute;
                    right: 64px;
                    margin-right: 10px;
                  }
                }
                .van-button {
                  height: auto;
                  padding: 3px 12px;
                  border-radius: 20px;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
