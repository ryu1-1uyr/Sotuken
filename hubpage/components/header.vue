<template>
  <div class="layout-header">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Craftomy</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">contents</b-nav-item>
          <b-nav-item href="#">about</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!--          <b-nav-form>-->
          <!--            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
          <!--            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
          <!--          </b-nav-form>-->

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">JA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="/mypage">Profile</b-dropdown-item>

            <b-dropdown-item @click="loginWithAuthZero">Sign In</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            <!--            認証あたりと組み合わせてlogin,logout分ける奴やる-->
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: "header",
    methods: {
      logout: function () {
        this.$auth.logout()
      },
      loginWithAuthZero: function () {
        this.$auth.loginWith('auth0')
      }
    }
  }
</script>

<style scoped>
  .layout-header {
    position: sticky;
    top: 0;
  }
</style>
