<template>
  <div class="health-right">
    <h1>消息中心</h1>
    <ul>
      <li>
        <b>任务管理：</b>
        <p>2019-2020年度第一学期学校卫生工作计划</p>
        <span>2019-06-12</span>
      </li>
      <li>
        <b>任务管理：</b>
        <p>2019-2020年度第一学期学校卫生工作计划</p>
        <span>2019-06-12</span>
      </li>
      <li>
        <b>任务管理：</b>
        <p>2019-2020年度第一学期学校卫生工作计划</p>
        <span>2019-06-12</span>
      </li>
      <li>
        <b>任务管理：</b>
        <p>2019-2020年度第一学期学校卫生工作计划</p>
        <span>2019-06-12</span>
      </li>
      <li>
        <b>任务管理：</b>
        <p>2019-2020年度第一学期学校卫生工作计划</p>
        <span>2019-06-12</span>
      </li>
      <li>
        <b>任务管理：</b>
        <p>2019-2020年度第一学期学校卫生工作计划</p>
        <span>2019-06-12</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    }
  }
}
</script>
<style lang="scss" scoped>
.health-right {
  h1 {
    height: 56px;
    padding-left: 20px;
    line-height: 56px;
    font-size: 22px;
    color: rgba(34,34,34,1);
    background: rgba(243,243,243,1);
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
  ul {
    li {
      padding:0 16px;
      line-height: 38px;
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
        font-family:ArialMT;
        color:rgba(34,34,34,1);
        cursor: pointer;
      }
    }
  }
}
</style>
