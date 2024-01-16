<template>
  <div class="app">
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

definePageMeta({ middleware: 'auth' })
const router = useRouter()

router.push({ path: '/invoices' })

</script>

<style></style>