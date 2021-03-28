<template>
  <div class="file-upload">
    <textarea v-model="uploadUrls" placeholder="支持多种类型下载地址" @input="error = ''" />
    <p class="file-upload__error" v-show="error">{{ error }}</p>
    <p class="file-upload__folder"><input type="text" value="/android/download/mp4"></p>
    <a class="file-upload__btn" href="javascript:;" @click="onUpload" :class="{'disabled': uploadUrls.length === 0}">下载</a>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { checkValidLink } from '../../utils'

const errTxts = ['最多支持同时添加50个链接', '请输入正确的链接地址', '操作未成功，请稍后重试']

export default defineComponent({
  name: "上传",
  data () {
    return {
      uploadUrls: '',
      error: '',
      isLoading: false,
    }
  },
  setup: () => {
    document.title = "添加下载链接"
    const store = useStore()
    return { store }
  },
  methods: {
    async onUpload () {
      if (this.uploadUrls === '') return
      const urls = this.uploadUrls.split('\n').filter(v => v && checkValidLink(v))
      if (urls.length === 0) {
        return this.error = errTxts[1]
      }
      if (urls.length > 50) {
        return this.error = errTxts[0]
      }
      if (this.isLoading) return
      this.isLoading = true
    }
  }
})

</script>

<style lang="stylus" scoped>
@import "../assets/px2rem.styl"

.file-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__btn {
    width: 280px;
    height: 40px;
    line-height: 40px;
    background: #3F85F;
  }
}
textarea {
  margin-top: 36px;
  width: 100%;
  height: 360px;
  background: #F0F1F2;
  border-radius: 24px;
  padding: 36px;
  box-sizing: border-box;
  font-size: 42px;
  color: #26292D;
}
</style>