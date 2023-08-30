<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <el-button @click="count++">count is {{ count }}</el-button>
  <div>
    <el-card>12</el-card>
  </div>

    

 
</template>

<style scoped>

</style>
