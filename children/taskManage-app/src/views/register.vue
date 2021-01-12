<template>
  <div class="register">
    <van-nav-bar title="新用户注册" left-arrow></van-nav-bar>
    <div class="registerForm">
      <!-- 姓名 -->
      <div>
        <span>姓名</span>
        <van-field
          v-model="name"
          placeholder="请输入您的姓名"
        />
      </div>
      <!-- 手机号 -->
      <div>
        <span>手机号</span>
        <van-field
          v-model="phone"
          placeholder="请输入您的手机号"
        />
      </div>
      <!-- 手机号 -->
      <div>
        <span>身份</span>
        <van-field
          v-model="role"
          readonly
          clickable
          placeholder="点击选择身份"
          @click="rolePicker = true"
        />
        <van-popup v-model="rolePicker" position="bottom">
          <van-picker
            show-toolbar
            value-key="name"
            :columns="roleList"
            @confirm="roleConfirm"
            @cancel="rolePicker = false"
          />
        </van-popup>
      </div>
      <!-- 所属幼儿园 -->
      <div>
        <span>所属幼儿园</span>
        <van-field
          v-model="kindergarten"
          readonly
          clickable
          placeholder="点击选择幼儿园"
          @click="kindergartenPicker = true"
        />
        <van-popup v-model="kindergartenPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="kindergartenConfirm"
            @cancel="kindergartenPicker = false"
          />
        </van-popup>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="primary" @click="registerConfirm">
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      phone: '',
      role: '',
      roleId: '',
      kindergarten: '',
      kindergartenId: '',
      pattern: '',
      value: '',
      roleList: [ { id: 1, name: '园长' }, { id: 2, name: '副园长' }, { id: 3, name: '主任' }, { id: 4, name: 'A区域负责人' }, { id: 5, name: 'B区域负责人' }, { id: 6, name: 'C区域负责人' } ],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      kindergartenPicker: false,
      rolePicker: false
    }
  },
  methods: {
    onClickLeft () {},
    onClickRight () {},
    onFailed () {},
    checkFrom () {
      let nameTest = /^[a-zA-Z0-9]{3,6}$/
      if (!this.name) {
        this.$toast('请输入您的姓名')
        return false
      } else if (!nameTest.test(this.name)) {
        this.$toast('姓名字符长度为3-6')
        return false
      }
      let phoneTest = /^1[3456789]\d{9}$/
      if (!this.phone) {
        this.$toast('请输入您的手机号')
        return false
      } else if (!phoneTest.test(this.phone)) {
        this.$toast('手机号格式错误')
        return false
      }
      if (!this.role) {
        this.$toast('请选择身份')
        return false
      }
      if (!this.kindergarten) {
        this.$toast('请选择所属幼儿园')
        return false
      }
      return true
    },
    registerConfirm () {
      if (this.checkFrom()) {
        this.$router.replace('/home')
      }
    },
    roleConfirm(value) {
      this.role = value.name
      this.roleId = value.id
      this.rolePicker = false
    },
    kindergartenConfirm (value) {
      this.kindergarten = value
      this.kindergartenPicker = false
    }
  }
}
</script>
<style lang="scss">
.register {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .van-form {
    padding: 0 20px;
    > .van-cell {
      margin: 10px 0;
      .van-field__label {
        width: 6em;
        text-align: right;
        > span::before {
          content: '*';
          display: inline-block;
          color: #f00;
        }
      }
    }
  }
  .registerForm {
    padding: 0 20px;
    > div {
      display: flex;
      align-items: center;
      > span {
        display: inline-block;
        width: 8em;
        text-align: right;
        font-size: 14px;
      }
      > span::before {
        content: '*';
        display: inline-block;
        color: #f00;
      }
      .van-field {
        line-height: 28px;
      }
      .van-cell:after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid #ebedf0;
        transform: scaleY(.5);
      }
    }
  }
}
</style>
