<template>
    <div id="app">

        <div>
            <button v-on:click="show = !show">
                Toggle
            </button>
            <transition name="fade">
                <p v-if="show">hello</p>
            </transition>
        </div>


        {{list2}}
        <div class="container">
            <div class="headButton container" @click="addList(newIF())(list2)">条件分岐</div>
            <div class="headButton container"
                 v-on:mouseover="mouseoverTarget(true)"
                 v-on:mouseleave="mouseleaveTarget(false)">ターゲット
                <transition name="up">
                    <div v-if="target" class="centerContainer absolute down" @click="testlog('near')">近い</div>
                </transition>
                <transition name="down">
                    <div v-if="target" class="centerContainer absolute up" @click="testlog('far')">遠い</div>
                </transition>
            </div>
            <div class="headButton container"
                 v-on:mouseover="mouseoverMove(true)"
                 v-on:mouseleave="mouseleaveMove(false)">行動
                <transition name="rightDown">
                    <div v-if="move" class="centerContainer absolute left up" @click="testlog('unko')">接近</div>
                </transition>
                <transition name="leftDown">
                    <div v-if="move" class="centerContainer absolute right up" @click="testlog('poop')">後退</div>
                </transition>
                <transition name="up">
                    <div v-if="move" class="centerContainer absolute down" @click="testlog('yrah')">攻撃</div>
                </transition>
            </div>
            <div class="headButton container"
                 v-on:mouseover="mouseoverActionRange(true)"
                 v-on:mouseleave="mouseleaveActionRange(false)">行動範囲
                <transition name="rightDown">
                    <div v-if="actionRange" class="centerContainer absolute left up" @click="testlog('unko')">零距離</div>
                </transition>
                <transition name="leftDown">
                    <div v-if="actionRange" class="centerContainer absolute right up" @click="testlog('poop')">近距離</div>
                </transition>
                <transition name="rightUp">
                    <div v-if="actionRange" class="centerContainer absolute left down" @click="testlog('yrah')">中距離
                    </div>
                </transition>
                <transition name="leftUp">
                    <div v-if="actionRange" class="centerContainer absolute right down" @click="testlog('yeah')">遠距離
                    </div>
                </transition>
            </div>
        </div>

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
                <div v-if="atlist2.command === 'if'">
                    <h1>{{atlist2}}</h1>
                    <draggable class="dragArea container child" :list="atlist2.list" group="people" @change="log">
                        <div class="list-group-item yourArea" v-for="(element, idx) in atlist2.list">
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
                show: true,
                actionRange: false,
                move: false,
                target: false,

                list1: [
                    {name: "もし", id: 1, command: 'if', class: '', list: []},
                    {name: "近い敵", id: 2, command: 'range_near', class: ''},
                    {name: "遠い敵", id: 3, command: 'range_far', class: ''},
                    {name: "接近する", id: 4, command: 'approach', class: ''},
                    {name: "後退する", id: 7, command: 'retreat', class: ''},
                    {name: "攻撃", id: 5, command: 'bullet', lass: ''},
                    {name: "零距離", id: 6, command: 'justTarget', class: ''},
                    {name: "近距離", id: 7, command: 'nearTarget', class: ''},
                    {name: "中距離", id: 8, command: 'middleTarget', class: ''},
                    {name: "遠距離", id: 9, command: 'farTarget', class: ''},
                    {name: "射程外", id: 10, command: 'outOfRangeTarget', class: ''}
                ], // こいつらは生で今全部描画しているけど、紙にからいたUI通りアコーディオンっぽくする
                list2: [
                    {
                        name: "もし",
                        id: 1,
                        command: 'if',
                        class: '',
                        list: [{name: "近い敵", id: 2, command: 'range_near', class: ''},]
                    },
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
            newIF: () => {
                return {name: "もし", id: 1, command: 'if', class: '', list: [...new Array]}
            },
            removeAt: (idx) => (list) => {
                list.splice(idx, 1);
            },
            isIf() {
                let frag = false
                for (let elem in this.list2) {
                    console.log(elem)
                    if (elem.command === 'if') {
                        frag = true

                    }
                }
                return frag
            },
            testlog(log) {
                console.log(log)
            },
            mouseoverActionRange(TF) {
                this.actionRange = TF
            },
            mouseleaveActionRange(TF) {
                this.actionRange = TF
            },
            mouseoverMove(TF) {
                this.move = TF
            },
            mouseleaveMove(TF) {
                this.move = TF
            },
            mouseoverTarget(TF) {
                this.target = TF
            },
            mouseleaveTarget(TF) {
                this.target = TF
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

    .container {
        padding: 50px;
        display: flex;
        flex-wrap: wrap;

        justify-content: center;
        align-items: center;

    }

    .centerContainer {
        display: flex;
        flex-wrap: wrap;

        justify-content: center;
        align-items: center;

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

    .getarea {
        background: rgba(102, 0, 5, 0.36);
    }

    .headButton {
        min-width: 100px;
        min-height: 100px;
        border-radius: 180px;
        padding: 30px;
        margin: 10px;
        position: relative;
        background: rgba(40, 102, 38, 0.36);

        flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
        justify-content: center; /* 子要素をflexboxにより中央に配置する */
        align-items: center; /* 子要素をflexboxにより中央に配置する */
    }

    .absolute {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        background: rgba(20, 82, 18, 0.26);

        transform: scale(1.3);

        justify-content: center;
        align-items: center;

    }

    .left {
        right: 10px;
    }

    .up {
        bottom: 10px;
    }

    .right {
        left: 10px;
    }

    .down {
        top: 10px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s;
        /*animation: right-up 1.0s ease 0s forwards;*/
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .leftUp-enter-active, .leftUp-leave-active {
        /*transition: opacity .1s;*/
        animation: left-up 1.0s ease 0s forwards;
    }

    .leftUp-enter, .leftUp-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        animation: right-down2 1.0s ease 0s forwards;
    }

    .rightUp-enter-active, .rightUp-leave-active {
        /*transition: opacity .1s;*/
        animation: right-up 1.0s ease 0s forwards;
    }

    .rightUp-enter, .rightUp-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        animation: left-down2 1.0s ease 0s forwards;
    }

    .leftDown-enter-active, .leftDown-leave-active {
        /*transition: opacity .1s;*/
        animation: left-down 1.0s ease 0s forwards;
    }

    .leftDown-enter, .leftDown-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        animation: right-up2 1.0s ease 0s forwards;
    }

    .rightDown-enter-active, .rightDown-leave-active {
        /*transition: opacity .1s;*/
        animation: right-down 1.0s ease 0s forwards;
    }

    .rightDown-enter, .rightDown-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        animation: left-up2 1.0s ease 0s forwards;
    }

    .up-enter-active, .up-leave-active {
        /*transition: opacity .1s;*/
        animation: up1 1.0s ease 0s forwards;
    }

    .up-enter, .up-leave-to {
        animation: up2 1.0s ease 0s forwards;
    }

    .down-enter-active, .down-leave-active {
        /*transition: opacity .1s;*/
        animation: down1 1.0s ease 0s forwards;
    }

    .down-enter, .down-leave-to {
        animation: down2 1.0s ease 0s forwards;
    }

    @keyframes right-up {
        from {
            opacity: 0;
            transform: translateX(-100%) translateY(100%) scale(1);
        }
        to {
            opacity: 100%;
            transform: translateX(0%) translateY(0%) scale(1.3);
        }
    }

    @keyframes right-up2 {
        from {
            opacity: 100%;
            transform: translateX(0%) translateY(0%) scale(1.3);
        }
        to {
            opacity: 0;
            transform: translateX(100%) translateY(-100%) scale(1);
        }
    }

    @keyframes right-down {
        from {
            opacity: 0;
            transform: translateX(-100%) translateY(-100%) scale(1);
        }
        to {
            opacity: 100%;
            transform: translateX(0%) translateY(0%) scale(1.3);
        }
    }

    @keyframes right-down2 {
        from {
            opacity: 100%;
            transform: translateX(0%) translateY(0%) scale(1.3);
        }
        to {
            opacity: 0;
            transform: translateX(100%) translateY(100%) scale(1);
        }
    }

    @keyframes left-up {
        from {
            opacity: 0;
            transform: translateX(100%) translateY(100%) scale(1);
        }
        to {
            opacity: 100%;
            transform: translateX(0%) translateY(0%) scale(1.3);
        }
    }

    @keyframes left-up2 {
        from {
            opacity: 100%;
            transform: translateX(0%) translateY(0%) scale(1.3);
        }
        to {
            opacity: 0;
            transform: translateX(-100%) translateY(-100%) scale(1);
        }
    }

    @keyframes up1 {
        from {
            opacity: 0;
            transform: translateY(100%) scale(1);
        }
        to {
            opacity: 100%;
            transform: translateY(0%) scale(1.3);
        }
    }

    @keyframes up2 {
        from {
            opacity: 100%;
            transform: translateY(0%) scale(1.3);
        }
        to {
            opacity: 0;
            transform: translateY(100%) scale(1);
        }
    }

    @keyframes left-down {
        from {
            opacity: 0;
            transform: translateX(100%) translateY(-100%) scale(1);
        }
        to {
            opacity: 100%;
            transform: translateX(0%) translateY(0%) scale(1.3);
        }
    }

    @keyframes left-down2 {
        from {
            opacity: 100%;
            transform: translateX(0%) translateY(0%) scale(1.3);
        }
        to {
            opacity: 0;
            transform: translateX(-100%) translateY(100%) scale(1);
        }
    }

    @keyframes down1 {
        from {
            opacity: 0;
            transform: translateY(-100%) scale(1);
        }
        to {
            opacity: 100%;
            transform: translateY(0%) scale(1.3);
        }
    }

    @keyframes down2 {
        from {
            opacity: 100%;
            transform: translateY(0%) scale(1.3);
        }
        to {
            opacity: 0;
            transform: translateY(-100%) scale(1);
        }
    }
</style>
