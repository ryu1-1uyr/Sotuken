<template>
    <div id="app">
        {{list2}}

        <draggable class="dragArea container" :list="list1"
                   :group="{ name: 'people', pull: 'clone', put: false }" @change="log">
            <div class="list-group-item baseElement" v-for="element in list1" v-bind:class="element.class"
                 @click="addList(element)(list2)">
                {{ element.name }}
            </div>
        </draggable>

        <br>

        <draggable class="dragArea container getarea" :list="list2" group="people" @change="log">
            <div class="list-group-item yourArea" v-for="(element, idx) in list2" v-bind:class="element.class">
                {{ element.name }}<i class="fa fa-times close" @click="removeAt(idx)(list2)">X</i>
            </div>
        </draggable>

<!--        <draggable v-if="isIf" class="dragArea container child" :list="list2">-->
<!--            <div class="list-group-item" v-for="(childrenElement, childrenidx) in list2 ">-->
<!--                {{childrenElement.name}}<i class="fa fa-times close" @click="removeAt(childrenidx)">X</i>-->
<!--            </div>-->
<!--        </draggable>-->

        <div v-if="this.list2.some((x)=> x.command === 'if')">
            <div v-for=" (atlist2, index) in list2">
                {{index}}
                <div v-if="atlist2.command === 'if'" >
                    <h1>{{atlist2}}</h1>
                    <draggable class="dragArea container child" :list="atlist2.list" group="people" @change="log" >
                        <div class="list-group-item yourArea" v-for="(element, idx) in atlist2.list" >
                            <h2>{{idx}}</h2>
                            {{ element.name }}<i class="fa fa-times close" @click="removeAt(idx)(atlist2.list)">X</i>
                        </div>

                    </draggable>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import draggable from '../node_modules/vuedraggable'

    export default {
        name: 'app',
        components: {
            draggable
        },
        data() {
            return {
                list1: [
                    {name: "もし", id: 1, command: 'if', class: '', list: []},
                    {name: "近い敵", id: 2, command: 'range_near', class: ''},
                    {name: "遠い敵", id: 3, command: 'range_far', class: ''},
                    {name: "接近する", id: 4, command: 'approach', class: ''},
                    {name: "後退する", id: 7, command: 'retreat', class: ''},
                    {name: "攻撃", id: 5, command: 'bullet', lass: ''},
                    {name: "ゼロ距離", id: 6, command: 'justTarget', class: ''},
                    {name: "近距離", id: 7, command: 'nearTarget', class: ''},
                    {name: "中距離", id: 8, command: 'middleTarget', class: ''},
                    {name: "遠距離", id: 9, command: 'farTarget', class: ''},
                    {name: "射程外", id: 10, command: 'outOfRangeTarget', class: ''}
                ], // こいつらは生で今全部描画しているけど、紙にからいたUI通りアコーディオンっぽくする
                list2: [
                    {name: "もし", id: 1, command: 'if', class: '', list: [{name: "近い敵", id: 2, command: 'range_near', class: ''},]},
                    {name: "近い敵", id: 2, command: 'range_near', class: ''},
                ],
            }
        },
        methods: {
            log: function (evt) {
                window.console.log(evt);
            },
            addList: (command) => (list) => {
                console.log(command)
                list.push(command)
            },
            removeAt: (idx)=>(list)=> {
                list.splice(idx, 1);
            },
            isIf(){
                let frag = false
                for (let elem in this.list2) {
                    console.log(elem)
                    if(elem.command === 'if') {
                        frag = true

                    }
                }
                return frag
            }

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

    .container {
        padding: 50px;
        display: flex;
    }

    .baseElement {
        background: rgba(0, 102, 23, 0.58);
        padding: 10px;
        margin: 10px;
    }

    .yourArea {
        background: rgba(48, 0, 102, 0.58);
        padding: 10px;
        margin: 10px;
    }
    .child {
        width: 500px;
        /*height: 500px;*/
        background: #9effff;
        /*z-index: -100;*/
        /*position: absolute;*/
    }
    .getarea{
        background: rgba(102,0,5,0.36);
    }
</style>
