const addList = (value) => commands => {
    commands.push(value)
    console.log(commands)
}

const makeCode = (commands) => {
    let stringCode = 'async function evalfunction () {'
    commands.map((command) => {
        switch (command) {
            case 'W':
                stringCode += 'await sleep(400).then(() => {'
                stringCode += `switchTarget(moveup);});`
                break
            case 'A':
                stringCode += 'await sleep(400).then(() => {'
                stringCode += `switchTarget(moveleft);});`
                break
            case 'S':
                stringCode += 'await sleep(400).then(() => {'
                stringCode += `switchTarget(movedown);});`
                break
            case 'D':
                stringCode += 'await sleep(400).then(() => {'
                stringCode += `switchTarget(moveright);});`
                break
            default:
        }
        //stringCode += 'if (x == p2.x) {console.log(\'いたーい\')};'//ダメージなどの処理
    })
    stringCode += '};'
    return stringCode + 'evalfunction()'
}

const switchTarget = (func, sub = null) => {
    if (target === p1.name) {
        if (sub) {
            func(p1, p2)(sub)
        } else {
            func(p1, p2)
        }
    } else if (target === p2.name) {
        if (sub) {
            func(p2, p1)(sub)
        } else {
            func(p2, p1)
        }
    }
}

const sleep = (waitSec) => {
    return new Promise( (resolve) => {
        setTimeout(() => {
            resolve()
        }, waitSec);
    });
}

const setStatusValue = (target,target2) => {
    HP.innerText = `${target.name} : HP : ${target.HP} , MP : ${target.MP}`
    HP2.innerText = `${target2.name} : HP : ${target2.HP} , MP : ${target2.MP}`

}

const initfunc = () => {
    ctx.drawImage(p1.image, 0, 0, 100, 100, p1.x, p1.y, 100, 100);
    ctx.drawImage(p2.image, p2.x, p2.y, 100, 100);

    switchTarget(setStatusValue)
}

const selectRotation = target => radius => {
    target.direction += radius
}
/**
 * 回転させた画像を表示する
 * @param {object} image - Imageオブジェクト
 * @param {number} x - 画像の中心となるX座標
 * @param {number} y - 画像の中心となるY座標
 * @param {number} angle - 回転する角度[度]
 */
const drawRotatedImage = (target, target2) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // コンテキストを保存する
    ctx.save();
    // 回転の中心に原点を移動する
    ctx.translate(target.x + 100, target.y);
    // ctx.translate(target2.x , target2.y);
    // canvasを回転する
    ctx.rotate((target.direction) * TO_RADIANS);

    if (target.direction < 0) {
        target.direction = Math.floor(target.direction / 90) >= 4 && Math.floor(target.direction / 90) >= 0 ?
            Math.floor(target.direction / 90) - 4 :
            Math.floor(target.direction / 90) < 0
                ? 360 + Math.floor(target.direction)
                : Math.floor(target.direction / 90)
    } else if (target.direction >= 360) {
        target.direction = 0
    }
    // console.log(Math.floor(target.direction / 90) >= 4 ? Math.floor(target.direction / 90) -4: Math.floor(target.direction / 90) )
    switch (
        Math.floor(target.direction / 90) >= 4 && Math.floor(target.direction / 90) >= 0 ?
            Math.floor(target.direction / 90) - 4 :
            Math.floor(target.direction / 90) < 0 ?
                360 + Math.floor(target.direction) :
                Math.floor(target.direction / 90)
        ) {
        case 1://90
            ctx.drawImage(target.image, -(0), -(0), 100, 100);
            // ctx.drawImage(target2.image, -(0), -(0), 100, 100);
            break
        case 2://180
            ctx.drawImage(target.image, -(0), -(100), 100, 100);
            // ctx.drawImage(target2.image, -(0), -(100), 100, 100);
            break
        case 3://270
            ctx.drawImage(target.image, -(100), -(100), 100, 100);
            // ctx.drawImage(target2.image, -(100), -(100), 100, 100);
            break
        case 0://0
            ctx.drawImage(target.image, -(100), -(0), 100, 100);
            // ctx.drawImage(target2.image, -(100), -(0), 100, 100);
            break
        default:
    }
    // コンテキストを元に戻す
    ctx.restore();
    if (target2.direction === 0) {
        ctx.drawImage(target2.image, target2.x, target2.y, 100, 100);
    } else {
        // コンテキストを保存する
        ctx.save();
        // 回転の中心に原点を移動する
        ctx.translate(target2.x + 100, target2.y);
        // canvasを回転する
        ctx.rotate((target2.direction) * TO_RADIANS);
        switch (
            Math.floor(target2.direction / 90) >= 4 && Math.floor(target2.direction / 90) >= 0 ?
                Math.floor(target2.direction / 90) - 4 :
                Math.floor(target2.direction / 90) < 0 ?
                    360 + Math.floor(target2.direction) :
                    Math.floor(target2.direction / 90)
            ) {
            case 1://90
                ctx.drawImage(target2.image, -(0), -(0), 100, 100);
                // ctx.drawImage(target2.image, -(0), -(0), 100, 100);
                break
            case 2://180
                ctx.drawImage(target2.image, -(0), -(100), 100, 100);
                // ctx.drawImage(target2.image, -(0), -(100), 100, 100);
                break
            case 3://270
                ctx.drawImage(target2.image, -(100), -(100), 100, 100);
                // ctx.drawImage(target2.image, -(100), -(100), 100, 100);
                break
            case 0://0
                ctx.drawImage(target2.image, -(100), -(0), 100, 100);
                // ctx.drawImage(target2.image, -(100), -(0), 100, 100);
                break
            default:
        }
    }
    ctx.restore();
}

const moveright = (target, target2) => {
    console.log('right')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (target.x == target2.x - 100 && target.y == target2.y) {
        console.log('いたーい')
        drawRotatedImage(target, target2)
    } else if (target.x <= 300) {
        target.x += movement
        drawRotatedImage(target, target2)
    } else {
        console.log('out of range ', target.x)
        drawRotatedImage(target, target2)
    }
}

const moveleft = (target, target2) => {
    console.log('left')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (target.x == target2.x + 100 && target.y == target2.y) {
        console.log('いたーい')
        drawRotatedImage(target, target2)
    } else if (target.x > 0) {
        target.x -= movement
        drawRotatedImage(target, target2)
    } else {
        ctx.drawImage(target.image, target.x, target.y, 100, 100);
        // y += movement
    }
}

const moveup = (target, target2) => {
    console.log('up')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (target.x == target2.x && target.y == target2.y + 100) {
        console.log('いたーい')
        drawRotatedImage(target, target2)
    } else if (target.y > 0) {
        target.y -= movement
        drawRotatedImage(target, target2)
    } else {
        console.log('out of range ', target.y)
        drawRotatedImage(target, target2)
    }
}

const movedown = (target, target2) => {
    console.log('down')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (target.x == target2.x && target.y == target2.y - 100) {
        console.log('いたーい')
        ctx.drawImage(target.image, target.x, target.y, 100, 100);
    } else if (target.y < 400) {
        target.y += movement
        drawRotatedImage(target, target2)
    } else {
        console.log('out of range', target.y)
        drawRotatedImage(target, target2)
    }
}