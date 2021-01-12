<template>
  <div class="procedureManage">
    <!-- 处理按钮 -->
    <div class="handle">
      <el-radio-group v-model="taskStatus" @change="chnageStatus">
        <el-radio-button label="1">待处理</el-radio-button>
        <el-radio-button label="2">处理中</el-radio-button>
        <el-radio-button label="3">已完成</el-radio-button>
      </el-radio-group>
      <el-button type="primary" @click="addProcess">添加任务</el-button>
    </div>
    <div class="procedure-main">
      <!-- 表格主体 -->

      <div class="content">
        <template>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column prop="startUserName" label="发起人">
            </el-table-column>
            <el-table-column prop="nowUserName" label="当前处理人">
            </el-table-column>
            <el-table-column prop="address" label="附件">
              -
            </el-table-column>
            <el-table-column label="状态">
              <template slot>
                {{
                  taskStatus * 1 === 1
                    ? "待处理"
                    : taskStatus * 1 === 2
                    ? "处理中"
                    : "已完成"
                }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)" type="primary" >查看</el-button> -->
                <el-button
                  size="small"
                  v-if="taskStatus * 1 === 1"
                  type="primary"
                  @click="goProceHandle(scope.row, 1)"
                  >去处理</el-button
                >
                <el-button
                  size="small"
                  v-else
                  type="success"
                  @click="goProceHandle(scope.row, 2)"
                  >查看</el-button
                >
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
    <el-dialog title="添加" :visible.sync="procedureDialogVisible" width="30%">
      <div class="procedureDialogVisible">
        <dl>
          <dt>标题：</dt>
          <dd>
            <el-input
              v-model="procedureName"
              placeholder="请输入标题"
            ></el-input>
            <span v-if="procedureNameFlag">您未输入标题</span>
          </dd>
        </dl>
        <dl>
          <dt>描述：</dt>
          <dd>
            <el-input
              v-model="newWorkLogDto.remark"
              placeholder="请输入描述"
            ></el-input>
            <span v-if="remarkFlag">您未输入描述</span>
          </dd>
        </dl>
        <dl style="vertical-align: top;">
          <dt>附件：</dt>
          <dd>
            <el-upload
              class="upload-demo"
              :action="uploadPath"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :headers="importHeaders"
              multiple
              :limit="3"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </dd>
          <!-- {{this.imageUrl}} -->
        </dl>
        <dl>
          <dt>指派：</dt>
          <dd>
            <el-select
              v-model="newWorkLogDto.toUserId"
              clearable
              size="small"
              @change="userChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.nickName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </dd>
        </dl>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="procedureDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="procedureDefine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/user'
var myToken = window.localStorage.getItem('token')
export default {
  data () {
    return {
      taskStatus: '1',
      // 主体
      tableData: [],
      title: '',
      remark: '',
      newWorkLogDto: {
        attachmentList: [],
        remark: '',
        toUserId: '',
        toUserName: ''
      },
      fileList: [],
      importHeaders: { Authorization: myToken },
      userList: [],
      // 弹窗
      procedureDialogVisible: false,
      procedureName: '',
      linkUrl: '',
      imageUrl: '',
      accessWechat: '1',
      procedureAdmin: '',
      procedureNameFlag: false,
      remarkFlag: false,
      dialogVisible: false,
      imageUrlFlag: '1'
    }
  },
  computed: {
    uploadPath () {
      return window.location.origin + '/platform/workLogAttachment/attachment'
    }
  },
  methods: {
    // 跳转处理页面
    goProceHandle (data) {
      this.$router.push({
        path: '/proceHandle',
        query: { type: this.taskStatus, taskId: data.id, taskTitle: data.title }
      })
    },
    // 添加任务
    addProcess () {
      this.procedureName = ''
      this.newWorkLogDto.remark = ''
      this.newWorkLogDto.attachmentList = []
      this.fileList = []
      this.procedureDialogVisible = true
    },
    // 上传
    uploadSuccess (file) {
      const obj = {}
      obj.filepath = file.filepath
      obj.filename = file.filename
      this.newWorkLogDto.attachmentList.push(obj)
    },
    handleRemove (file) {
      api.apiDelUploadFile({ filepath: file.response.filepath })
        .then(res => {
          if (res.status === 202) {
            this.newWorkLogDto.attachmentList = this.newWorkLogDto.attachmentList.filter(
              item => item.filepath !== file.response.filepath
            )
          }
        })
        .catch(() => {})
    },
    // 选择指派人
    userChange () {
      const arr = this.userList.filter(
        item => item.id * 1 === this.newWorkLogDto.toUserId * 1
      )
      this.newWorkLogDto.toUserName = arr[0].nickName
    },
    // 添加确定
    procedureDefine () {
      if (!this.checkBox()) {
        api.apiAddWork({
          nowUserId: this.nowHandleUserId,
          nowUserName: this.nowHandleUserName,
          newWorkLogDto: this.newWorkLogDto,
          title: this.procedureName
        }).then(res => {
          this.procedureDialogVisible = false
          this.getWorkList()
        })
      }
    },
    checkBox () {
      if (!this.procedureName) {
        this.procedureNameFlag = true
        return false
      }
      if (!this.newWorkLogDto.remark) {
        this.remarkFlag = true
        return false
      }
      if (this.imageUrlFlag !== '2') {
        this.imageUrlFlag = '3'
        return false
      }
      return true
    },
    chnageStatus (data) {
      this.taskStatus = data * 1
      this.getWorkList()
    },
    getWorkList () {
      api.apiWorkList({ type: this.taskStatus }).then(res => {
        this.tableData = res
      })
    },
    // 获取指派人列表
    getUserList () {
      api.apiUserlist().then(res => {
        this.userList = res
      })
    }
  },
  mounted () {
    this.getWorkList()
    this.getUserList()
  }
}
</script>
<style lang="scss" scoped>
.procedureManage {
  margin: 70px 0 0 230px;
  padding: 30px 20px;
  .handle {
    display: flex;
    justify-content: space-between;
  }
  .procedure-main {
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
          position: relative;
          margin-bottom: 10px;
          > span {
            position: absolute;
            top: 40px;
            left: 0;
            margin-left: 10px;
            color: #f00;
          }
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
            border-color: #409eff;
          }
          .el-icon-plus::before {
            color: #409eff;
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
