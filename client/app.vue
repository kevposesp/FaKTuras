<template>
  <div>
    <TheHeader />
    <NuxtPage class="app"/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

const store = useUserStore()
store.getInfoMyUser()

onMounted(() => {
    initFlowbite();
})
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 10px;
}
</style>