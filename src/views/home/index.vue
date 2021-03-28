<template>
  <div class="home">
    <Header />
    <RouterView />
    <FileTab />
    <div class="file-list">
      <FileItem v-for="item in list" :key="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import FileTab from '../components/FileTab.vue'
import FileItem from '../components/FileItem.vue'

export default defineComponent({
  name: 'Home',
  components: {
    RouterView,
    Header,
    FileTab,
    FileItem
  },
  data () {
    return {
      list: Array.from({length: 3}, (_, index) => index)
    }
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>
