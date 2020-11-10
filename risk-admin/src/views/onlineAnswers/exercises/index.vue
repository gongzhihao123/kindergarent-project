<template>
  <div class="exercises">
    <div class="handleHead">
      <el-radio-group v-model="exampleType" size="small">
        <el-radio-button  label="1">单选</el-radio-button>
        <el-radio-button  label="2">多选</el-radio-button>
        <el-radio-button  label="3">判断</el-radio-button>
      </el-radio-group>
    </div>
    <div class="exercisesDetail">
      <ul>
        <!-- 单选 -->
        <li v-if="exampleType * 1 === 1">
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
        <li v-if="exampleType * 1 === 2">
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
        <li v-if="exampleType * 1 === 3">
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
export default {
  data () {
    return {
      exampleType: '1',
      checkList: []
    }
  }
}
</script>
<style lang="scss">
.exercises {
  padding: 12px;
  .exercisesDetail {
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
