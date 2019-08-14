<template>
    <div id="editor">
        <div>
            <input id="button_W" type="button" value="W" style="padding-left: 64px;text-align: center"
                   @click="addList('W')(p1.commands)"><br>
            <input type="button" value="rotate 90 hidari"
                   @click="addList('Q')(p1.commands)">
            <input id="button_S" type="button" value="S" style="padding-left: 64px;text-align: center"
                   @click="addList('S')(p1.commands)">
            <input type="button" value="rotate 90 migi"
                   @click="addList('E')(p1.commands)">
            <br>
            <input type="button" value="前方へ攻撃" @click="addList('F')(p1.commands)"><br>
            ループ回数<input type="number" v-model="loopCount">
            <input type="button" value="Loop開始" @click="addList('Lstart')(p1.commands)">
            <input type="button" value="Loop終了" @click="addList('Lend')(p1.commands)"><br>

            <input type="button" value="move at vue" @click="eval(makeCode(p1));p1.commands.length = 0"><br>

            <input type="button" value="moveSomePlayer"
                   @click="eval(makeCode(p1));eval(makeCode(p2));p1.commands.length = 0"><br>

        </div>

        <div class="row">
            <div class="col-4">
                <p>行動リスト</p>
                <draggable class="dragArea list-group" :list="list1" :group="{ name: 'people', pull: 'clone', put: false }" @change="log">
                    <div class="list-group-item" v-for="element in list1">
                        {{ element.name }}
                    </div>
                </draggable>
            </div>

            <div class="col-8">
                <p>行動順</p>
                <draggable class="dragArea list-group" :list="list2" group="people" @change="log">
                    <div class="list-group-item" v-for="(element, idx) in list2" >
                        {{ element.name }}<i class="fa fa-times close" @click="removeAt(idx)">X</i>

                        <div v-if="element.command === 'Lstart'">
                            <input type="number" class="form-control" v-model="element.howLoop" />
                        </div>
                    </div>
                </draggable>
            </div>

<!--            <div class="col-3" :value="list1" title="List 1"></div>-->

<!--            <div class="col-3" v-for="(element, idx) in list2" title="List 2">-->
<!--                {{element}} と {{idx}}-->
<!--            </div>-->
        </div>


<!--        <div class="col-8">-->
<!--&lt;!&ndash;            <h3>Draggable {{ draggingInfo }}</h3>&ndash;&gt;-->

<!--            <draggable tag="ul" :list="list" class="list-group" handle=".handle">-->
<!--                <li-->
<!--                        class="list-group-item"-->
<!--                        v-for="(element, idx) in list"-->
<!--                        :key="element.name"-->
<!--                >-->
<!--                    <i class="fa fa-align-justify handle"></i>-->

<!--                    <span class="text">{{ element.name }} </span>-->

<!--                    <input type="text" class="form-control" v-model="element.text" />-->

<!--                    <i @click="removeAt(idx)">asasfasfsaf</i>-->
<!--                </li>-->
<!--            </draggable>-->
<!--        </div>-->

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
                loopCount: 0,
                list1: [
                    {name: "1歩進む", id: 1, command: 'W'},
                    {name: "右を向く", id: 2, command: 'E'},
                    {name: "左を向く", id: 3, command: 'Q'},
                    {name: "攻撃する", id: 4, command: 'F'},
                    {name: "繰り返し", id: 5, command: 'Lstart', howLoop: 0},
                    {name: "繰り返し終了", id: 6, command: 'Lend'},
                    {name: "1歩後退", id: 7, command: 'S'},
                ],
                list2: [
                    {name: "1歩進む", id: 1, command: 'W'},
                ],
                list: [
                    { name: "John", text: "", id: 0 },
                    { name: "Joao", text: "", id: 1 },
                    { name: "Jean", text: "", id: 2 }
                ],
                dragging: false,
            }
        },
        methods: {
            addList: (value) => (commands) => {
                commands.push(value)
                console.log(commands, value)
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
