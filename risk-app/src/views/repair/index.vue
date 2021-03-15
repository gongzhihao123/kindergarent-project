<template>
  <div class="repair">
    <van-nav-bar title="添加新隐患" left-arrow @click-left="goHome"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="title" label="标题" clearable placeholder="请输入标题" />
      <van-field v-model="riskLog.remark" rows="3" autosize label="描述" type="textarea" placeholder="请输入描述" />
      <van-cell title="上传" class="vantUpload">
        <template #right-icon>
          <van-uploader  v-model="temUploadFile" :after-read="afterRead" :max-size="10 * 1024 * 1024" @oversize="onOversize" :before-delete="delUpload" multiple />
        </template>
      </van-cell>
      <van-field class="beLongArea" label="所属区域" v-model="area" placeholder="点击选择区域" @click="areaPicker = true" readonly />
      <van-popup v-model="areaPicker" position="bottom">
        <van-picker
          show-toolbar
          value-key="areaName"
          :columns="areaList"
          @confirm="areaConfirm"
          @cancel="areaPicker = false"
        />
        <van-pagination v-if="areaTotal" v-model="current" force-ellipses :total-items="areaTotal" :show-page-size="3" />
      </van-popup>
      <van-field class="beLongArea" label="隐患等级" v-model="level" placeholder="点击选择" @click="levelPicker = true" readonly />
        <van-popup v-model="levelPicker" position="bottom">
          <van-picker
            show-toolbar
            value-key="name"
            :columns="levelList"
            @confirm="levelConfirm"
            @cancel="levelPicker = false"
          />
        <!-- <van-pagination v-if="levelTotal" v-model="current" force-ellipses :total-items="areaTotal" :show-page-size="3" /> -->
      </van-popup>
    </van-cell-group>
    <div class="repairFood">
      <van-button plain type="info" size="small" @click="$router.push('/home')">取消</van-button>
      <van-button type="info" @click="onConfirm" size="small">提交</van-button>
    </div>
  </div>
</template>
<script>
import { apiAreaList, apiRiskLevelList, apiUploadFile, apiAddRisk, apiDelUploadFile, apiDictDetail } from '@/services/api/index'
export default {
  data () {
    return {
      current: 1,
      pageSize: 6,
      areaTotal: '',
      title: '',
      riskLog: {
        remark: '',
        riskLogAttachment: {
          attachmentList: []
        }
      },
      temUploadFile: [],
      uploadFile: '',
      area: '',
      areaId: '',
      areaList: [],
      areaAdminUserList: [],
      adminUserId: '',
      adminUserName: '',
      areaPicker: false,
      levelPicker: false,
      level: '',
      levelId: '',
      levelList: [],
    }
  },
  methods: {
    // 返回首页
    goHome () {
      this.$router.push('/home')
    },
    onOversize () {
      this.$toast('文件大小不能超过10M')
    },
    // 上传文件
    afterRead (file) {
      const data = new FormData()
      data.append('file', file.file)
      file.status = 'uploading'
      file.message = '上传中...'
      apiUploadFile(data)
        .then(res => {
          if (res.code === 200) {
            file.status = 'done'
            file.message = '上传成功'
            this.riskLog.riskLogAttachment.attachmentList.push(res.data)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
        .catch((err) => {
          file.status = 'failed'
          file.message = '上传失败'
        })
    },
    // 删除上传文件
    delUpload (file, detail) {
      if (file.status === 'done') {
        let attachmentId = this.riskLog.riskLogAttachment.attachmentList[detail.index].attachmentId
        apiDelUploadFile(attachmentId).then(res => {
          if (res.code === 200) {
            this.riskLog.riskLogAttachment.attachmentList.splice(detail.index, 1)
            this.temUploadFile.splice(detail.index, 1)
          }
        })
      } else {
        // 只有上传失败的图片的情况下
        this.temUploadFile.splice(detail.index, 1)
      }
    },
    // 区域选择确认
    async areaConfirm (val) {
      if (val.admin) {
        this.adminUserName = val.admin.nickname
        this.adminUserId = val.admin.userId
      } else {
        this.$toast('该区域目前并无管理人员')
      }
      this.area = val.areaName
      this.areaId = val.areaId
      this.areaPicker = false
      
    },
    // 隐患等级确认
    levelConfirm (val) {
      this.levelId = val.riskLevelId
      this.level = val.name
      this.levelPicker = false
    },
    // 验证
    checkFrom () {
      let titleTest = /^[\s\S]{6,12}$/
      if (!this.title) {
        this.$toast('标题不能为空')
        return false
      }
       else if (!titleTest.test(this.title)) {
        this.$toast('标题6个12字符')
        return false
      }
      if (!this.riskLog.remark) {
        this.$toast('描述不能为空')
        return false
      }
      if (!this.levelId) {
        this.$toast('请选择隐患等级')
        return false
      }
      if (!this.area) {
        this.$toast('请选择区域')
        return false
      }
      return true
    },
    // 表单提交
    onConfirm () {
      if (this.checkFrom()) {
        apiAddRisk({
          adminUserId: this.adminUserId,
          adminUserName: this.adminUserName,
          areaId: this.areaId,
          levelId: this.levelId,
          riskLog: this.riskLog,
          title: this.title
        })
          .then(res => {
            if (res.status === 200) {
              this.$router.push('/home')
            }
          })
      }
    },
    // 获取字典详情列表（隐患等级）
    getLevel () {
      apiRiskLevelList().then(res => {
        this.levelList = res.data
      })
    },
    // 获取区域列表
    getAreaList () {
      apiAreaList({ current: this.current, pageSize: this.pageSize }).then(res => {
        this.areaList = res.data.records
        this.areaTotal = res.data.total
      })
    }
  },
  mounted () {
    this.getAreaList()
    this.getLevel()
  }
}
</script>
<style lang="scss">
.repair {
  .van-nav-bar {
    .van-icon {
      color: #000;
    }
  }
  .van-cell-group {
    padding: 5px;
    .van-field {
      font-size: 16px;
      .van-cell__title {
        width: 4.6em;
        text-align: right;
      }
      .van-cell__value {
        padding: 5px;
        background: #eff2f2;
        border-radius: 5px;
      }
    }
    .vantUpload {
      .van-cell__title {
        flex: 0;
        text-align: right;
        margin-right: 12px;
        span {
          display: inline-block;
          width: 5.3em;
        }
      }
      .van-uploader {
        .van-uploader__wrapper {
          .van-uploader__preview {
            margin: 5px 1px;
            border: 1PX dashed #ccc;
            .van-uploader__preview-delete {
              .van-uploader__preview-delete-icon {
                top: -4px;
              }
            }
          }
          .van-uploader__upload {
            margin: 5px 1px;
            border: 1PX dashed #ccc;
          }
        }
      }
    }
    .beLongArea {
      align-items: center;
    }
  }
  .repairFood {
    margin-top: 20px;
    text-align: center;
    .van-button {
      margin: 0 10px;
      padding:  10px 20px;
      border-radius: 15px;
      font-size: 16px;
    }
    .van-button:first-child {
      color: #fff;
      background: #fe657d;
      border: 1PX solid #fe657d;
    }
  }
}
</style>
