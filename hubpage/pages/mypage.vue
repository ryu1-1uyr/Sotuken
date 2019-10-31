<template>
  <div class="container">
    <div id="main">
      <h1>こんにちは、{{this.$auth.$state.user.name}}さん!</h1>

      <div>

          <div class="button-4" v-b-tooltip.hover title="新しい戦闘AIを作成します">
            <div class="eff-4"></div>
            <a href="/create"> 新規AIの作成 </a>
          </div>

        <div class="button-4" v-b-tooltip.hover title="作ったAIを戦わせましょう！">
          <div class="eff-4"></div>
          <a href="/list"> 戦いに行く </a>
        </div>
        <div class="button-4" v-b-tooltip.hover title="すいません未実装です!!!!!!!!!!!">
          <div class="eff-4"></div>
          <a> ランキング </a>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "mypage",
  }
</script>

<style scoped>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  #main {
    margin: 100px;
    border: #34495e solid 1px;
    padding: 10px 70px 70px 70px;
  }

  h1 {
    margin: 50px 0;
    padding-bottom: 30px;
  }


  .button-4 {
    width: 140px;
    height: 50px;
    border: 2px solid #34495e;
    float: left;
    text-align: center;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 10px ;
  }

  .button-4 a {
    font-family: arial;
    font-size: 16px;
    color: #34495e;
    text-decoration: none;
    line-height: 50px;
    transition: all .5s ease;
    z-index: 2;
    position: relative;
  }

  .eff-4 {
    width: 140px;
    height: 50px;
    left: -140px;
    background: #34495e;
    position: absolute;
    transition: all .5s ease;
    z-index: 1;
  }

  .button-4:hover .eff-4 {
    left: 0;
    content: 'aaaaaa';

  }

  .button-4:hover {
    color: #fff;
    content: 'aaaaaa';
  }

  .hoge{
    background: white;
    border: none;
    color: #34495e;
    width: 100%;
    height: 100%;
  }
  .hoge:hover {
    color: #fff;
  }
  a{
    width: 100%;
    height: 100%;
  }
</style>
