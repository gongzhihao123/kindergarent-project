<template>
  <div class="upload-button">
    <el-upload
      :limit="10"
      ref="upload"
      :before-upload="before"
      :on-success="success"
      :on-remove="handleRemove"
      :action="uploadPath"
      :multiple='true'
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">{{mesg}}</el-button>
    </el-upload>
  </div>
</template>
<script>
import {error} from '@/utils/handle.js'
export default {
  name: 'uploadButton',
  props: [
    'fileList',
    'mesg'
  ],
  data () {
    return {
      loadBefore: 0,
      loadSuccess: 0,
      form: []
    }
  },
  watch: {
    fileList: {
      handler: function () {
        this.form = this.fileList
      },
      immediate: true
    }
  },
  methods: {
    before (file) {
      const reg = new RegExp(/[.jpg.JPG.png.PNG.doc.DOC.docx.DOCX]$/)
      if (!reg.test(file.name)) {
        error('请上传jpg 或 png 图片或者word文档')
        return false
      }
      this.loadBefore++
    },
    success (data, file, fileList) {
      this.loadSuccess++
      this.form = []
      if (this.loadBefore === this.loadSuccess) {
        fileList.forEach((elem) => {
          this.form.push({
            filename: elem.name, filepath: elem.response ? elem.response.result.filePath : elem.url
          })
        })
        this.$emit('save', this.form)
      }
    },
    handleRemove (file, fileList) {
      this.loadSuccess = 0
      this.loadBefore = 0
      this.form = []
      fileList.forEach((elem) => {
        this.form.push({
          filename: elem.name, filepath: elem.response ? elem.response.result.filePath : elem.url
        })
      })
    },
    save () {
      this.$refs.upload.submit()
      setTimeout(() => {
        if (this.loadSuccess === this.loadBefore && this.loadBefore === 0) {
          this.$emit('save', this.form)
        }
      }, 500)
    },
    cancel () {
      this.loadSuccess = 0
      this.loadBefore = 0
      this.form = []
      this.$refs.upload.clearFiles()
    }
  },
  computed: {
    uploadPath () {
      const routePath = document.querySelector('#contextPath').value
      return window.location.origin + routePath + '/common/teacherUpload'
    }
  }
}
</script>
<style>
.upload-button {

}
</style>
