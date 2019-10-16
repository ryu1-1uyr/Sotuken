<template>
  <div id="app">

    <draggable class="dragArea list-group" :list="list1"
               :group="{ name: 'people', pull: 'clone', put: false }" @change="log">
      <div class="list-group-item" v-for="element in list1" v-bind:class="element.class" @click="tes(element)">
        {{ element.name }}
      </div>
    </draggable>

    <br>

    <draggable class="dragArea list-group" :list="list2" group="people" @change="log">
      <div class="list-group-item" v-for="(element, idx) in list2" v-bind:class="element.class">
        {{ element.name }}<i class="fa fa-times close" @click="removeAt(idx)">X</i>

<!--        <div v-if="element.command === 'Lstart'">-->
<!--          <input type="number" class="form-control" v-model="element.howLoop"/>-->
<!--        </div>-->
      </div>
    </draggable>

  </div>
</template>

<script>
import draggable from '../node_modules/vuedraggable'


export default {
  name: 'app',
  components: {
    draggable
  },
  data(){
    return {
      list1: [
        {name: "もし", id: 1, command: 'W', class: ''},
        {name: "近い敵", id: 2, command: 'E', class: ''},
        {name: "遠い敵", id: 3, command: 'Q', class: ''},
        {name: "接近する", id: 4, command: 'F', class: ''},
        {name: "後退する", id: 7, command: 'S', class: ''},
        {name: "攻撃", id: 5, command: 'Lstart', lass: ''},
        {name: "ゼロ距離", id: 6, command: 'Lend', class: ''},
        {name: "近距離", id: 7, command: 'Lend', class: ''},
        {name: "中距離", id: 8, command: 'Lend', class: ''},
        {name: "遠距離", id: 9, command: 'Lend', class: ''},
      ],
      list2: [
        {name: "もし", id: 1, command: 'W', class: ''},
      ],
    }
  },
  methods:{
    log: function (evt) {
      window.console.log(evt);
    },
  }
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
