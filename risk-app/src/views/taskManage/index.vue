<template>
  <div class="task">
    <van-nav-bar title="工作任务管理"  left-arrow @click-left="onClickLeft">
      <template #right>
        <van-button type="info" icon="plus" size="mini" @click="goTaskAdd">添加</van-button>
      </template>
    </van-nav-bar>
    <div class="task-container">
      <van-sticky >
        <div class="vanButtonGrounp">
          <van-button :class="changePickerFlag * 1 === 1 ? 'van-button-activity' : ''" size="small" @click="changePicker(1)">待处理</van-button>
          <van-button :class="changePickerFlag * 1 === 2 ? 'van-button-activity' : ''" size="small" @click="changePicker(2)">处理中</van-button>
          <van-button :class="changePickerFlag * 1 === 3 ? 'van-button-activity' : ''" size="small" @click="changePicker(3)">已完成</van-button>
          <!-- <van-button v-for="(item, index) in buttonList" :key="index" :class="changePickerFlag * 1 === index ? 'van-button-activity' : ''"
            size="small" @click="changePicker(item.status)">{{ item.statusName }}</van-button> -->
        </div>
      </van-sticky>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <ul>
            <li v-for="(item, index) in workList" :key="index" >
              <dl>
                <dt>{{ index + 1 }}</dt>
                <dd>{{ item.title }}</dd>
              </dl>
              <van-button plain :type="changePickerFlag * 1 === 1 ? 'warning' : 'info'" size="small" @click="goHandle(item)">{{ changePickerFlag * 1 === 1 ? '处理' : '查看' }}</van-button>
              <!-- <van-button plain type="info" size="small">查看</van-button> -->
            </li>
          </ul>
        </van-list>
    </div>
  </div>
</template>
<script>
import { apiWorkList } from '@/services/api/taskManage'
export default {
  data () {
    return {
      changePickerFlag: 1,
      // 列表
      current: 1,
      size: 10,
      total: 0,
      list: [],
      workList: [],
      loading: false,
      finished: false,
      buttonList: []
    }
  },
  methods: {
    // 返回主页
    onClickLeft () {
      this.$router.push('/homePage')
    },
    // 切换状态
    async changePicker (val) {
      this.changePickerFlag = val * 1
      this.workList = []
      this.current = 1
      await this.getWorkList()
    },
    onLoad() {
      // 异步更新数据
      this.current++
      this.getWorkList()
    },
    // 去添加
    goTaskAdd () {
      this.$router.push('/taskAdd')
    },
    // 去处理详情页
    goHandle (item) {
      this.$router.push({path: '/taskHandle1', query: { wordId: item.workId, type: this.changePickerFlag, title: item.title, nowUserName: item.nowUserName }})
    },
    getWorkList () {
      apiWorkList({
        current: this.current,
        size: this.size,
        type: this.changePickerFlag
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
        this.workList = this.workList.concat(dataArr)
        if (this.workList.length >= this.total) {
          this.finished = true
        }
      })
    }
  },
  async mounted () {
    await this.getWorkList()
  }
}
</script>
<style lang="scss">
.task {
  .van-nav-bar {
    // .van-icon {
    //   color: #000;
    // }
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
  .task-container {
    .vanButtonGrounp {
      padding: 0 10px;
      text-align: center;
      background: #fff;
      .van-button {
        width: 25%;
        border: 1PX solid #ccc;
        background: #fff;
      }
      .van-button-activity {
        background: #1989fa;
        border: 1PX solid #1989fa;
        color: #fff;
      }
    }
    .van-list {
      > ul {
        li {
          margin: 5px 10px;
          padding: 8px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1PX solid #ccc;
          dl {
            display: flex;
            align-items: center;
            font-size: 14px;
            dd {
              width: 220px;
              margin-left: 10px;
              word-break:keep-all;/* 不换行 */
              white-space:nowrap;/* 不换行 */
              overflow:hidden;
              text-overflow:ellipsis;
            }
          }
        }
        // li:last-child {
        //   border-bottom: none;
        // }
      }
    }
  }
}
</style>
