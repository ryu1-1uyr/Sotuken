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
    } else if (num < num2) {
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

    if (whereMove(obje1.position.x)(obje2.position.x) === 0 ){
        console.log("ぶつかったよ X")
        // fragX = true
        obje1.position.x += whereMove(obje1.position.x)(obje2.position.x)
    } else {
        obje1.position.x += whereMove(obje1.position.x)(obje2.position.x)
    }

    // Z座標軸の処理

    if (whereMove(obje1.position.z)(obje2.position.z) === 0 ){
        console.log("ぶつかったよ Z")
        // fragZ = true
        obje1.position.z += whereMove(obje1.position.z)(obje2.position.z)
    } else {
        obje1.position.z += whereMove(obje1.position.z)(obje2.position.z)
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

    if (whereMove(obje1.position.x)(obje2.position.x) === 0 ){ // ここのせい
        // console.log("ぶつかったよ X")
        // fragX = true
        obje1.position.x += 1 //衝突判定を一旦無視
    } else {
        obje1.position.x += - whereMove(obje1.position.x)(obje2.position.x)
    }

    // Z座標軸の処理
    if (whereMove(obje1.position.z)(obje2.position.z) === 0 ){
        // console.log("ぶつかったよ Z")
        // fragZ = true
        obje1.position.z += 1
    } else {
        obje1.position.z += - whereMove(obje1.position.z)(obje2.position.z)
    }
    console.log(obje1.position)
    console.log(whereMove(obje1.position.x)(obje2.position.x))
    if (fragX && fragZ) {
        console.log("Approach 2 objects")
    }
}
