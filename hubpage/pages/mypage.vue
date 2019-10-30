<template>
  <el-container>
    <h1>こんにちは、{{this.$auth.$state.user.name}}さん!</h1>
  </el-container>
</template>

<script>
  export default {
    name: "mypage",
  }
</script>

<style scoped>

</style>
