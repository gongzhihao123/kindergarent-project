<template>
  <div class="applyManage">
    <!-- 搜索表头 -->
    <el-row>
      <el-col>
        <el-button type="primary" @click="applyDialogVisible = true">添加应用</el-button>
      </el-col>
    </el-row>
    <div class="apply-main">
      <!-- 表格主体 -->

      <div class="content">
        <template>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="应用图标"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="应用名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="链接地址">
            </el-table-column>
            <el-table-column
              prop="address"
              label="是否接入微信小程序">
            </el-table-column>
            <el-table-column
              prop="address"
              label="应用管理员">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)" type="primary" >查看</el-button> -->
                <el-button size="small" type="primary" @click="handleClick(scope.row)">编辑</el-button>
                <el-button size="small" @click="handleClick(scope.row)">禁用</el-button>
                <el-button size="small" type="danger" @click="handleClick(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination> -->
    </div>
    <!-- 添加弹框 -->
    <el-dialog
      title="添加应用信息"
      :visible.sync="applyDialogVisible"
      width="35%"
      >
      <div class="applyDialogVisible">
        <dl>
          <dt>应用名称：</dt>
          <dd>
            <el-input v-model="applyName" placeholder="请填写应用名称" @blur="nameValidation"></el-input>
          </dd>
          <span v-if="applyNameFlag">您未输入应用名称</span>
        </dl>
        <dl>
          <dt>链接地址：</dt>
          <dd>
            <el-input v-model="linkUrl" placeholder="请输入链接地址" @blur="applyLink"></el-input>
          </dd>
          <span v-if="linkUrlFlag">您未输入链接地址</span>
        </dl>
        <dl>
          <dt>应用图标：</dt>
          <dd>
            <!-- <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
            <el-upload
              action="#"
              list-type="picture-card"
              :limit='1'
              :on-preview="handleAvatarSuccess"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="imageUrl" alt="">
            </el-dialog>
          </dd>
          {{this.imageUrl}}
          <span v-if="imageUrlFlag === '3'">您未输入应用名称</span>
        </dl>
        <dl>
          <dt>是否接入微信小程序：</dt>
          <dd>
            <template>
              <el-radio v-model="accessWechat" label="1">是</el-radio>
              <el-radio v-model="accessWechat" label="2">否</el-radio>
            </template>
          </dd>
        </dl>
        <dl>
          <dt>应用管理员：</dt>
          <dd>
            <el-select v-model="applyAdmin" placeholder="请选择管理员">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </dd>
        </dl>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="applyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="applyDefine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 主体
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' }],
      // 分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 弹窗
      applyDialogVisible: false,
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      applyName: '',
      linkUrl: '',
      imageUrl: '',
      accessWechat: '1',
      applyAdmin: '',
      applyNameFlag: false,
      linkUrlFlag: false,
      dialogVisible: false,
      imageUrlFlag: '1'
    }
  },
  methods: {
    // 回调
    handleRemove () {},
    // 名称验证
    nameValidation () {
      this.applyName === '' ? this.applyNameFlag = true : this.applyNameFlag = false
    },
    // 连接验证
    applyLink () {
      this.linkUrl === '' ? this.linkUrlFlag = true : this.linkUrlFlag = false
    },
    // 上传成功
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.dialogVisible = true
      this.imageUrlFlag = '2'
    },
    // 添加确定
    applyDefine () {
      if (!this.applyName) {
        this.applyNameFlag = true
        return false
      }
      if (!this.linkUrl) {
        this.linkUrlFlag = true
        return false
      }
      if (this.imageUrlFlag !== '2') {
        this.imageUrlFlag = '3'
        return false
      }
      console.log('ddd')
    }
  }
}
</script>
<style lang="scss" scoped>
.applyManage {
  margin-left: 230px;
  padding: 30px 20px;
  .el-row {
    .el-col {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-button {
        padding: 9px 20px;
      }
    }
  }
  .apply-main {
    margin-top: 20px;
  }
  .el-dialog {
    .el-dialog__body {
      dl {
        margin: 10px 0 10px 10px;
        dt {
          display: inline-block;
        }
        dd {
          display: inline-block;
        }
        span {
         margin-left: 10px;
         color: #f00;
        }
      }
      dl:nth-child(3) {
        dd {
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
          }
          .el-icon-plus::before {
            color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            border: 1px solid #ccc;
          }
          .avatar {
            width: 100px;
            height: 100px;
            display: block;
          }
        }
      }
    }
  }
}
</style>
