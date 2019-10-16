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
        // console.log("ぶつかったよ Z")
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
        obje.position.x += (moving_num)//* obje.baseSpeed)
    }
}

const move_z = obje => moving_num => {
    if (isOutOfRange_Z(obje)) {
        obje.position.z += (moving_num)//* obje.baseSpeed)
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
const showbullet = () => {
    bullet(myShape)
    bullet(myShape2)
    bullet(myShape3)
    bullet(myShape4)
}

// bulletはたまの位置を進める + たまの表示非表示だけにする

const gcd = (a, b) => {
    if (b === 0) {
        return a
    }
    return gcd(b, a % b)
}

const bulletSpeed = num => gcd => num / gcd

const bullet = obje => target => { // 1関数に役割が多くなりすぎてる => キャラのマテリアル生成時にはたまオブジェクト持たせておく => bulletが呼ばれたらscene.addするみたいな感じで良さそう
    if (obje.isAttack) {

        // fixme 攻撃から移動に行動を変えたときに弾道が残るw
        switch (obje.bullet.positiveOrNegative.x) {
            case 'positive':
                //プラス方向にすすんでくれ〜
                obje.bullet.position.x -= obje.bullet.baseSpeed.x
                break
            case 0:
                //fixme この行今動いてない
                scene.remove(obje.bullet)
                obje.isAttack = false
                break
            case 'negative':
                //マイナス方向に進んでクレメンス
                obje.bullet.position.x += obje.bullet.baseSpeed.x
                break
        }
        // console.log(obje.bullet.position)

        switch (obje.bullet.positiveOrNegative.z) {
            case 'positive':
                //プラス方向にすすんでくれ〜
                obje.bullet.position.z -= obje.bullet.baseSpeed.z
                break
            case 0:
                //fixme この行今動いてない
                scene.remove(obje.bullet)
                obje.isAttack = false
                break
            case 'negative':
                //マイナス方向に進んでクレメンス
                obje.bullet.position.z += obje.bullet.baseSpeed.z
                break
        }

        console.log(obje.bullet.position.x >= 300 || obje.bullet.position.z >= 300 || obje.bullet.position.x <= -300 || obje.bullet.position.z <= -300)
        if (obje.bullet.position.x >= 300 || obje.bullet.position.z >= 300 || obje.bullet.position.x <= -300 || obje.bullet.position.z <= -300) {
            scene.remove(obje.bullet)
            obje.isAttack = false
            console.log("out of range")
        }

        if (obje.bullet.position.x !== 300 &&
            target.position.x - obje.bullet.position.x < 1 &&
            target.position.x - obje.bullet.position.x > -1 &&
            obje.bullet.position.z - target.position.z < 1 &&
            target.position.x - obje.bullet.position.x > -1) {
            // meshを非表示にする
            obje.isAttack = false
        }

        attack(obje.bullet)(target)

    } else {

        //たまの打ち出し 初期座標
        obje.bullet.position.x = (obje.position.x + 0)
        obje.bullet.position.z = (obje.position.z + 0)

        // 2点間の傾きを正規化して方向の修正
        const targetAngleV = new THREE.Vector3();
        targetAngleV.copy(obje.position);
        targetAngleV.sub(target.position);
        targetAngleV.normalize();

        // console.log(targetAngleV, Math.atan2(targetAngleV.x, targetAngleV.z))

        obje.bullet.rotation.y = Math.atan2(targetAngleV.x, targetAngleV.z)

        obje.bullet.targetCoordinat = target.position
        obje.bullet.positiveOrNegative = {x: '', z: ''}
        obje.bullet.baseSpeed = {x: '', z: ''}

        const GreatestCommonDivisor = gcd(target.position.x - obje.bullet.position.x, target.position.z - obje.bullet.position.z)
        const x = bulletSpeed(target.position.x - obje.bullet.position.x)(GreatestCommonDivisor)
        const y = bulletSpeed(target.position.z - obje.bullet.position.z)(GreatestCommonDivisor)

        const a = obje.fireRate

        if (x > y) { // 弾速を遅くする
            obje.bullet.baseSpeed = {
                x: Math.abs(x / x * a) > 6 ? Math.abs(x / x * a) / 10 : Math.abs(x / x * a),
                z: Math.abs(y / x * a) > 6 ? Math.abs(y / x * a) / 10 : Math.abs(y / x * a),
            }
        } else {
            obje.bullet.baseSpeed = {
                x: Math.abs(x / y * a) > 6 ? Math.abs(x / y * a) / 10 : Math.abs(x / y * a),
                z: Math.abs(y / y * a) > 6 ? Math.abs(y / y * a) / 10 : Math.abs(y / y * a),
            }
        }

        console.log(obje.bullet.baseSpeed)

        // if (obje.bullet.baseSpeed.x > 5) {
        //     obje.bullet.baseSpeed = {x: obje.bullet.baseSpeed.x / a}
        //     console.log(obje.bullet.baseSpeed.x, "矯正した")
        // }
        // if (obje.bullet.baseSpeed.z > 5) {
        //     obje.bullet.baseSpeed = {z: obje.bullet.baseSpeed.z / a}
        //     console.log(obje.bullet.baseSpeed.z, "矯正した")
        // }

        scene.add(obje.bullet)

        // fixme 151~183までの挙動を毎フレーム行なっているので、弾道ができを追尾する動きをしている
        // 初期に位置特定、政府の判定をしてそれを保持すればいいんじゃね

        switch (whereMove(obje.bullet.position.x)(obje.bullet.targetCoordinat.x)) {
            case -1:
                //プラス方向にすすんでくれ〜
                obje.bullet.positiveOrNegative.x = 'positive'
                break
            case 0:
                //え？これ実質衝突してるのでは？
                // scene.remove(obje.bullet)
                // obje.isAttack = false
                break
            case 1:
                //マイナス方向に進んでクレメンス
                obje.bullet.positiveOrNegative.x = 'negative'
                break
        }
        // console.log(obje.bullet.position)

        switch (whereMove(obje.bullet.position.z)(obje.bullet.targetCoordinat.z)) {
            case -1:
                //プラス方向にすすんでくれ〜
                obje.bullet.positiveOrNegative.z = 'positive'
                break
            case 0:
                //え？これ実質衝突してるのでは？
                // scene.remove(obje.bullet)
                // obje.isAttack = false
                break
            case 1:
                //マイナス方向に進んでクレメンス
                obje.bullet.positiveOrNegative.z = 'negative'
                break
        }
        // console.log(obje.bullet.positiveOrNegative)
        // fixme

        obje.isAttack = true
    }
}

const attack = obje => target => {
    //接触判定
    if (euclideanDistance(obje)(target)) {
        // console.log(`hit at ${obje} and ${obje}`)

        // 後々引数にダメージを追記できるような設計へ
        // 持続ヒットのため、威力抑えめにすること。
        target.hp -= 1
        // console.log(target.hp)
    }
}

const distanceToSquared = v => d => {

    const dx = v.x - d.x, dy = v.z - d.z;
    return dx * dx + dy * dy;

}

const euclideanDistance = obje => target => {

    let b = obje.geometry.boundingSphere.radius + target.geometry.boundingSphere.radius;
    // console.log({'Rs':b,'distance':distanceToSquared(obje.position)(target.position)})

    return distanceToSquared(obje.position)(target.position) <= b * b
}

const makeDistanceArray = obje => enemyArr => enemyArr.map(x => distanceToSquared(obje.position)(x.position))

//searchTarget系のの関数たちはオブジェクトを返す点に注意

const searchFarTarget = obje => enemyArr => {

    const tmp = makeDistanceArray(obje)(enemyArr)

    return enemyArr[tmp.indexOf(Math.max.apply(null, tmp))]

}

const searchNearTarget = obje => enemyArr => {

    const tmp = makeDistanceArray(obje)(enemyArr)

    return enemyArr[tmp.indexOf(Math.min.apply(null, tmp))]

}

const moveNicely = obje => target => number => func => {
    if (obje.isAttack) {
        sleep(1000).then(() => {
            scene.remove(obje.bullet)
            obje.isAttack = false
        })
    }
    switch (number) {
        case 0:
            //ここにいい感じの条件分岐…
            if (distanceToSquared(obje.position)(target.position) > 3000) {
                func(obje)(target)
            }
            break
        case 1:
            if (distanceToSquared(obje.position)(target.position) > 50000) {
                func(obje)(target)
            }
            break
        case 2:
            if (distanceToSquared(obje.position)(target.position) > 130000) {
                func(obje)(target)
            }
            break
        case 3:
            if (distanceToSquared(obje.position)(target.position) > 180000) {
                func(obje)(target)
            }
            break

    }
}

//近くにいるとtrue
const justTarget = obje => target => {
    return distanceToSquared(obje.position)(target.position) <= 3000
}

//近くにいるが超至近距離ではない状態でtrue
const nearTarget = obje => target => {
    return distanceToSquared(obje.position)(target.position) <= 50000 && distanceToSquared(obje.position)(target.position) > 3000
}

//中距離かつ近く以上でtrue
const middleTarget = obje => target => {
    return distanceToSquared(obje.position)(target.position) <= 130000 && distanceToSquared(obje.position)(target.position) > 50000
}
//遠距離かつ中距離以上でtrue
const farTarget = obje => target => {
    return distanceToSquared(obje.position)(target.position) <= 180000 && distanceToSquared(obje.position)(target.position) > 130000
}
//射程外かつ遠距離以上でtrue
const outOfRangeTarget = obje => target => {
    return distanceToSquared(obje.position)(target.position) <= 360000 && distanceToSquared(obje.position)(target.position) > 180000
}


//自動生成するコードは基本的にこのif elseのねすとになりそう

// このhgoeに入る敵との近さをBoolで返す関数が必要っぽい
// if (justTarget) {
//     bullet(myShape)(myShape3)
// } else i
//     moveNicely(myShape)(myShape3)(0)(Approach)
// }

/*
* (( 組み立てイメージ ))
* もし、敵が近くにいたら
* 　　攻撃する
* もし、敵が遠い時は
* 　　近くに行く
*
* * * * * * * * * * * * *
*
* 現状できること
* てきが　( 至近距離　|　近く　|　中距離 |　遠距離　|　射程外 )にいる
*
* 攻撃　近く　遠ざかる　
* 一番( 近い | 遠い )ターゲットに　
* ( 近く　遠ざかる ) なら ( 至近距離　|　近く　|　中距離 |　遠距離　|　射程外 ) へ
*/