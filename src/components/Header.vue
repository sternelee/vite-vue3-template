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
  data () {
    return {
      list: ['Nas-1', 'Nas-2', 'Nas-3'],
      has: true,
      val: 0
    }
  },
  setup: () => {
    console.log('create')
  }
})
</script>

<style lang="stylus" scoped>
@import "../assets/px2rem.styl"

header {
  width: 100%;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background: #F3F4F5;
  align-items: center;
  justify-content: space-between;
  section {
    width: 120px;
    height: 30px;
    background: #EAEBED;
    border-radius: 20px;
    select {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      border: none;
      background: transparent;
      outline: none;
    }
  }
}

</style>