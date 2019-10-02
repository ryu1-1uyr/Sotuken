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

// // 2点のx,z座標が同じ時
// if ((obje1.position.x === obje2.position.x) && (obje1.position.z === obje2.position.z)) {
//     console.log("どっちもぶつかっているよ")
//
// } else if (obje1.position.x === obje2.position.x) { //Xガブ使ってるから動くのはZ
//     obje1.position.z += whereMove(obje1.position.x)(obje2.position.x)
//     console.log("Xはぶつかっているよ")
//
// } else if (obje1.position.z === obje2.position.z) {　//Zガブ使ってるから動くのはX
//     obje1.position.x += whereMove(obje1.position.z)(obje2.position.z)
//     console.log("Zはぶつかっているよ")
//
// } else { // おらどっちもうごけ
//     obje1.position.x += whereMove(obje1.position.x)(obje2.position.x)
//     obje1.position.z += whereMove(obje1.position.x)(obje2.position.x)
//
//     console.log("まだ距離が遠いよ")
//
// }


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

