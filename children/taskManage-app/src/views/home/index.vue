<template>
  <div class="home">
    <van-nav-bar title="工作任务管理"  left-arrow @click-left="onClickLeft">
      <template #right>
        <van-button type="info" icon="plus" size="mini" @click="goRepair">添加</van-button>
      </template>
    </van-nav-bar>
    <div class="home-container">
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
import { apiWorkList } from '@/services/api/index'
export default {
  data () {
    return {
      changePickerFlag: 1,
      // 列表
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
      window.location.href = 'http://39.104.113.97'
    },
    // 切换状态
    changePicker (val) {
      this.changePickerFlag = val * 1
      this.getWorkList()
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
        if (this.list.length >= 3) {
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
      this.$router.push({path: '/dispose', query: { wordId: item.id, type: this.changePickerFlag, title: item.title }})
    },
    getWorkList () {
      apiWorkList({
        type: this.changePickerFlag
      }).then(res => {
        this.workList = res
      })
    }
  },
  async mounted () {
    await this.getWorkList()
  }
}
</script>
<style lang="scss">
.home {
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
  .home-container {
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
