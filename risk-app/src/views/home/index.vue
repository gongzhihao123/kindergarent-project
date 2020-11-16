<template>
  <div class="home">
    <van-nav-bar title="安全隐患列表"  left-arrow @click-left="onClickLeft">
      <template #right>
        <!-- <van-button type="info" size="mini" @click="goRepair">我要添加</van-button> -->
        <van-button type="info" icon="plus" size="mini" @click="goRepair">添加</van-button>
      </template>
    </van-nav-bar>
    <div class="home-container">
      <van-tabs v-model="handleStatus" @click="changeHandleStatus" sticky active="未完成">
        <van-sticky :offset-top="43">
          <div class="vanButtonGrounp">
            <!-- <van-button v-for="(item, index) in buttonList" @change="changeHandleStatus" :key="index" :class="changePickerFlag * 1 === index ? 'van-button-activity' : ''"
            size="small" @click="changePicker(item.type, index)">{{ item.typeName }}({{ item.count }})</van-button> -->
            <!-- <van-switch v-model="checked" size="24px" /> -->
            <van-cell center :title="switchVal">
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
import { apiStatusDict, apiTypeDict, apiRiskPage } from '@/services/api/index'
export default {
  data () {
    return {
      checked: false,
      switchVal: '全部',
      authority: [],
      handleStatus: false,
      handleType: '',
      changePickerFlag: 0,
      completed: 3,
      processing: 10,
      riskList: [],
      tabList: [],
      buttonList: [],
      current: 1,
      pageSize: 10,
      // 列表
      list: [],
      loading: false,
      finished: false,
      normalButtonFlag: 1
    }
  },
  methods: {
    // 返回主页
    onClickLeft () {
      window.location.href = 'http://39.104.113.97'
    },
    changePicker (id, val) {
      this.handleType = id
      // this.changePickerFlag = val * 1
      this.getRiskList()
    },
    // 是否本人显示
    changeSwitch (val) {
      this.checked = val
      if (val) {
        this.switchVal = '仅显示本人'
      } else {
        this.switchVal = '全部'
      }
      this.getRiskList()
    },
    // 切换处理状态
    async changeHandleStatus (data) {
      console.log(data)
      this.handleStatus = data
      await this.getRiskList()
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= this.riskList.length) {
          this.finished = true;
        }
      }, 1000);
    },
    // 去报修
    goRepair () {
      this.$router.push('/repair')
    },
    // 去处理详情页
    goHandle (item, index) {
      // 非本人提出
      let loginUserId = window.localStorage.getItem('loginUserId')
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
              // let newObj = {}
              // newObj = Object.assign({ repairUserId: item.repairUserId  }, queryParams)
              this.$router.push({ path: '/dispose7', query: Object.assign({ repairUserId: item.repairUserId  }, queryParams) })
              break
            case 4:
              // 已完成查看
              this.$router.push({ path: '/dispose1', query: queryParams })
              break
            default:
              console.log(item.status)
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
              console.log(item.status)
          }
        } else {
          this.$router.push({ path: '/dispose1', query: queryParams })
        }
      }
    },
    // 获取状态列表
    getStatusDict() {
      apiStatusDict().then(res => {
        if (res.data.length > 0) {
          this.tabList = res.data
        } else {
          this.tabList = []
        }
      })
    },
    // // 获取类别列表
    // getTypeDict() {
    //   this.buttonList = []
    //   apiTypeDict({
    //     status: this.handleStatus,
    //     type: this.checked
    //   }).then(res => {
    //     let arr = []
    //     let obj = {}
    //     obj.typeName = '全部'
    //     obj.type = 0
    //     if (res.length === 1) {
    //       obj.count = res[0].count
    //     } else if (res.length === 2) {
    //       obj.count = res[0].count + res[1].count
    //     } else if (res.length === 3) {
    //       obj.count = res[0].count + res[1].count + res[3].count
    //     }
    //     arr.push(obj)
    //     this.buttonList = res.concat(arr).reverse()
    //   })
    // },
    getRiskList () {
      if (this.handleType * 1 === 0) {
        this.handleType = ''
      }
      apiRiskPage({
        pageSize: this.pageSize,
        current: this.current,
        finishedFlag: this.handleStatus,
        onlyMyselfFlag: this.checked
      }).then(res => {
        this.riskList = res.data.records
      })
    },
    // 普通用户权限按钮显示
    quanxiankongzhiButton (item) {
      let quanButtonFlag = true
      let loginUserId = window.localStorage.getItem('loginUserId')
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
    // this.authority = JSON.parse(window.localStorage.getItem('auth'))
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
