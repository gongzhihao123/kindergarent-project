<template>
  <div class="doctor-top">
    <div class="doctor-top-left">
      <h1>晨午检数据统计</h1>
      <dl>
        <dt>今日统计：</dt>
        <dd>已上报班级:12，零报班级:24，未上报班级:3</dd>
      </dl>
      <ul>
        <li v-for="(item, ind) in list" :key="ind">
          <b>{{item.title}}：</b>
          <p>{{item.nei}}</p>
          <span>{{item.status}}</span>
        </li>
      </ul>
    </div>
    <div class="doctor-top-right">
      <h1>晨午检数据统计</h1>
      <dl>
        <dt>今日统计：</dt>
        <dd>已上报班级:12，零报班级:24，未上报班级:3</dd>
      </dl>
      <ul>
        <li v-for="(item, ids) in list" :key="ids">
          <b>{{item.title}}：</b>
          <p>{{item.nei}}</p>
          <span>{{item.status}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        { title: '任务管理', nei: '2019-2020年度第一学期学校卫生工作计划', status: '未审核' },
        { title: '任务管理', nei: '2019-2020年度第一学期学校卫生工作计划', status: '未审核' },
        { title: '任务管理', nei: '2019-2020年度第一学期学校卫生工作计划', status: '未审核' },
        { title: '任务管理', nei: '2019-2020年度第一学期学校卫生工作计划', status: '未审核' },
        { title: '任务管理', nei: '2019-2020年度第一学期学校卫生工作计划', status: '未审核' },
        { title: '任务管理', nei: '2019-2020年度第一学期学校卫生工作计划', status: '未审核' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.doctor-top {
  margin: 20px 0;
  .doctor-top-left {
    display: inline-block;
    width: 590px;
    height: 308px;
  }
  .doctor-top-right {
    display: inline-block;
    width: 590px;
    height: 308px;
    margin-left: 20px;
  }
  h1 {
    height: 56px;
    padding-left: 10px;
    line-height: 56px;
    font-size: 22px;
    color: rgba(34,34,34,1);
    background: rgba(243,243,243,1);
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
  dl {
    padding-left: 10px;
    margin: 16px 0;
    dt {
      display: inline-block;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(0,87,168,1);
    }
    dd {
      display: inline-block;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(34,34,34,1);
    }
  }
  ul {
    li {
      padding:0 18px;
      line-height: 45px;
      border: 1px solid rgba(243,243,243,1);
      b {
        font-style: normal;
      }
      p {
        display: inline-block;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(67,74,84,1);
        cursor: pointer;
      }
      p:hover {
        text-decoration:underline;
      }
      span {
        float: right;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(208,2,27,1);
        cursor: pointer;
      }
    }
  }
}
</style>
