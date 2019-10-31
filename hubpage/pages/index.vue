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
        <div class="subtitle">
          <h2>Let's fell free to make your battle AI !!! </h2>
          <h3>あなただけの戦闘AIをつくってみましょう！</h3>
        </div>

        <div style="margin: 20px">
          <a v-scroll-to="'#about'" to
            class="button--green"
          >About me !</a>

          <a v-scroll-to="'#anchor'" to
            class="button--grey"
          >How to Play ?</a>
        </div>
      </div>


      <div class="main medatu" style="margin-top: 20px">
        <session id="about">
          <h2 style="margin-bottom: 20px">What is Craftomy ?</h2>
          <p>Craftomyは自分だけの戦闘AIがお手軽に作成しながら <br> プログラミングの構文が学べるゲームっぽいサービスです</p>
          <p>ゲーム好きのあなたも、ちょっとプログラミングに興味があるあなたも</p>
          <p>気軽にゲームがてら、戦闘AIを作成してみましょう！</p>
        </session>
      </div>

      <div class="main medatu" style="margin-top: 20px">
        <session id="anchor">
          <h2 style="margin-bottom: 20px">How to play Craftomy ?</h2>
          <p>気合いでプレイしろ。以上だ。</p>
          <p>Google認証後からあそべるようになります！！</p>
          <div>
            <p>まずはこちらから!!</p>
            <b-button>こちら</b-button>
          </div>
        </session>
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
      return {

      }
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
    width: auto;
    /*koitu */
    background: rgba(241,241,242,0.75);
    border-radius: 20px;
    padding: 40px;
    /*あとこいつが悪さしてる*/
    margin: 20px;
    margin-top: 40px;

  }
  /*#anchor {*/
  /*  display: block;*/
  /*  margin-top: 200vh;*/
  /*  margin-bottom: 100vh;*/
  /*}*/
  img{
    max-width: 300px;
    height: auto;
  }
</style>
