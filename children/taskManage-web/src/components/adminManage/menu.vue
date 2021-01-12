<template>
  <div class="my-menu">
    <div class="menu-content">
      <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router='true'
      unique-opened
      background-color="#324157"
      text-color="#fff"
      active-text-color="">
        <template v-for="(item, ind) in $router.options.routes">
          <el-submenu :key="ind" :index="String(item.path)" v-if="item.meta.isNav && item.children && item.children.length > 1">
            <template slot="title">
              <img :src="item.img" alt="">
              <span class="title">{{item.meta.title}}</span>
            </template>
            <template v-for="(child, i) in item.children">
            <el-menu-item v-if='child.meta.hidden' :key="i" :index="String(child.path)">
              <span class="text">
                {{child.meta.title}}
              </span>
            </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item :key="ind" v-if="item.meta.isNav === false" :index="String(item.path)">
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-menu',
  data () {
    return {
      show: false
    }
  },
  methods: {
    btn () {
      this.show = !this.show
    },
    router (data) {
      // console.log(data)
      this.$router.push(data.path)
    }
  },
  mounted () {
    // console.log('sds', this.$router)
  }
}
</script>
<style lang='scss' scoped>
  .my-menu {
    width: 230px;
    position: fixed;
    left: 0;
    top: 70px;
    overflow-x: hidden;
    height: 100vh;
    background: #324157;
    .menu-header {
      border-bottom: 1px solid #fff;
      h1 {
        color: #fff;
        text-align: center;
        padding-top: 20px;
        font-size: 28px;
      }
      div {
        width: 100%;
        height: 80px;
        margin: 10px 0;
        img {
          display: inline-block;
          width: 80px;
          height: 80px;
          margin: 0 20px;
          border-radius: 50%;
        }
        dl {
          display: inline-block;
          color: #fff;
          vertical-align: top;
          dt {
            margin: 15px 0;
          }
        }
      }
    }
    .menu-content {
      .el-menu {
        border-right: none;
      }
    }
  }
</style>
