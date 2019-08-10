const editor = new Vue({
    el: '#editor',
    data(){
        return{
            groceryList: [
                { id: 0, text: 'Vegetables' },
                { id: 1, text: 'Cheese' },
                { id: 2, text: 'Whatever else humans are supposed to eat' }
            ],
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
            }
        }
    },
    methods:{
        checkP(){
            console.log(this.p1)
            console.log(p1)
        },
        addList: (value) => (commands) => {
            commands.push(value)
            console.log(commands)
        }
    },
})