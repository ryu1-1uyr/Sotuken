<template>
  <el-container>
    <el-form>
      <el-button type="primary" @click="loginWithAuthZero">Auth0でログイン
      </el-button>
    </el-form>
  </el-container>
</template>

<script>
  export default {
    methods: {
      loginWithAuthZero: function () {
        this.$auth.loginWith('auth0')
      }
    }
  }
</script>
