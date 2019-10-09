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
    } else if (num === num2) {//    } else if (Math.abs(num) - num2 === 0) {
        return 0
    }
}

//object2つ引数にとって、1が2に接近する関数

//fixme この関数に引数を1つ増やして、どこまで近くか、っての決めれた方が良さそう

const Approach = obje1 => obje2 => {

    let fragX
    let fragZ

    // X座標軸の処理

    if (whereMove(obje1.position.x)(obje2.position.x) === 0) {
        console.log("ぶつかったよ X")
        // fragX = true
        move_x(obje1)(whereMove(obje1.position.x)(obje2.position.x))
    } else {
        move_x(obje1)(whereMove(obje1.position.x)(obje2.position.x))
    }

    // Z座標軸の処理

    if (whereMove(obje1.position.z)(obje2.position.z) === 0) {
        console.log("ぶつかったよ Z")
        // fragZ = true
        move_z(obje1)(whereMove(obje1.position.z)(obje2.position.z))
    } else {
        move_z(obje1)(whereMove(obje1.position.z)(obje2.position.z))
        // console.log(obje1.position.z,obje2.position.z)
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

    if (whereMove(obje1.position.x)(obje2.position.x) === 0) { // ここのせい
        // console.log("ぶつかったよ X")
        // fragX = true
        // 衝突判定を一旦無視

        if (obje2.position.x < 0) {
            move_x(obje1)(1)
        } else if (obje2.position.x > 0) {
            move_x(obje1)(-1)
        }
    } else {
        move_x(obje1)(-whereMove(obje1.position.x)(obje2.position.x))
    }

    // Z座標軸の処理
    if (whereMove(obje1.position.z)(obje2.position.z) === 0) {
        // console.log("ぶつかったよ Z")
        // fragZ = true

        if (obje2.position.z < 0) {
            move_z(obje1)(1)
        } else if (obje2.position.z > 0) {
            move_z(obje1)(-1)
        }
    } else {
        move_z(obje1)(-whereMove(obje1.position.z)(obje2.position.z))
    }

    if (fragX && fragZ) {
        console.log("Approach 2 objects")
    }
}

const isOutOfRange_X = obje => {
    if (obje.position.x >= 310) {
        return false
    } else {
        return obje.position.x > -310
    }
}

const isOutOfRange_Z = obje => {
    if (obje.position.z >= 310) {
        return false
    } else return (obje.position.z > -310);
}

const move_x = obje => moving_num => {
    if (isOutOfRange_X(obje)) {
        obje.position.x += (moving_num )//* obje.baseSpeed)
    }
}

const move_z = obje => moving_num => {
    if (isOutOfRange_Z(obje)) {
        obje.position.z += (moving_num )//* obje.baseSpeed)
        // console.log(moving_num, obje.baseSpeed, obje.position.z)
    }
}

// 攻撃処理

/*
* たまの生成
* ベクトルの確定
* 的に当たる、カウンタが一定値を超える
* たまの削除
*/
const showbullet =()=>{
    bullet(myShape)
    bullet(myShape2)
    bullet(myShape3)
    bullet(myShape4)
}

// bulletはたまの位置を進める + たまの表示非表示だけにする

const bullet = obje => { // 1関数に役割が多くなりすぎてる => キャラのマテリアル生成時にはたまオブジェクト持たせておく => bulletが呼ばれたらscene.addするみたいな感じで良さそう
    if (obje.isAttack) {

        obje.bullet.position.x += 3
        obje.bullet.position.z += 3

        // if (/*衝突したら*/){
        //     // meshを非表示にする
        // }

    } else {

        obje.bullet.position.x = (obje.position.x + 30)
        obje.bullet.position.z = (obje.position.z + 30)
        scene.add(obje.bullet)

        obje.isAttack = true
    }
}