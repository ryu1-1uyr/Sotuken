import {initfunc, movedown, moveleft, moveright, moveup, sleep, switchTarget} from "./function";

window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'w':
            switchTarget(moveup)
            break
        case 'a':
            switchTarget(moveleft)
            break
        case 's':
            switchTarget(movedown)
            break
        case 'd':
            switchTarget(moveright)
            break
        default :
            console.log(event)
    }
})

sleep(1000).then(()=>{
    console.log('sleepnow')
    initfunc()
})