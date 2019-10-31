<template>
  <section class="container">
    <div id="bg-video-cover"></div>
    <video id="bg-video" src="~/assets/sample.mp4" autoplay="autoplay" muted loop></video>

    <div>

      <div class="medatu">
        <img src="~/assets/craftomy.svg"/>
        <h1 class="title">
          Craftomy
        </h1>
        <h2 class="subtitle">
          Let's fell free to make your battle AI !!!
        </h2>
      </div>



      <div class="links medatu">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >GitHub</a>

      </div>
    </div>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo
    },
    data(){
    },
    mounted(){

    }
  }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding: 15px;
  }

  #bg-video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -2;
    background-size: cover;
  }

  #bg-video-cover {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1;
    background-size: cover;
    background: rgba(0, 0, 0, 0.54);
  }

  .medatu {
    width: 120%;
    background: rgba(241,241,242,0.75);
    border-radius: 20px;
  }
</style>
