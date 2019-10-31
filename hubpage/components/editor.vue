<template>
    <div id="app">

        <div>
            <a @click="parseCode" class="btn-animation-02"><span>createCode</span></a>
            <a @click="openModal" class="btn-animation-02"><span>コマンド</span></a>
        </div>

        <div style="color: black">{{list2}}</div>

        <div id="overlay" v-show="showContent">
            <div id="content">
                <div class="container">
                    <div>
                        <a @click="closeModal" class="btn-shine">Close</a>
                    </div>
                </div>
                <div class="container">
                    <div class="headButton container"
                         v-on:mouseover="mouseoverIf(true)"
                         v-on:mouseleave="mouseleaveIf(false)">
                        <div v-if="!isif">条件分岐</div>
                        <transition name="scale">
                            <div v-if="isif" class="centerContainer absolute scale left up"
                                 @click="addList(newIF())(list2)">
                                もし
                            </div>
                        </transition>
                        <transition name="scale2">
                            <div v-if="isif" class="centerContainer absolute scale2 right down"
                                 @click="addList(newElseIF())(list2)">それ以外の時は
                            </div>
                        </transition>
                    </div>

                    <div class="headButton container"
                         v-on:mouseover="mouseoverTarget(true)"
                         v-on:mouseleave="mouseleaveTarget(false)">敵との位置
                        <transition name="up">
                            <div v-if="target" class="centerContainer absolute down"
                                 @click="addList(newNearEnemy())(list2)">
                                近い
                            </div>
                        </transition>
                        <transition name="down">
                            <div v-if="target" class="centerContainer absolute up"
                                 @click="addList(newFarEnemy())(list2)">遠い
                            </div>
                        </transition>
                    </div>
                    <div class="headButton container"
                         v-on:mouseover="mouseoverMove(true)"
                         v-on:mouseleave="mouseleaveMove(false)">行動
                        <transition name="rightDown">
                            <div v-if="move" class="centerContainer absolute left up"
                                 @click="addList(newApproach())(list2)">
                                接近
                            </div>
                        </transition>
                        <transition name="leftDown">
                            <div v-if="move" class="centerContainer absolute right up"
                                 @click="addList(newRetreat())(list2)">
                                後退
                            </div>
                        </transition>
                        <transition name="up">
                            <div v-if="move" class="centerContainer absolute down" @click="addList(newBullet())(list2)">
                                攻撃
                            </div>
                        </transition>
                    </div>
                    <div class="headButton container"
                         v-on:mouseover="mouseoverActionRange(true)"
                         v-on:mouseleave="mouseleaveActionRange(false)">行動範囲
                        <transition name="rightDown">
                            <div v-if="actionRange" class="centerContainer absolute left up"
                                 @click="addList(newjustTarget())(list2)">零距離
                            </div>
                        </transition>
                        <transition name="leftDown">
                            <div v-if="actionRange" class="centerContainer absolute right up"
                                 @click="addList(newNearTarget())(list2)">近距離
                            </div>
                        </transition>
                        <transition name="rightUp">
                            <div v-if="actionRange" class="centerContainer absolute left down"
                                 @click="addList(newMiddleTarget())(list2)">中距離
                            </div>
                        </transition>
                        <transition name="leftUp">
                            <div v-if="actionRange" class="centerContainer absolute right down"
                                 @click="addList(newFarTarget())(list2)">遠距離
                            </div>
                        </transition>
                    </div>
                </div>

            </div>
        </div>


        <!--        <small>{{list2}}</small>-->


        <!--        <draggable class="dragArea container" :list="list1"-->
        <!--                   :group="{ name: 'people', pull: 'clone', put: false }" @change="log">-->
        <!--            <div class="list-group-item baseElement" v-for="element in list1" v-bind:class="element.class"-->
        <!--                 @click="addList(element)(list2)">-->
        <!--                {{ element.name }}-->
        <!--            </div>-->
        <!--        </draggable>-->

        <br>

        <draggable class="dragArea container getarea" :list="list2" group="people" @change="log">
            <div class="list-group-item yourArea" v-for="(element, idx) in list2" v-bind:class="element.class">
                {{ element.name }}
                <!--fixme いい加減この3行のspanあたりの仕様を固めないと厳しい-->
                <span v-if="list2[idx -1]">{{list2[idx -1].nextWord}}</span>
                <span v-if="element.id === 'range'">に</span>
                <span v-if="Array.isArray(element)">の行動をする</span>

                <i class="fa fa-times close" @click="removeAt(idx)(list2)">X</i>
            </div>
        </draggable>

        <!--        <draggable v-if="isIf" class="dragArea container child" :list="list2">-->
        <!--            <div class="list-group-item" v-for="(childrenElement, childrenidx) in list2 ">-->
        <!--                {{childrenElement.name}}<i class="fa fa-times close" @click="removeAt(childrenidx)">X</i>-->
        <!--            </div>-->
        <!--        </draggable>-->
        <!--        {{this.list2.some((x)=> x.command === 'if')}}-->

        <div v-if="this.list2.some((x)=> x.command === 'if')">
            <div v-for=" (atlist2, index) in list2">
                <div v-if="Array.isArray(atlist2.list)">
                    {{index,atlist2.list}}
                    <draggable class="dragArea child container" :list="atlist2.list" group="people" @change="log">
                        <!--                        <div class="container">-->
                        <div class="list-group-item yourArea" v-for="(element, idx) in atlist2.list">
                            {{ element.name }}
                            <span v-if="element.command === 'nearEnemy' ||element.command === 'nearEnemy' ">へ</span>
                            <span v-if="element.id === 'range' ||element.id === 'range' ">になるまで</span>
                            <i class="fa fa-times close" @click="removeAt(idx)(atlist2.list)">X</i>
                        </div>

                        <!--                        </div>-->

                        <button @click="removeAt(index)(list2)">{{index}}</button>

                    </draggable>
                </div>
            </div>
        </div>
        <!--        <div v-else>要素がない</div>-->


    </div>
