<template>
  <div>登陆页</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Login',
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>
