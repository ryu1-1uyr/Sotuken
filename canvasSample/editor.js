const editor = new Vue({
    el: '#editor',
    // data(){
    //     return{
    //         groceryList: [
    //             { id: 0, text: 'Vegetables' },
    //             { id: 1, text: 'Cheese' },
    //             { id: 2, text: 'Whatever else humans are supposed to eat' }
    //         ],
    //         loopCount: 0,
    //         // p1: {
    //         //     name: 'sigeru',//これちゃんと自機だってわかる名前にしような
    //         //     x: 0,
    //         //     y: 400,
    //         //     image: sigeru,
    //         //     direction: 0,
    //         //     HP: 100,
    //         //     MP: 100,
    //         //     commands: [],
    //         //     isPlayer: true
    //         // }
    //     }
    // },
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
                        console.log(this.loopCount)
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
})