</template>

<script>
    // import draggable from '../node_modules/vuedraggable'
    import draggable from 'vuedraggable'

    const cyan = '\u001b[36m'
    const reset = '\u001b[0m';

    export default {
        components: {
            draggable
        },
        data() {
            return {
                show: true,
                actionRange: false,
                move: false,
                target: false,
                isif: false,
                showContent: false,

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
                list2: [],
                makingCode: '',
            }
        },
        watch: {
            list2: {
                handler: function (val, oldVal) {
                    let index = val.length - 1
                    if (val[index].command === 'if') {
                        console.log(cyan + 'ifdayo' + reset)
                        val.push({name: 'の行動をする', command: 'list', class: 'BGblue', list: [...new Array]})
                    } else if (val[index].command === 'else') {
                        val.push({name: 'の行動をする', command: 'list2', class: 'BGblue', list: [...new Array]})
                    }
                    console.log(val[index])
                },
                deep: true
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
                return {name: "もし", command: 'if', class: 'BGred'}
            },
            newElseIF: () => {
                return {name: "それ以外の時は", command: 'else', class: 'BGred'}
            },

            newNearEnemy: () => {
                return {name: "最も近い敵", command: 'nearEnemy', class: '', func: 'searchNearTarget'}
            },
            newFarEnemy: () => {
                return {name: "最も遠い敵", command: 'farEnemy', class: '', func: 'searchFarTarget'}
            },

            newApproach: () => {
                return {name: "接近する", command: 'approach', class: ''}
            },
            newRetreat: () => {
                return {name: "後退する", command: 'retreat', class: ''}
            },

            newBullet: () => {
                return {name: "攻撃する", command: 'bullet', lass: ''}
            },
            newjustTarget: () => {
                return {name: "零距離", command: 'justTarget', class: '', id: 'range', nextWord: 'がいる時'}
            },
            newNearTarget: () => {
                return {name: "近距離", command: 'nearTarget', class: '', id: 'range', nextWord: 'がいる時'}
            },
            newMiddleTarget: () => {
                return {name: "中距離", command: 'middleTarget', class: '', id: 'range', nextWord: 'がいる時'}
            },
            newFarTarget: () => {
                return {name: "遠距離", command: 'farTarget', class: '', id: 'range', nextWord: 'がいる時'}
            },
            newOutOfRangeTarget: () => {
                return {name: "射程外", command: 'outOfRangeTarget', class: ''}
            },

            removeAt: (idx) => (list) => {
                list.splice(idx, 1);
            },
            removeList(idx) {
                // const list = [1, 2, 3, 3, 3]
                const removeIndex = this.list2.indexOf(idx)
                console.log(this.list2)
                this.list2 = this.list2.filter((_, index) => index !== removeIndex) // [1, 2, 3, 3]
                console.log(this.list2)

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
            mouseoverIf(TF) {
                this.isif = TF
            },
            mouseleaveIf(TF) {
                this.isif = TF
            },
            parseCode() {
                // let code = 'let c=0;let cancel="";const myTickAnimation=()=>{ c++;console.log(c);if(c>200){console.log(cancel);cancelAnimationFrame(cancel-1)}'
                let code = 'let c=0;let cancel=setInterval(()=>{ c++;console.log(c);if(c>2000){console.log(cancel);clearInterval(cancel)}'

                this.list2.map(x => {
                    console.log(x)
                    code += this.createCode(x.command)()() // ここでcreateCodeしたいわね

                    console.log(x.command)
                    if (x.command === 'if') {

                    }
                    if (x.command === 'list' || x.command === 'list2') {

                        // for (const y of x.list) {
                        //     console.log(y,'やよ〜')
                        // }
                        if (x.list[0].command === 'bullet') {
                            code += this.createCode(x.list[0].command)(this.createCode(x.list[1].command)(1)())()
                        }

                        if (x.list[0].command === 'approach' || x.list[0].command === 'retreat') {
                            code += this.createCode(x.list[0].command)(x.list[1].func)(x.list[2].command)
                            console.log(x.list[1].func, x.list[2].command)
                        }

                        // x.list.map(y => {
                        //     code += this.createCode(y.command)()() // ここでcreateCodeしたいわね
                        //     console.log(y.command)
                        // })
                        //fixme 絶対よくないんだけど、ここでコードに ; を足さないと動かなそう
                        code += ';'
                    }

                })
                code += 'renderer.render(scene, camera);},10)'
                console.log(code)
                this.makingCode = code
                try {
                    eval(code)
                } catch (e) {
                    console.error(e)
                    console.error('実行に失敗しました。構文を確認してください')
                }
            },
            createCode: command => insertElem => insertElem2 => { //fixme obje1を自機として一旦直書きするぞ
                //if(justTarget(myShape)(searchNearTarget(myShape)(enemyTeam))) bullet(myShape)(searchNearTarget(myShape)(enemyTeam));

                if (insertElem) { //fixme 幾ら何で愚直すぎない？？？？？

                    switch (command) {
                        case 'if':
                            return `if(${insertElem})`
                        case 'list':
                            return ''

                        case 'else':
                            return 'else'

                        case 'list2':
                            return ' '

                        //この子らはobject型を返すので注意 => 引数に使うように設計しなよ？
                        case 'nearEnemy':
                            //fixme myShapeってなってるとこ、変数展開で自機オブジェクトにできるといい
                            return 'searchNearTarget(myShape)(enemyTeam)'

                        case 'farEnemy':
                            //fixme myShapeってなってるとこ、変数展開で自機オブジェクトにできるといい
                            return 'searchFarTarget(myShape)(enemyTeam)'

                        case 'justTarget':
                            return `justTarget(myShape)(${insertElem})`

                        case 'nearTarget':
                            return `nearTarget(myShape)(${insertElem})`

                        case 'middleTarget':
                            return `middleTarget(myShape)(${insertElem})`

                        case 'farTarget':
                            return `farTarget(myShape)(${insertElem})`

                        case 'outOfRangeTarget':
                            //こいつは別に実装後ででもいい。あとまわし
                            break

                        case 'approach':
                            return `moveNicely(myShape)(${insertElem}(myShape)(enemyTeam))(Approach)('${insertElem2}')`

                        case 'retreat':
                            return `moveNicely(myShape)(${insertElem}(myShape)(enemyTeam))(retreat)('${insertElem2}')`

                        case 'bullet':
                            return `bullet(myShape)(${insertElem})(this.scene)`
                    }//todo sceneを足した、テストまだ
                } else {
                    switch (command) {
                        case 'if':
                            return 'if('
                        case 'list':
                            return ')'

                        case 'else':
                            return 'else'

                        case 'list2':
                            return ' '

                        //この子らはobject型を返すので注意 => 引数に使うように設計しなよ？
                        case 'nearEnemy':
                            //fixme myShapeってなってるとこ、変数展開で自機オブジェクトにできるといい
                            return 'searchNearTarget(myShape)(enemyTeam))'

                        case 'farEnemy':
                            //fixme myShapeってなってるとこ、変数展開で自機オブジェクトにできるといい
                            return 'searchFarTarget(myShape)(enemyTeam))'

                        case 'justTarget':
                            return 'justTarget(myShape)('

                        case 'nearTarget':
                            return 'nearTarget(myShape)('

                        case 'middleTarget':
                            return 'middleTarget(myShape)('

                        case 'farTarget':
                            return 'farTarget(myShape)('

                        case 'outOfRangeTarget':
                            //こいつは別に実装後ででもいい。あとまわし
                            break

                        // case 'approach':
                        //     return 'Approach(myShape)('
                        // // moveNicely(myShape)(searchNearTarget(myShape)(enemyTeam)))(Approach)(0)
                        //
                        // case 'retreat':
                        //     return 'retreat(myShape)('
                        //
                        // case 'bullet':
                        //     return 'bullet(myShape)('

                    }
                }
            },
            openModal: function () {
                this.showContent = true
            },
            closeModal: function () {
                this.showContent = false
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
        max-width: 840px;
        /*height: 100%;*/
        min-height: 900px;
        overflow: scroll;
        background: rgba(0, 0, 0, 0.23);
        /*color: rgba(206,206,206,0.86);*/
        color: #fff;
    }

    .container {
        padding: 30px;
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
        background: rgba(102, 102, 123, 0.48);
        padding: 10px;
        margin: 10px;
    }

    .yourArea {
        background: rgba(100, 30, 200, 0.38);
        border-radius: 20px;
        padding: 10px;
        margin: 10px;
    }

    .child {
        width: 500px;
        /*height: 500px;*/
        background: rgba(71, 156, 186, 0.56);
        border-radius: 30px;
        /*z-index: -100;*/
        /*position: absolute;*/
    }

    .getarea {
        background: rgba(102, 0, 5, 0.36);
        border-radius: 30px;
    }

    .BGred {
        background: rgba(133, 0, 21, 0.55);
        border-radius: 20px 80px 40px 20px;
    }

    .BGblue {
        background: rgba(0, 2, 98, 0.47);
        border-radius: 40px 20px 20px 80px;
    }


    .headButton {
        width: 150px;
        min-height: 150px;
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

    .scale {
        transform: scale(2.4);
    }

    .scale2 {
        transform: scale(2.4);
        font-size: 10px;
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

    .scale-enter-active, .scale-leave-active {
        /*transition: opacity .1s;*/
        animation: scale 1.0s ease 0s forwards;
    }

    .scale-enter, .scale-leave-to {
        animation: scale2 1.0s ease 0s forwards;
    }

    .scale2-enter-active, .scale2-leave-active {
        /*transition: opacity .1s;*/
        animation: scale 1.0s ease 0s forwards;
    }

    .scale2-enter, .scale2-leave-to {
        animation: scale2 1.0s ease 0s forwards;
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

    @keyframes scale {
        from {
            opacity: 0;
            transform: scale(1);
        }
        to {
            opacity: 1;
            transform: scale(2.4);
        }
    }

    @keyframes scale2 {
        from {
            opacity: 1;
            transform: scale(2.4);
        }
        to {
            opacity: 0;
            transform: scale(1);
        }
    }

    #overlay {
        /*　要素を重ねた時の順番　*/
        z-index: 1;

        /*　画面全体を覆う設定　*/
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        /*　画面の中央に要素を表示させる設定　*/
        display: flex;
        align-items: center;
        justify-content: center;

    }

    #content {
        z-index: 2;
        width: 70%;
        padding: 1em;
        background: #f5f5f5;
        overflow: scroll;
        border-radius: 30px;
    }

    .uibutton {
        width: 80px;
        height: 10px;
    }

    .btn-animation-02 {
        display: inline-block;
        /*width: 100px;*/
        text-align: center;
        background-color: rgba(158, 195, 75, 0.54);
        border: 2px solid rgba(158, 195, 75, 0.84);
        font-size: 16px;
        color: #9ec34b;
        text-decoration: none;
        font-weight: bold;
        padding: 10px 24px;
        border-radius: 4px;
        position: relative;
        margin: 0 10px;
    }

    .btn-animation-02 span {
        position: relative;
        z-index: 1;
        color: #222;

    }

    .btn-animation-02::before,
    .btn-animation-02::after {
        content: "";
        display: block;
        background-color: rgba(240, 240, 240, 0.99);
        width: 50%;
        height: 100%;
        position: absolute;
        top: 0;
        transition: .2s;
    }

    .btn-animation-02::before {
        left: 0;
    }

    .btn-animation-02::after {
        right: 0;
    }

    .btn-animation-02:hover:before,
    .btn-animation-02:hover:after {
        width: 0;
        background-color: #eee;
    }

    .btn-animation-02:hover {
        color: #eee;
    }

    .headButton {
        color: #2c3e50;
    }

    .btn-shine {
        color: #FFF;
        background-color: rgba(4, 27, 0, 0.78);
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        line-height: 28px;
        width: 80px;
        border-radius: 30px;
        position: relative;
        text-decoration: none;
        text-transform: uppercase;
        border: 1px solid transparent;
        outline: 1px solid;
        outline-color: rgba(255, 255, 255, 0.5);
        outline-offset: 0px;
        text-shadow: none;
        transition: all 1.2s cubic-bezier(0.2, 1, 0.2, 1);
    }

    .btn-shine:hover {
        border-color: #FFF;
        box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
        outline-color: transparent;
        outline-offset: 12px;
        text-shadow: 2px 2px 3px #000;
    }

    .close {
        font-size: 14px;
        color: #fff;
    }
</style>
