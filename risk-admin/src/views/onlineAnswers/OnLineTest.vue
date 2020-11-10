<template>
  <div class="OnLineTest">
    <div class="OnLineTestContent">
      <div class="OnLineTestContentHead">
        <span>时间</span>
        <CountDown v-on:end_callback="countDownE_cb()"
          :currentTime="currentTime"
          :startTime="startTime"
          :endTime="endTime"
          :tipText="'距离订单开始还有'"
          :tipTextEnd="'距离订单关闭还剩'"
          :endText="'订单已关闭'"
          :dayTxt="'天'"
          :hourTxt="'小时'"
          :minutesTxt="'分钟'"
          :secondsTxt="'秒'">
        </CountDown>
      </div>
      <ul>
        <!-- 单选 -->
        <li v-if="changeFlag === 1">
          <p>单选单选单选阿萨德是是是所所所所所【<span>单选</span>】</p>
          <el-radio-group v-model="radio">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
          <!-- <dl>
            <dt>正确答案：D</dt>
            <dd>知识解析：少时诵诗书所所所所所所所所所所所所所所所所所所所所所</dd>
          </dl> -->
        </li>
        <!-- 多选 -->
        <li v-if="changeFlag === 2">
          <p>单选单选单选阿萨德是是是所所所所所【<span>多选</span>】</p>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
          </el-checkbox-group>
          <!-- <dl>
            <dt>正确答案：D</dt>
            <dd>知识解析：少时诵诗书所所所所所所所所所所所所所所所所所所所所所</dd>
          </dl> -->
        </li>
        <!-- 判断 -->
        <li v-if="changeFlag === 3">
          <p>单选单选单选阿萨德是是是所所所所所【<span>判断</span>】</p>
          <el-radio-group v-model="radio">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
          </el-radio-group>
          <!-- <dl>
            <dt>正确答案：D</dt>
            <dd>知识解析：少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所少时诵诗书所所所所所所所所所所所所所所所所所所所所所</dd>
          </dl> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CountDown from './../../components/countDown/countdown'
export default {
  data () {
    return {
      currentTime: 120,
      startTime: 120,
      endTime: 0,
      radio: '',
      checkList: [],
      changeFlag: 1
    }
  },
  components: {
    CountDown
  },
  methods: {
    countDownS_cb (x) {
      console.log('12', x)
    },
    countDownE_cb (x) {
      console.log('22', x)
    }
  }
}
</script>
<style lang="scss">
.OnLineTest {
  display: flex;
  justify-content: center;
  .OnLineTestContent {
    width: 800px;
    height: 100vh;
    border: 1px solid #ccc;
    .OnLineTestContentHead {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: rgb(161, 165, 157);
    }
    > ul {
      padding: 12px;
      li {
        margin: 10px 0 30px;
        > p {
          // margin-left: -10px;
          > span {
            color: fuchsia;
          }
        }
        .el-radio-group {
          display: flex;
          flex-direction: column;
          .el-radio {
            margin: 5px 0;
          }
        }
        dl {
          dt {
            margin: 5px 0;
          }
        }
        .el-checkbox-group {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          .el-checkbox__inner {
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
