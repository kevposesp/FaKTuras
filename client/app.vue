<template>
  <div>
    <TheHeader />
    <NuxtPage />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

const store = useUserStore()

store.getUser()

onMounted(() => {
    initFlowbite();
})

</script>
