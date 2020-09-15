<template>
  <div class="portal" @click='reset'>
    <div class="portal-top">
      <div class="portal-top-content">
        <div class="portal-top-header">
          <span>LOGO</span>
          <span>丰台中小学健康大数据管理和综合服务平台</span>
          <div class="portal-login" @click.stop="record">
            登录
            <transition name="mybox">
              <div v-show="islogin" class="portal-login-content">
                <el-input v-model="username" @focus="nameFocus" @blur="nameBlur" placeholder="请输入用户名" aria-placeholder="请输入用户名">
                  <i slot="prefix" class="el-input__icon" :class="isNameFocus ? 'userNameActive' : 'userName'"></i>
                </el-input>
                <el-input v-model="password" @focus="passwordFocus" @blur="passwordBlur" placeholder="请输入密码" aria-placeholder="请输入密码">
                  <i slot="prefix" class="el-input__icon" :class="isPasswordFocus ? 'passwordActive' : 'password'"></i>
                </el-input>
                <el-button type="primary" @click="register" v-loading='loading'>登录</el-button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="portal-main">
      <div class="portal-main-hybird">
        <div class="portal-carousel">
          <el-carousel>
            <el-carousel-item v-for="item in imgData" :key="item">
              <h3 class="small"></h3>
              <img :src="item.imgUrl" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="portal-hybird-newShow">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="丰台新闻" name="first">
              <ul>
                <template v-for="(item, index) in this.lists" >
                  <li v-if="index < 3" :key="index" @click="$router.push('/notice/noticeNews')"><p>中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas</p><span>2019-08-23</span></li>
                </template>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="北京新闻" name="second">
              <ul>
                <template v-for="(item, index) in this.lists" >
                  <li v-if="index < 4" :key="index" @click="$router.push('/notice/noticeNews')"><p>中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas</p><span>2019-08-23</span></li>
                </template>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="国内新闻" name="third">
              <ul>
                <template v-for="(item, index) in this.lists" >
                  <li v-if="index < 5" :key="index" @click="$router.push('/notice/noticeNews')"><p>中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas</p><span>2019-08-23</span></li>
                </template>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="portal-clear"></div>
      <div class="portal-newsList">
        <div class="portal-listShow listShow1">
          <div class="portal-more">
            <h2>通知公告</h2>
            <i @click="$router.push('/notice/noticeNews')">more ></i>
          </div>
          <ul>
            <template v-for="(item, index) in this.lists" >
              <li v-if="index < 4" :key="index" @click="$router.push('/notice/noticeNews')"><p>中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas</p><span>2019-08-23</span></li>
            </template>
          </ul>
        </div>
        <div class="portal-listShow listShow2">
          <div class="portal-more">
            <h2>通知公告</h2>
            <i @click="$router.push('/notice/noticeNews')">more ></i>
          </div>
          <ul>
            <template v-for="(item, index) in this.lists" >
              <li v-if="index < 4" :key="index" @click="$router.push('/notice/noticeNews')"><p>中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas</p><span>2019-08-23</span></li>
            </template>
          </ul>
        </div>
      </div>
      <div class="portal-imgShow">
        <el-carousel :autoplay='false'>
          <el-carousel-item v-for="item in imgsData" :key="item">
            <h3 class="small"></h3>
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="portal-newsList">
        <div class="portal-listShow listShow3">
          <div class="portal-more">
            <h2>通知公告</h2>
            <i @click="$router.push('/notice/noticeNews')">more ></i>
          </div>
          <ul>
            <template v-for="(item, index) in this.lists" >
              <li v-if="index < 4" :key="index" @click="$router.push('/notice/noticeNews')"><p>中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas</p><span>2019-08-23</span></li>
            </template>
          </ul>
        </div>
        <div class="portal-listShow listShow4">
          <div class="portal-more">
            <h2>通知公告</h2>
            <i @click="$router.push('/notice/noticeNews')">more ></i>
          </div>
          <ul>
            <template v-for="(item, index) in this.lists" >
              <li v-if="index < 4" :key="index" @click="$router.push('/notice/noticeNews')"><p>中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas</p><span>2019-08-23</span></li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="potar-clear"></div>
    <div class="portal-foot">
      <div class="portal-foot-main">
        <ul>
          <li>关于我们</li>/<li>版权信息</li>/<li>免责声明</li>/<li>联系我们</li>
        </ul>
        <p>
          丰台区体卫中心主办&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;京ICP备15022000号
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { success, error } from './../../utils/index.js'
export default {
  data () {
    return {
      visible: false,
      islogin: false,
      username: '',
      isNameFocus: false,
      password: '',
      isPasswordFocus: false,
      loading: false,
      lists: [
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' },
        { context: '中共北京市委教育工委市教委机关系统召开“不忘初心，牢记初心”asdsadasas', time: '2019-08-23' }
      ],
      imgData: [],
      // { imgUrl: require('@/assets/images/1.jpg') },
      // { imgUrl: require('@/assets/images/2.jpg') },
      // { imgUrl: require('@/assets/images/3.jpg') },
      // { imgUrl: require('@/assets/images/4.jpg') }],
      activeName: 'first',
      imgsData: [
        { imgUrl: require('@/assets/images/portal1.png') },
        { imgUrl: require('@/assets/images/portal2.jpg') },
        { imgUrl: require('@/assets/images/portal3.jpg') },
        { imgUrl: require('@/assets/images/portal4.jpg') }]
    }
  },
  methods: {
    reset () {
      this.islogin = false
      this.username = ''
      this.password = ''
    },
    record () {
      this.islogin = true
    },
    // 用户名获取焦点
    nameFocus () {
      this.isNameFocus = true
    },
    // 用户名失去焦点
    nameBlur () {
      this.isNameFocus = false
    },
    // 账户密码获取焦点
    passwordFocus () {
      this.isPasswordFocus = true
    },
    // 账户密码失去焦点
    passwordBlur () {
      this.isPasswordFocus = false
    },
    // 用户登录
    register () {
      if (!this.username) {
        error('用户名不能为空')
        return
      }
      if (!this.password) {
        error('密码不能为空')
        return
      }
      this.loading = true
      this.$store.dispatch('login', {
        account: 'superadmin',
        password: '123456'
      })
        .then(() => {
          success('登陆成功')
          this.$router.push('/homePage')
        })
        .catch((res) => {
          error(res.message)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.portal {
  .portal-top {
    width: 100%;
    height: 559px;
    background: #3D96F5;
    .portal-top-content {
      width: 1200px;
      margin: 0 auto;
      .portal-top-header {
        span {
          float: left;
          color: #fff;
        }
        span:first-child {
          font-size: 38px;
        }
        span:nth-child(2) {
          font-size: 24px;
          margin: 10px 0 0 10px;
        }
        .portal-login {
          position: relative;
          float: right;
          padding: 20px 0;
          background: url('./../../assets/img/portal_login.png') no-repeat center;
          padding-left: 90px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
          .portal-login-content {
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 60px;
            width: 234px;
            height: 200px;
            padding:30px 40px;
            text-align: center;
            background:rgba(255,255,255,1);
            opacity:0.8;
            border-radius:10px;
          }
        }
      }
    }
  }
  .portal-main {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .portal-clear {
      clear: both;
    }
    .portal-main-hybird {
      margin-top: 80px;
    }
    .portal-newsList {
      margin-top: 55px;
      .portal-listShow:first-child {
        width: 591px;
        margin-left: 0;
      }
      .portal-listShow:last-child {
        width: 549px;
      }
      .portal-listShow {
        float: left;
        margin-left: 60px;
        .portal-more {
          width: 100%;
          h2 {
            display: inline-block;
            height: 22px;
            line-height: 22px;
            padding: 6px 20px;
            font-size:18px;
            font-family:PingFang SC;
            font-weight:500;
            color: #fff;
            border-radius:16px;
          }
          i {
            float: right;
            line-height: 36px;
            font-style: normal;
            cursor: pointer;
          }
        }
        ul {
          margin-top: 26px;
          li {
            p {
              display: inline-block;
              float: left;
              width: 450px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 40px;
              font-size: 14px;
              color: #0b250b;
            }
            span {
              float: right;
              line-height: 40px;
            }
          }
        }
      }
      .listShow1 {
        .portal-more {
          h2 {
            background:rgba(244,67,81,1);
          }
        }
        ul {
          li:hover {
            p {
              color: rgba(244,67,81,1);
            }
            color: rgba(244,67,81,1);
          }
        }
      }
      .listShow2 {
        .portal-more {
          h2 {
            background:rgba(243,152,0,1);
          }
        }
        ul {
          li:hover {
            p {
              color: rgba(243,152,0,1);
            }
            color: rgba(243,152,0,1);
          }
        }
      }
      .listShow3 {
        .portal-more {
          h2 {
            background:rgba(131,205,105,1);
          }
        }
        ul {
          li:hover {
            p {
              color: rgba(131,205,105,1);
            }
            color: rgba(131,205,105,1);
          }
        }
      }
      .listShow4 {
        .portal-more {
          h2 {
            background:rgba(110,178,251,1);
          }
        }
        ul {
          li:hover {
            p {
              color: rgba(110,178,251,1);
            }
            color: rgba(110,178,251,1);
          }
        }
      }
    }
  }
  .portal-foot {
    width: 100%;
    height: 100px;
    overflow: hidden;
    margin-top: 66px;
    background:rgba(220,220,220,1);
    .portal-foot-main {
      width: 1200px;
      margin: 0 auto;
      &>ul {
        float: left;
        li {
          display: inline-block;
          line-height: 100px;
          font-size:12px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(11,37,69,1);
          cursor: pointer;
        }
        li:hover {
          color: rgba(244,67,81,1);
        }
      }
      &>p {
        float: right;
        line-height: 100px;
        font-size: 14px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(11,37,69,1);
      }
    }
  }
}
</style>
<style lang='scss'>
.mybox-leave-active,.mybox-enter-active{
  transition: all .5s ease;
}
.mybox-leave-active,.mybox-enter{
  height: 0px !important;
}
.mybox-leave,.mybox-enter-active{
  height: 128px;
}
.portal {
  .portal-top {
    .portal-top-header {
      .portal-login {
        .portal-login-content {
          .el-input {
            width: 198px;
            margin-bottom: 15px;
            .el-input__inner {
              border-radius: 35px;
            }
            .el-input__inner:focus {
              color: #3D96F5;
            }
          }
          .el-input:first-child {
            span {
              .userName {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin: 8px 0 0 3px;
                background: url('./../../assets/img/login_user.png') no-repeat center;
                background-size: 100% 100%;
              }
              .userNameActive {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin: 8px 0 0 3px;
                background: url('./../../assets/img/login_user_active.png') no-repeat center;
                background-size: 100% 100%;
              }
            }
          }
          .el-input:nth-child(2) {
            span {
              .password {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin: 8px 0 0 3px;
                background: url('./../../assets/img/login_password.png') no-repeat center;
                background-size: 100% 100%;
              }
              .passwordActive {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin: 8px 0 0 3px;
                background: url('./../../assets/img/login_password_active.png') no-repeat center;
                background-size: 100% 100%;
              }
            }
          }
          .el-button {
            width: 198px;
            height: 32px;
            line-height: 32px;
            padding: 0;
            margin-top: 22px;
            font-size: 16px;
            border-radius: 16px;
          }
        }
      }
    }
  }
  .portal-main {
    .portal-main-hybird {
      &>.portal-carousel {
        float: left;
        border: 1px solid #ccc;
        .el-carousel {
          width: 590px;
          height: 375px;
          .el-carousel__container {
            height: 100%;
            width: 100%;
          }
        }
      }
      .portal-hybird-newShow {
        float: left;
        margin-left: 61px;
        width: 530px;
        .el-tabs {
          .el-tabs__header {
            border-bottom: none;
            margin: 0 0 30px;
            .el-tabs__nav-wrap {
              .el-tabs__nav {
                border: none;
                &>.el-tabs__item {
                  height: 30px;
                  line-height: 30px;
                  margin-left: 20px;
                  border: none;
                }
                .el-tabs__item:first-child {
                  margin-left: 0;
                }
                .el-tabs__item:hover {
                  border-radius: 15px;
                  background: #3D96F5;
                  color: #fff;
                }
                .is-active {
                  border-radius: 15px;
                  background: #3D96F5;
                  color: #fff;
                }
              }
            }
          }
          .el-tabs__content {
            .el-tab-pane {
              &>ul {
                li {
                  cursor: pointer;
                  height: 20px;
                  margin: 10px 0 10px 0;
                  p {
                    display: inline-block;
                    float: left;
                    width: 420px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    // line-height: 40px;
                    color: #0B2545;
                  }
                  span {
                    float: right;
                    // line-height: 40px;
                  }
                }
                li:hover {
                  p {
                    color: #3D96F5;
                  }
                  color: #3D96F5;
                }
              }
            }
          }
        }
      }
    }
    .portal-imgShow {
      height: 180px;
      width: 1200px;
      float: left;
      margin: 58px auto 52px;
      overflow: hidden;
      &>.el-carousel {
        .el-carousel__container {
          height: 180px;
          .el-carousel__item {
            &>img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
