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
import { useStore } from 'vuex'
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
    const store = useStore()
    return { count, store }
  },
  mounted () {
    console.log(this.store)
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
