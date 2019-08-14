<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ],
      loopCount: 0,
    }
  },
  methods:{
    addList: (value) => (commands) => {
      commands.push(value)
      console.log(commands,value)
    },
    // this.(data)を呼び出す場合 => で書くとthisが束縛されるので使えなくなる気をつけよ

    makeCode: function (selectedTarget) { // 絶対この関数は依存させてはならない

      console.log(selectedTarget)

      let stringCode = 'async function evalfunction () {'
      selectedTarget.commands.map((command) => {
        switch (command) {
          case 'W':
            stringCode += 'await sleep(400).then(() => {'

            if (selectedTarget.isPlayer) {
              stringCode += `switchTarget(moveup)('${selectedTarget.name}');});`
            } else {
              stringCode += `switchTarget(movedown)('${selectedTarget.name}');});`
            }

            break
          case 'A':
            stringCode += 'await sleep(400).then(() => {'
            stringCode += `switchTarget(moveleft)('${selectedTarget.name}');});`
            break
          case 'S':

            stringCode += 'await sleep(400).then(() => {'

            if (selectedTarget.isPlayer) {
              stringCode += `switchTarget(movedown)('${selectedTarget.name}');});`
            } else {
              stringCode += `switchTarget(moveup)('${selectedTarget.name}');});`
            }

            break
          case 'D':
            stringCode += 'await sleep(400).then(() => {'
            stringCode += `switchTarget(moveright)('${selectedTarget.name}');});`
            break
          case 'Q':
            stringCode += 'await sleep(400).then(() => {'
            stringCode += `switchTarget(selectRotation,-90)('${selectedTarget.name}');switchTarget(drawRotatedImage)('${selectedTarget.name}');});`
            break
          case 'E':
            stringCode += 'await sleep(400).then(() => {'
            stringCode += `switchTarget(selectRotation,90)('${selectedTarget.name}');switchTarget(drawRotatedImage)('${selectedTarget.name}');});`
            break
          case 'F':
            stringCode += 'await sleep(400).then(() => {'
            stringCode += `switchTarget(attack)('${selectedTarget.name}');});`
            break
          case 'Lstart':
            stringCode += `for(let i=0;i<${this.loopCount};i=(i+1)|0){`
            break
          case 'Lend':
            stringCode += '};'
            break
          default:
            console.error('親に向かって何だその値は')
        }
        if (selectedTarget.isPlayer) {
          stringCode += `nowTurn+=1;switchTarget(setStatusValue)('${selectedTarget.name}');switchTarget(isFinish)('${selectedTarget.name}');`

        }
      })
      stringCode += '};'
      console.log(stringCode + 'evalfunction();')
      return stringCode + 'evalfunction();'

    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
