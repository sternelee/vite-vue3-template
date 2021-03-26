<template>
  <header>
    <a href="javascript:void;" class="iconfont icon-home"></a>
    <section>
      <p v-if="!has">设备连接中</p>
      <template v-else>
        <select name="shebei" v-model="val">
          <option :value="item" v-for="item in list" :key="item">{{ item }}</option>
        </select>
      </template>
    </section>
    <a href="javascript:void;" class="iconfont icon-plus"></a>
    <a href="javascript:void;" class="iconfont icon-xiazai"></a>
  </header>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Header',
  // props: {
  //   msg: {
  //     type: String,
  //     required: true
  //   }
  // },
  setup: () => {
    const list = ref(['Nas-1', 'Nas-2', 'Nas-3'])
    const has = ref(true);
    const val = ref(0)
    return { list, has, val }
  }
})
</script>