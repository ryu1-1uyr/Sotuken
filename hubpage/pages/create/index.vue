<template>
  <div>
    <div>
<!--      <screen/>-->
      <editor id="editor"/>
    </div>
  </div>

</template>

<script>
  import editor from '~/components/editor.vue'
  // import screen from '~/components/screen.vue'


  export default {
    components: {
      editor,
      // screen
    },
    name: "index"
  }
</script>

<style scoped>
  .container {
    /*padding: 30px;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    /*justify-content: center;*/
    /*align-items: center;*/
    align-items: flex-start;
  }

  /*#editor {*/
  /*  max-width: 600px;*/
  /*  background: rgba(0, 0, 0, 0.23);*/

  /*}*/
</style>
