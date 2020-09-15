<template>
  <div class="noticeHealth">
    <ul>
      <li>
        <div class="noticeListTitle">
          <h3>北京市疾控中心2019年第4周疫情周报</h3>
          <span>发布时间：<i>2019-08-05</i></span>
        </div>
        <p>2019年第4周（1月21日至1月27日），全市共报告法定传染病20种24275例。报告病例数居前5位的病种依次为: 流行性感冒、其它感染性腹泻病、肺结核、病毒性肝炎和梅毒，共占法定传染病报告发病数的98.99%。</p>
      </li>
      <li>
        <div class="noticeListTitle">
          <h3>北京市疾控中心2019年第4周疫情周报</h3>
          <span>发布时间：<i>2019-08-05</i></span>
        </div>
        <p>2019年第4周（1月21日至1月27日），全市共报告法定传染病20种24275例。报告病例数居前5位的病种依次为: 流行性感冒、其它感染性腹泻病、肺结核、病毒性肝炎和梅毒，共占法定传染病报告发病数的98.99%。</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.noticeHealth {
  margin-left: 250px;
  &>ul {
    li {
      height: 140px;
      margin-top: 40px;
      border-bottom: 1px dashed #D8D8D8;
      .noticeListTitle {
        h3 {
          display: inline-block;
          font-size: 18px;
          line-height: 24px;
          color: #2188FF;
        }
        span {
          float: right;
          color: #2188FF;
          font-size: 14px;
          i {
            font-style: normal;
          }
        }
      }
      p {
        margin-top: 21px;
        font-size: 14px;
        line-height: 28px;
        cursor: pointer;
      }
      p:hover {
        color: #f00;
      }
    }
  }
}
</style>
