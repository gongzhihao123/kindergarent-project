<template>
  <div class="home">
    <van-nav-bar title="安全隐患报修"  left-arrow>
      <template #right>
        <van-button type="info" size="mini" @click="goRepair">我要报修</van-button>
      </template>
    </van-nav-bar>
    <div class="home-container">
      <van-tabs v-if="tabList.length > 0" v-model="handleStatus" @click="changeHandleStatus" sticky>
        <van-sticky :offset-top="43">
          <div class="vanButtonGrounp">
            <van-button v-for="(item, index) in buttonList" @change="changeHandleStatus" :key="index" :class="changePickerFlag * 1 === index ? 'van-button-activity' : ''"
            size="small" @click="changePicker(item.type, index)">{{ item.typeName }}({{ item.count }})</van-button>
          </div> 
        </van-sticky>
        <van-tab v-for="(item, index) in tabList" :name="item.status" :key="index" :title=" item.statusName + '(' + item.count + ')' ">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
            <ul>
              <li v-for="(item, index) in riskList" :key="index" >
                <dl>
                  <dt>{{ index + 1 }}</dt>
                  <dd>{{ item.title }}</dd>
                </dl>
                <van-button v-if="!normalButtonFlag" :type="handleButton(item) ? 'info' : 'warning'" size="small" @click="goHandle(item)">{{ handleButton(item) ? '查看' : '处理' }}</van-button>
                <van-button v-if="normalButtonFlag" type="info" size="small" @click="goHandle(item)">查看</van-button>
                <!-- <van-button type="info" size="small">查看</van-button> -->
              </li>
            </ul>
          </van-list>
        </van-tab>
      </van-tabs>
      <div v-else><van-empty image="network" description="网络错误或内容为空" /></div>
    </div>
  </div>
</template>
<script>
import { apiStatusDict, apiTypeDict, apiRiskList } from '@/services/api/index'
export default {
  data () {
    return {
      authority: [],
      handleStatus: 0,
      handleType: '',
      changePickerFlag: 0,
      completed: 3,
      processing: 10,
      riskList: [],
      tabList: [],
      buttonList: [],
      // 列表
      list: [],
      loading: false,
      finished: false,
      normalButtonFlag: false
    }
  },
  methods: {
    changePicker (id, val) {
      this.handleType = id
      this.changePickerFlag = val * 1
      this.getRiskList()
    },
    // 切换处理状态
    async changeHandleStatus (data) {
      this.handleStatus = data
      this.changePickerFlag = 0
      await this.getTypeDict()
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
    goHandle (item) {
      this.$router.push({ path: '/dispose', query: { isShowCurrentPeople: false, status: item.status, type: item.type, title: item.title, id: item.id } })
    },
    // 获取状态列表
    getStatusDict() {
      apiStatusDict().then(res => {
        if (res.length > 0) {
          this.tabList = res
        } else {
          // this.$toast(res.response.data.message)
          this.tabList = []
        }
      })
    },
    // 获取类别列表
    getTypeDict() {
      this.buttonList = []
      apiTypeDict({
        status: this.handleStatus
      }).then(res => {
        let arr = []
        let obj = {}
        obj.typeName = '全部'
        obj.type = 0
        if (res.length === 1) {
          obj.count = res[0].count
        } else if (res.length === 2) {
          obj.count = res[0].count + res[1].count
        } else if (res.length === 3) {
          obj.count = res[0].count + res[1].count + res[3].count
        }
        arr.push(obj)
        this.buttonList = res.concat(arr).reverse()
      })
    },
    getRiskList () {
      if (this.handleType * 1 === 0) {
        this.handleType = ''
      }
      apiRiskList({
        status: this.handleStatus,
        type: this.handleType
      }).then(res => {
        this.riskList = res
      })
    },
    handleButton (item) {
      let buttonFlag = false
      if (item.status * 1 === 0) {
        // 待处理
        if (item.type * 1 === 1) {
          buttonFlag = true
        } else if (item.type * 1 === 2) {
          buttonFlag = false
        }
      } else if (item.status * 1 === 1) {
        // 处理中
        buttonFlag = false
      } else if (item.status * 1 === 2) {
        // 已完成
        buttonFlag = true
      }
      return buttonFlag
    },
    judgeAuth (string) {
      let arr = this.authority.filter(item => item.authority === string)
      if (arr.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted () {
    await this.getStatusDict()
    await this.getTypeDict()
    await this.getRiskList()
    this.authority = JSON.parse(window.localStorage.getItem('auth'))
    if (!this.judgeAuth('ROLE_DIRECTOR')){
      if (this.judgeAuth('ROLE_NORMAL')) {
        // 普通用户ROLE_NORMAL
        this.normalButtonFlag = true
      } else {
        this.normalButtonFlag = false
      }
    }
    
  }
}
</script>
<style lang="scss">
.home {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
    .van-nav-bar__right {
      .van-button {
        padding: 10px 12px;
        border-radius: 12px;
      }
    }
  }
  .home-container {
    .van-tabs {
      .van-tabs__content {
        .vanButtonGrounp {
          display: flex;
          justify-content: space-around;
          background: #fff;
          .van-button {
            border: 1PX solid #ccc;
            background: #fff;
            border-radius: 20px;
          }
          .van-button-activity {
            background: #1989fa;
            border: 1PX solid #1989fa;
            color: #fff;
          }
        }
        .van-tab__pane {
          .van-list {
            > ul {
              li {
                padding: 8px 10px;
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
