<template>
  <div class="repair">
    <van-nav-bar title="报修新隐患" left-arrow @click-left="goHome"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="title" label="标题" clearable placeholder="请输入标题" />
      <van-field v-model="newRiskLogDto.remark" rows="3" autosize label="描述" type="textarea" placeholder="请输入描述" />
      <van-cell title="上传" class="vantUpload">
        <template #right-icon>
          <van-uploader  v-model="temUploadFile" :after-read="afterRead" :before-delete="delUpload" multiple />
        </template>
      </van-cell>
      <van-field label="所属区域" v-model="area" placeholder="点击选择区域" @click="areaPicker = true" readonly />
      <van-popup v-model="areaPicker" position="bottom">
        <van-picker
          show-toolbar
          value-key="name"
          :columns="areaList"
          @confirm="areaConfirm"
          @cancel="areaPicker = false"
        />
      </van-popup>
    </van-cell-group>
    <div class="repairFood">
      <van-button plain type="info" size="small" @click="$router.push('/home')">取消</van-button>
      <van-button type="info" @click="onConfirm" size="small">提交</van-button>
    </div>
  </div>
</template>
<script>
import { apiAreaList, apiAreaAdminList, apiUploadFile, apiAddRisk, apiDelUploadFile } from '@/services/api/index'
export default {
  data () {
    return {
      title: '',
      newRiskLogDto: {
        remark: '',
        newRiskLogImageDto: {
          riskImages: []
        }
      },
      fileList: [],
      temUploadFile: [],
      uploadFile: '',
      area: '',
      areaId: '',
      areaList: [],
      areaAdminUserList: [],
      adminUserId: '',
      adminUserName: '',
      areaPicker: false
    }
  },
  methods: {
    // 返回首页
    goHome () {
      this.$router.push('/home')
    },
    // 上传文件
    afterRead (file) {
      const data = new FormData()
      data.append('file', file.file)
      file.status = 'uploading'
      file.message = '上传中...'
      apiUploadFile(data)
        .then(res => {
          if (res.resultCode === 1) {
            file.status = 'done'
            file.message = '上传成功'
            this.newRiskLogDto.newRiskLogImageDto.riskImages.push(res.filepath)
            this.fileList.push(res)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
        .catch(() => {
          file.status = 'failed'
          file.message = '上传失败'
        })
    },
    // 删除上传文件
    delUpload (file, detail) {
      let filepath = this.newRiskLogImageDto.newRiskLogImageDto.riskImages[detail.index]
      apiDelUploadFile({ filepath: filepath }).then(res => {
        if (res.status === 202) {
          this.newRiskLogDto.newRiskLogImageDto.riskImages.splice(detail.index, 1)
          this.temUploadFile.splice(detail.index, 1)
        }
      })
    },
    // 区域选择确认
    async areaConfirm (val) {
      await apiAreaAdminList({ areaId: val.id }).then(res => {
        if (res.length === 1) {
          this.areaAdminUserList = res[0]
          this.adminUserName = res[0].userName
          this.adminUserId = res[0].userId
        } else if (res.length === 0) {
          this.$toast('该区域目前并无管理人员')
        }
      })
      this.area = val.name
      this.areaId = val.id
      this.areaPicker = false
      
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
      if (!this.newRiskLogDto.remark) {
        this.$toast('描述不能为空')
        return false
      }
      if (this.newRiskLogDto.newRiskLogImageDto.riskImages.length === 0) {
        this.$toast('还未上传内容')
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
          newRiskLogDto: this.newRiskLogDto,
          title: this.title
        })
          .then(res => {
            if (res.status === 201) {
              this.$router.push('/home')
            }
          })
      }
    },
    // 获取区域列表
    getAreaList () {
      apiAreaList().then(res => {
        this.areaList = res
      })
    }
  },
  mounted () {
    this.getAreaList()
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
    padding: 0 10px;
    .van-field {
      .van-cell__title {
        width: 4em;
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
          width: 4em;
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
  }
  .repairFood {
    margin-top: 20px;
    text-align: center;
    .van-button {
      margin: 0 10px;
      padding:  10px 20px;
      border-radius: 15px;
    }
    .van-button:first-child {
      color: #fff;
      background: #fe657d;
      border: 1PX solid #fe657d;
    }
  }
}
</style>
