<template>
  <div class="health-left">
    <h1>我的应用</h1>
    <div class="health-main">
      <dl v-for="(item, ind) in list" :key="ind">
        <dt><img src="@/assets/img/default-avatar.png" alt=""></dt>
        <dd>晨午检系统</dd>
      </dl>
    </div>
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
.health-left {
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
  .health-main {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    dl {
      display: inline-block;
      margin: 0 0 10px 62px;
      dt {
        width: 90px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      dd {
        margin-top: 14px;
        text-align: center;
        font-size: 16px;
        color: rgba(74,74,74,1);
        line-height: 22px;
        font-weight: 400;
        font-family: PingFangSC;
      }
    }
    dl:nth-child(4n + 1) {
      margin-left: 0;
    }
    dl:nth-child(2n) {
      dt {
        background: rgba(0,196,217,1);
      }
    }
    dl:nth-child(2n + 1) {
      dt {
        background: rgba(76,124,251,1);
      }
    }
  }
}
</style>
