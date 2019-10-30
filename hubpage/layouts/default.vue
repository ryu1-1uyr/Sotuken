<template>
  <div>
    <Header class="header"/>
    <div id="contents">

      <nuxt/>

    </div>
    <Footer class="footer"/>
  </div>
</template>
<script>
  import Header from '~/components/header.vue'
  import Footer from '~/components/footer.vue'


  export default {
    components: {
      Header,
      Footer
    },
  }
</script>

<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;

    min-height: 900px;
    width: auto;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }

  .header {
    position: sticky;
    top: 0;
  }

  .footer {
    background-color: #eee;
    bottom: 0;
    font-size: smaller;
    padding: 0.1rem 1rem;
    text-align: center;
    position: sticky;
  }

  #contents {
    min-height: 900px;
    width: auto;
  }
</style>
