<template>
    <div id="editor">
        <div class="row">
            <div class="col-4">
                <p class="title">行動リスト</p>
                <draggable class="dragArea list-group" :list="list1"
                           :group="{ name: 'people', pull: 'clone', put: false }" @change="log">
                    <div class="list-group-item" v-for="element in list1">
                        {{ element.name }}
                    </div>
                </draggable>
            </div>

            <div class="col-8">
                <p class="title">行動順</p>
                <draggable class="dragArea list-group" :list="list2" group="people" @change="log">
                    <div class="list-group-item" v-for="(element, idx) in list2" v-bind:class="element.class">
                        {{ element.name }}<i class="fa fa-times close" @click="removeAt(idx)">X</i>

                        <div v-if="element.command === 'Lstart'">
                            <input type="number" class="form-control" v-model="element.howLoop"/>
                        </div>
                    </div>
                </draggable>
            </div>

        </div>


        <div class="footer">
            <input style="margin-top: 30px" type="button" value="行動開始するボタン" @click="makeMoveList">
            <input style="margin-top: 30px" type="button" value="つーぴーも動かす" @click="moveSomePlayer">
        </div>

    </div>
</template>

<script>
    import draggable from '../node_modules/vuedraggable'

    export default {
        name: 'app',
        components: {
            draggable,
        },
        data: function () {
            return {
                loopCountList: [0],
                loopCountIndex: 0,
                list1: [
                    {name: "1歩進む", id: 1, command: 'W', class: ''},
                    {name: "右を向く", id: 2, command: 'E', class: ''},
                    {name: "左を向く", id: 3, command: 'Q', class: ''},
                    {name: "攻撃する", id: 4, command: 'F', class: ''},
                    {name: "1歩後退", id: 7, command: 'S', class: ''},
                    {name: "繰り返し", id: 5, command: 'Lstart', howLoop: 0, class: 'red'},
                    {name: "繰り返し終了", id: 6, command: 'Lend', class: 'red'},
                ],
                list2: [
                    {name: "1歩進む", id: 1, command: 'W', class: ''},
                ],
                list: [
                    {name: "John", text: "", id: 0},
                    {name: "Joao", text: "", id: 1},
                    {name: "Jean", text: "", id: 2}
                ],
                dragging: false,
                p1: {
                    name: 'sigeru',//これちゃんと自機だってわかる名前にしような
                    x: 0,
                    y: 400,
                    image: sigeru,
                    direction: 0,
                    HP: 100,
                    MP: 100,
                    commands: [],
                    isPlayer: true
                },
                p2: {
                    name: 'kumasan',
                    x: 400,
                    y: 0,
                    image: fukuoka,
                    direction: 0,
                    HP: 100,
                    MP: 100,
                    commands: ["W", "W", "E", "W", "W", "E", "W", "W", "E", "W", "W"],// 2pのこの値をとこかしらからfetchとかしたら、すぐオンライン対戦できるようになる
                    isPlayer: false
                },
            }
        },
        methods: {
            moveSomePlayer() {
                this.makeMoveList()
                eval(this.makeCode(this.p2))
            },
            evalcode() {
                eval(this.makeCode(this.p1))
                this.p1.commands.length = 0
            },
            addList: (value) => (commands) => {
                commands.push(value)
                console.log(commands, value)
            },
            makeMoveList() {
                this.list2.map(x => {
                    console.log(x.command)
                    this.addList(x.command)(this.p1.commands)
                    if (x.command === 'Lstart') {
                        this.loopCountList.push(x.howLoop)
                        this.loopCountIndex = 1 + this.loopCountIndex | 0
                    }
                })
                console.log(p1, this.loopCountList)

                this.evalcode()
            },
            log: function (evt) {
                window.console.log(evt);
            },
            removeAt(idx) {
                this.list2.splice(idx, 1);
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
                            stringCode += `for(let i=0;i<${this.loopCountList[this.loopCountIndex]};i=(i+1)|0){`
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
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        /*-webkit-font-smoothing: antialiased;*/
        /*-moz-osx-font-smoothing: grayscale;*/
        font-family: "M PLUS Rounded 1c",serif;
        text-align: center;
        color: #020402;
        margin-top: 60px;
    }

    .red {
        background: rgba(255, 119, 112, 0.95);
    }
    .row {
        text-align: center;
    }
    .title {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: 20px;
        background: #fff8f3;
        border-radius: 50px;
        font-size: 20px;
    }
    .footer {
        position: absolute;/*←絶対位置*/
        bottom: 0; /*下に固定*/
        width: 100%;
    }

    .footer input {
        background: #90A8C3;
        padding:5px;
        border-radius: 20px;

        color: #fff;

        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        transition: all  0.3s ease;
    }
    .footer input:hover {
        background: #D496A7;
        color: #020402;
    }
</style>
