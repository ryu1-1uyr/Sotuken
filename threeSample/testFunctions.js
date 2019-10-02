const crushTestFunc = obje1 => obje2 => {
    if (obje1.position.x - 40 === obje2.position.x) {
        console.log('ぶつかったよ〜ん')
    } else {
        myShape.position.x -= 5
    }
}

//移動補助関数
const whereMove = num => num2 => {
    if (num > num2) {
        return -1
    } else if (num > num2) {
        return 1
    } else if (num === num2) {
        return 0
    }
}

//object2つ引数にとって、1が2に接近する関数

//fixme この関数に引数を1つ増やして、どこまで近くか、っての決めれた方が良さそう

const Approach = obje1 => obje2 => {

    let fragX
    let fragZ

    // X座標軸の処理
    switch (whereMove(obje1.position.x)(obje2.position.x)) {
        case -1:
            obje1.position.x += -1
            break
        case 1:
            obje1.position.x += 1
            break
        case 0:
            console.log("ぶつかったよ X")
            fragX = true
            break
        default:

    }

    // Z座標軸の処理
    switch (whereMove(obje1.position.z)(obje2.position.z)) {
        case -1:
            obje1.position.z += -1
            break
        case 1:
            obje1.position.z += 1
            break
        case 0:
            console.log("ぶつかったよ Z")
            fragZ = true
            break
        default:

    }

    if (fragX && fragZ) {
        console.log("Approach 2 objects")
    }
}

//object2つ引数にとって、1が2からはなれる関数

//fixme この関数に引数を1つ増やして、どこまで下がるか、っての決めれた方が良さそう

const retreat = obje1 => obje2 => {

    let fragX
    let fragZ

    // X座標軸の処理
    switch (whereMove(obje1.position.x)(obje2.position.x)) {
        case -1:
            obje1.position.x += 1
            break
        case 1:
            obje1.position.x += -1
            break
        case 0:
            console.log("ぶつかったよ X")
            fragX = true
            break
        default:

    }

    // Z座標軸の処理
    switch (whereMove(obje1.position.z)(obje2.position.z)) {
        case -1:
            obje1.position.z += 1
            break
        case 1:
            obje1.position.z += -1
            break
        case 0:
            console.log("ぶつかったよ Z")
            fragZ = true
            break
        default:

    }

    if (fragX && fragZ) {
        console.log("Approach 2 objects")
    }
}

