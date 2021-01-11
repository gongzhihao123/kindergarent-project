<template>
  <div class="dashboard-editor-container">

  <div class="dashboard-showList">
    <dl>
      <dt>3</dt>
      <dd>今日新增</dd>
    </dl>
    <dl>
      <dt>3</dt>
      <dd>今日新增</dd>
    </dl>
    <dl>
      <dt>3</dt>
      <dd>今日新增</dd>
    </dl>
  </div>

  <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
    <div class="dashboard-chart-screen">
      <el-radio-group v-model="radioStatus" size="mini">
        <el-radio-button label="1">按时间</el-radio-button>
        <el-radio-button label="2">按区域</el-radio-button>
        <el-radio-button label="3">按提出人</el-radio-button>
      </el-radio-group>
      <p>
        <el-select v-model="selectdStatus" placeholder="请选择">
          <el-option
            v-for="item in selectList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
    </div>
    <line-chart :chart-data="lineChartData" />
  </el-row>

  <div class="dashboard-table">
    <div class="dashboard-table-screen">
      <dl>
        <dt>提出人</dt>
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </dl>
      <dl>
        <dt>所属区域</dt>
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </dl>
      <dl>
        <dt>创建时间</dt>
        <el-date-picker
          v-model="value2"
          size="mini"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </dl>
      <el-button type="primary" size="mini">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="案件名称">
      </el-table-column>
      <el-table-column
        prop="name"
        label="提出人">
      </el-table-column>
      <el-table-column
        prop="address"
        label="所属区域">
      </el-table-column>
      <el-table-column
        prop="date"
        label="提出时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="当前处理人">
      </el-table-column>
      <el-table-column
        prop="address"
        label="更新时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="mini">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total"
      @current-change="handleCurrentChange"
      :current-page.sync="current"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import LineChart from './components/LineChart'

const lineChartData = {
  newVisitis: {
    expectedData: [120, 132, 101, 134, 90, 230, 210],
    actualData: [220, 182, 191, 234, 290, 330, 310]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    LineChart
  },
  data () {
    return {
      lineChartData: lineChartData.newVisitis,
      radioStatus: 1,
      selectList: [{ id: 1, name: '月' }, { id: 2, name: '周' }, { id: 3, name: '日' }],
      selectdStatus: 1,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      pageSize: 10,
      current: 1,
      total: 1
    }
  },
  methods: {
    handleSetLineChartData (type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
<style lang="scss">
.dashboard-editor-container {
  .dashboard-showList {
    display: flex;
    justify-content: space-around;
    dl {
      width: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      dt {
        height: 150px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        border-radius: 50%;
        border: 1px solid #ccc;
      }
      dd {
        margin: 10px 0;
      }
    }
  }
  .dashboard-chart-screen {
    overflow: hidden;
    > p {
      display: flex;
      margin: 10px 0;
      justify-content: flex-end;
      .el-select {
        width: 100px;
      }
    }
  }
  .dashboard-table {
    padding: 20px;
    background: #fff;
    .dashboard-table-screen {
      display: flex;
      flex-wrap: wrap;
      > dl {
        display: flex;
        margin-right: 20px;
        align-items: center;
        dt {
          margin-right: 10px;
        }
      }
      .el-button {
        margin: 10px 0;
      }
    }
    .el-pagination {
      margin: 10px 0;
      text-align: center;
    }
  }
}
</style>
