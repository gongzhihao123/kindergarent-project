<template>
  <div class="testQuestion">
    <div class="testQuestionHead">
      <h3>试题标题试题标题试题标题试题标题试题标题</h3>
      <dl>
        <dt>试卷状态：<span>进行中</span></dt>
        <dd>答题分数：1545</dd>
      </dl>
    </div>
    <ul class="testQuestionContent">
      <!-- 单选 -->
      <li>
        <p>单选单选单选阿萨德是是是所所所所所【<span>单选</span>】</p>
        <el-radio-group v-model="radio">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
          <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
        <dl>
          <dt>正确答案：D</dt>
          <dd>知识解析：少时诵诗书所所所所所所所所所所所所所所所所所所所所所</dd>
        </dl>
      </li>
      <!-- 多选 -->
      <li>
        <p>单选单选单选阿萨德是是是所所所所所【<span>多选</span>】</p>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
        </el-checkbox-group>
        <dl>
          <dt>正确答案：D</dt>
          <dd>知识解析：少时诵诗书所所所所所所所所所所所所所所所所所所所所所</dd>
        </dl>
      </li>
      <!-- 判断 -->
      <li>
        <p>单选单选单选阿萨德是是是所所所所所【<span>判断</span>】</p>
        <el-radio-group v-model="radio">
          <el-radio :label="3">备选项</el-radio>
          <el-radio :label="6">备选项</el-radio>
        </el-radio-group>
        <dl>
          <dt>正确答案：D</dt>
          <dd>知识解析：少时诵诗书所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所所少时诵诗书所所所所所所所所所所所所所所所所所所所所所</dd>
        </dl>
      </li>
    </ul>
    <el-dialog
      title="提示"
      :visible.sync="testQuestionFlag"
      width="50%"
      :before-close="testQuestionClose">
      <span class="testQuestionBox">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="testQuestionFlag = false">取 消</el-button>
        <el-button type="primary" @click="testQuestionFlag = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: '',
      checkList: [],
      testQuestionFlag: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      // 分页
      total: '',
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    testQuestionClose () {}
  }
}
</script>
<style lang="scss">
.testQuestion {
  display: flex;
  flex-direction: column;
  align-items: center;
  .testQuestionHead {
    h3 {
      margin: 10px 0;
      text-align: center;
    }
    dl {
      display: flex;
      justify-content: center;
      align-items: center;
      dt {
        span {
          color: forestgreen;
        }
      }
      dd {
        margin: 0 20px;
      }
    }
  }
  .testQuestionContent {
    li {
      max-width: 650px;
      margin: 10px 0;
      > p {
        margin-left: -10px;
        > span {
          color: fuchsia;
        }
      }
      .el-radio-group {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        .el-radio {
          margin: 5px 0;
        }
      }
      dl {
        dt {
          margin: 10px 0;
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
</style>
<style scoped></style>
