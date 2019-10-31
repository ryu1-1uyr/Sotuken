<template>
  <div>
    <editor id="editor" :isBattle="true" />

  </div>
</template>

<script>
  import editor from '~/components/editor.vue'

  export default {
    name: "battle",
    components: {
      editor,
      // screen
    },
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
</style>
