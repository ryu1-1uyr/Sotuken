<template>
  <div>
    <canvas id='myCanvas'></canvas>
  </div>
</template>

<script>
  export default {
    name: "screen",
    head: {
      script: [
        {src: 'https://cdn.jsdelivr.net/npm/three@0.110.0/build/three.min.js'},
        {src: 'https://cdn.jsdelivr.net/npm/three-orbitcontrols@2.108.1/OrbitControls.min.js'},
        // {src: '@/assets/index.js'},
        // {src: '../assets/myFunctionDefinition.js'},
      ],
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'}
      ]
    }
  }


</script>

<!--<script src="~/assets/three.js"></script>-->
<!--<script src="~/assets/index.js"></script>-->

<style scoped>

</style>
