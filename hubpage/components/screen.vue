<template>
  <div>
    <canvas id='myCanvas'></canvas>
    <!--    <button @click="test">{{this.myShape}}</button>-->
    <!--    <p style="max-width: 570px">{{code}}</p>-->
    <div>
      <b-button v-b-modal.modal-1>作成したコードを見る</b-button>

      <b-modal id="modal-1" title="出来上がったコード">
        <p class="my-4" style="max-width: 570px">{{returnCode()}}</p>
      </b-modal>
    </div>
    <br>

    <b-button @click="evaluate" v-if="!isbattle">evaluate</b-button>
    <b-button @click="evaluteTwoCode" v-if="isbattle">Battle!!</b-button>

  </div>
</template>

<script>
  import * as THREE from "three";
  import orbitcontrols from 'three-orbitcontrols';


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


  // bulletはたまの位置を進める + たまの表示非表示だけにする
  let cnt = 0
  const gcdBase = (a, b) => {
    cnt++
    if (a % b === 0) {
      return b
    }
    return gcdBase(b, a % b)
  }
  const gcd = (a, b) => {
    cnt = 0;
    let tmp = gcdBase(a, b);
    console.log(['gcd', a, b, tmp, cnt]);
    return tmp
  }
  //fixme 0を返すパターンでバグおきが

  // const bulletSpeed = num => gcd => num / gcd
  const bulletSpeed = num => gcd => num / gcd


  const bullet = obje => target => scene => { // 1関数に役割が多くなりすぎてる => キャラのマテリアル生成時にはたまオブジェクト持たせておく => bulletが呼ばれたらscene.addするみたいな感じで良さそう
    if (obje.isAttack) {

      // fixme 攻撃から移動に行動を変えたときに弾道が残るw
      switch (obje.bullet.positiveOrNegative.x) {
        case 'positive':
          //プラス方向にすすんでくれ〜
          obje.bullet.position.x += obje.bullet.baseSpeed.x // todo -= から += に変更
          break
        case 0:
          //todo ここバグの元だったのでコメントアウト
          // scene.remove(obje.bullet)
          // obje.isAttack = false
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
          obje.bullet.position.z += obje.bullet.baseSpeed.z // todo -= から += に変更
          break
        case 0:
          //todo ここバグの元だったのでコメントアウト => x,zいずれかがターゲットと一緒になっている際の処理 => 球が出なくなっている理由
          // scene.remove(obje.bullet)
          // obje.isAttack = false
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

    } else { // フロートのポジネガフラグなくすするとよさそう

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

      /* -----------この辺に奴らにいい感じの名前を与えるとそれっぽくなる----------- */

      const differenceAtTarget_X = target.position.x - obje.bullet.position.x
      const differenceAtTarget_Z = target.position.z - obje.bullet.position.z

      console.log(['差分', differenceAtTarget_X, differenceAtTarget_Z])

      //正確には自身(この場合は弾)とターゲットとの距離
      const distanceAtTarget = Math.sqrt(differenceAtTarget_X ** 2 + differenceAtTarget_Z ** 2) // todo ,から+へ変更 => そもそもの実装がミスっていた。なんやねん1,1って足してよ！
      // fixme Math.sqrt(-1); // NaN　このケースが起きる場合がある
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt

      console.log([distanceAtTarget, 'これは距離V'])

      //  なんかいい感じの関数を作ると幸せになれるかもしれない
      const 距離に応じた速度補正 = 5 // 速度補正の値を返す関数(distanceAtTarget)

      obje.bullet.baseSpeed = {
        x: differenceAtTarget_X / distanceAtTarget * 距離に応じた速度補正,
        z: differenceAtTarget_Z / distanceAtTarget * 距離に応じた速度補正,
      }
      //fixme differenceAtTarget_ / distanceAtTarget　が
      //fixme Number / ( NaN || Infinity ) となって
      //fixme NaNやInfinityがでうる


      /* -----------この辺に奴らにいい感じの名前を与えるとそれっぽくなる----------- */


      // const GreatestCommonDivisor = gcd(target.position.x - obje.bullet.position.x, target.position.z - obje.bullet.position.z)

      // const x = bulletSpeed(target.position.x - obje.bullet.position.x)(GreatestCommonDivisor)
      // const y = bulletSpeed(target.position.z - obje.bullet.position.z)(GreatestCommonDivisor)
      //
      // const a = obje.fireRate


      // if (x > y) { // 弾速を遅くする
      //   obje.bullet.baseSpeed = {
      //     x: Math.abs(x / x * a) > 6 ? Math.abs(x / x * a) / 10 : Math.abs(x / x * a),
      //     z: Math.abs(y / x * a) > 6 ? Math.abs(y / x * a) / 10 : Math.abs(y / x * a),
      //   } // fixme * aをしているのが、x,y独立して動かしているのがよくない
      // } else {
      //   obje.bullet.baseSpeed = {
      //     x: Math.abs(x / y * a) > 6 ? Math.abs(x / y * a) / 10 : Math.abs(x / y * a),
      //     z: Math.abs(y / y * a) > 6 ? Math.abs(y / y * a) / 10 : Math.abs(y / y * a),
      //   }
      // }

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
      console.log(target.hp)
      // todo でもようにターゲットを撃破した際にalertを出すようにした
      // isdemo(target)
      if (target.hp < 0) {
        console.log(obje)
        obje.position.z = 300
        obje.position.x = 300

        target.hp = 100
        target.position.x = Math.floor(Math.random() * (300 - -300) + -300)
        target.position.z = Math.floor(Math.random() * (300 - -300) + -300)

        // alert('ターゲットを撃破しました')
        // initialize()
      }

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
  // moveNicely(myShape)(searchNearTarget(myShape)(enemyTeam)))(Approach)(0)
  // fixme この関数ちょっとあほあほ構造すぎるので手直しが必要
  const moveNicely = obje => target => func => stringTarget => scene => {
    if (obje.isAttack) {
      sleep(1000).then(() => {
        scene.remove(obje.bullet)
        obje.isAttack = false
      })
    }
    switch (stringTarget) {// fixme ここの数字の条件分岐をやめて、function.nameでとってくる予定なので、文字列の関数名にする
      case 'justTarget':
        //ここにいい感じの条件分岐…
        if (distanceToSquared(obje.position)(target.position) > 3000) {
          func(obje)(target)
        }
        break
      case 'nearTarget':
        if (distanceToSquared(obje.position)(target.position) > 50000) {
          func(obje)(target)
        }
        break
      case 'middleTarget':
        if (distanceToSquared(obje.position)(target.position) > 130000) {
          func(obje)(target)
        }
        break
      case 'farTarget':
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

  const isdemo = (target) => {
    if (target.hp < 0) {
      alert('ターゲットを撃破しました')
      initialize()
    }
  }

  const initialize = function () {
    //右下
    myShape.position.z = 300 // Zのプラス方向を手前側
    myShape.position.x = 300 // Xは右側が整数の領域

//左上
    myShape2.position.z = -250
    myShape2.position.x = -280

//右上
    myShape3.position.z = -300
    myShape3.position.x = 300

//左下
    myShape4.position.z = 200
    myShape4.position.x = -200

    myShape.hp = 120
    myShape2.hp = 100
    myShape3.hp = 140
    myShape4.hp = 100
  }

  const sleep = (waitSec) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, waitSec);
    });
  }

  const returnMaterial = (color) => {
    return new THREE.MeshStandardMaterial({color: color, roughness: 0.5});
  }

  const makePlayers = identificationCode => {
    switch (identificationCode) {
      case 0:
        return new THREE.OctahedronGeometry(20, 0)
      case 1:
        return new THREE.BoxGeometry(40, 40, 40) //fixme ここの値を後から調整してくれ
      case 2:
        return new THREE.TetrahedronGeometry(20, 0)
    }
  }
  const makeMaterial = identificationCode => color => { //射程とかもセットするようにする
    const material = new THREE.Mesh(makePlayers(identificationCode), returnMaterial(color))

    switch (identificationCode) {
      case 0:
        material.hp = 100
        material.fireRate = 5
        material.baseSpeed = 0.9
        material.isAttack = false
        material.bullet =
          new THREE.Mesh(
            new THREE.BoxGeometry(15, 5, 5),
            new THREE.MeshStandardMaterial({color: returnMaterial('#fff'), roughness: 0.5})
          )
        material.bullet.baseSpeed = {x: 1, z: 1}
        break
      case 1:
        material.hp = 140
        material.fireRate = 3
        material.baseSpeed = 1
        material.isAttack = false
        material.bullet =
          new THREE.Mesh(
            new THREE.BoxGeometry(15, 15, 15),
            new THREE.MeshStandardMaterial({color: returnMaterial('#fff'), roughness: 0.5})
          )
        // material.bullet.baseSpeed = 1
        break
      case 2:
        material.hp = 120
        material.fireRate = 2
        material.baseSpeed = 1.1
        material.isAttack = false
        material.bullet =
          new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 10),
            new THREE.MeshStandardMaterial({color: returnMaterial('#fff'), roughness: 0.5})
          )
        // material.bullet.baseSpeed = 2
        break
    }
    // material.geometry.boundingSphere.radius *= 0.8

    return material

  }

  const width = 600;
  const height = 600;

  export default {
    props: {
      code: {
        type: String,
        default: '',
      },
      isbattle: {
        type: Boolean,
        default: false
      }
    },
    name: "screen",
    head: {
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'}
      ],
    },
    data() {
      return {
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(45, width / height, 1, 10000),
        myShape: makeMaterial(2)('#0040FF'),
        myShape2: makeMaterial(0)('#E800A5'),
        myShape3: makeMaterial(1)('#DD0000'),
        myShape4: makeMaterial(0)('#FFFE41'),
        light: new THREE.DirectionalLight(0xFFFFFF),
        light2: new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0),
        plane: new THREE.GridHelper(600, 8, 0x888888, 0x888888),

        myTeam: [],
        enemyTeam: [],

        givenCode: '',


      }
    },
    mounted() {

      this.givenCode = this.code

      console.log(this.code)
      this.myTeam.push(this.myShape)
      // this.myTeam.push(this.myShape2)
      this.enemyTeam.push(this.myShape3)
      // this.enemyTeam.push(this.myShape4)

      console.log(this.myShape)

      //todo ここはmounded
      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas') //fixme domを直接参照しない方法を知りたい

      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      //todo ここはmounded


      this.camera.position.set(1, 300, 850)
      this.camera.rotation.x = -0.3
      // カメラコントローラーを作成
      const controls = new orbitcontrols(this.camera, document.querySelector('#myCanvas'));
      // これなんかJQueryまわりの変なエラー吐くからなぁ…

      //右下
      this.myShape.position.z = 250 // Zのプラス方向を手前側
      this.myShape.position.x = 200 // Xは右側が整数の領域

      //左上
      this.myShape2.position.z = -250
      this.myShape2.position.x = -280

      //右上
      this.myShape3.position.z = -100
      this.myShape3.position.x = -200

      //左下
      this.myShape4.position.z = 200
      this.myShape4.position.x = -200

      this.scene.add(this.myShape)
      this.scene.add(this.myShape3)

      if (!this.isbattle) {
        this.scene.add(this.myShape2)
        this.scene.add(this.myShape4)
      }


      // 平行光源
      // const light = new THREE.DirectionalLight(0xFFFFFF);
      // const light2 = new THREE.DirectionalLight(0xFFFFFF);
      // const light2 = new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0);


      this.light.intensity = 1; //光度
      this.light2.intensity = 1; //光度

      this.light.position.set(600, 600, 600);
      this.light2.position.set(-300, -1000, 0);

      // シーンに追加
      this.scene.add(this.light);
      this.scene.add(this.light2);

      // const plane = new THREE.GridHelper(600, 8, 0x888888, 0x888888);//サイズ、1片あたりいくつ刻むか
      this.plane.position.y = -40;

      this.scene.add(this.plane);

      // let counter = 0
      //myShape.hp = 10 // myShapeはobjectなのでこういう運用もできる可能性を感じた

      let hogefrag = false
      let hogefrag2 = false

      //このtickみたいなものを定義することができれば、コマンド選択した動き？みたいなのを実現できるかもしれない
      const tick = () => {
        // console.log(counter++)

        // console.log(counter)
        // 箱を回転させる
        myShape2.rotation.y += 0.01;
        // box.rotation.y += 0.01;
        // box.rotation.z += 0.01;

        // moveNicely(myShape2)(myShape3)(0)(Approach)
        //
        // if (hgoe) { // このhgoeに入る敵との近さをBoolで返す関数が必要っぽい
        //     //some
        // } else if (huga) {
        //     //some
        // } else if (aa) {
        //     //some
        // }

        // if (justTarget) { // このhgoeに入る敵との近さをBoolで返す関数が必要っぽい
        //     bullet(myShape)(myShape3)
        // } else {
        //     moveNicely(myShape)(myShape3)(0)(Approach)
        // }


        /*
        * もし、敵が近くにいたら
        * 　　攻撃する
        * もし、敵が遠い時は
        * 　　近くに行く
        */

        // myShape.rotation.y += 1;
        // bullet(myShape)(myShape3)
        // bullet(myShape2)(myShape3)

        /*****でもの部分はここを見せるとわかりやすそう！*****************************************************************************************/


        // if (nearTarget(myShape4)(myShape)) {
        //     bullet(myShape4)(myShape)
        // } else {
        //     moveNicely(myShape4)(myShape)(0)(Approach)
        // }
        //
        // // console.log(myShape3.position)
        // // console.log(myShape.bullet.position)
        //
        // // fixme この部分をゆくゆく自動生成できるようにする
        // // shape1が2に近く実験
        // if (hogefrag) {
        //     retreat(myShape)(myShape2)
        // } else if (myShape.position.x !== myShape2.position.x && myShape.position.z !== myShape2.position.z && hogefrag === false) {
        //     Approach(myShape)(myShape2)
        // } else {
        //     hogefrag = true
        //     retreat(myShape)(myShape2)
        // }
        // if (myShape.position.x === 301 && myShape.position.z === 301) {
        //     hogefrag = false
        // }

        /*****************************************-*****************************************************/

        // console.log(searchFarTarget(myShape)(enemyTeam))

        // Approach(myShape)(searchFarTarget(myShape)(enemyTeam))

        // // // shape3が5に近く実験
        if (hogefrag2) {
          retreat(myShape3)(myShape4)
          console.log(1)
        } else if (myShape3.position.x !== myShape4.position.x && myShape3.position.z !== myShape4.position.z && hogefrag2 === false) {
          Approach(myShape3)(myShape4)
          console.log(2)
        } else {
          hogefrag2 = true
          retreat(myShape3)(myShape4)
          console.log(3)
        }
        if (myShape3.position.x === 301 && myShape3.position.z === -301) {
          hogefrag2 = false
        }

        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
      }

      let stringcode = "const tick2=()=>{myShape2.rotation.y += 0.01;renderer.render(scene, camera);requestAnimationFrame(tick2);};tick2()"

      const tickSee = () => {
        renderer.render(this.scene, this.camera);
        requestAnimationFrame(tickSee);
      }


      const init = () => {
        // 初回実行
        try {
          sleep(1000).then(() => {
            console.log('sleepnow')
            // tick()
            // eval(stringcode)
            // renderer.render(scene, camera);
            tickSee()
          })
        } catch (e) {
          console.log(e)
        }
      }

      // window.addEventListener('DOMContentLoaded', init);

      init()
      // if(justTarget(myShape)(searchNearTarget(myShape)(enemyTeam)))bullet(myShape)(searchNearTarget(myShape)(enemyTeam));else moveNicely(myShape)(searchNearTarget(myShape)(enemyTeam))(Approach)(justTarget);

    },
    methods: {
      Approach: obje1 => obje2 => {


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
      },
      test() {

        //これうごくんだけど
        eval(`
        let c = 0;
let cancel = setInterval(() => {
    c++;
    console.log(c);
    if (c > 2000) {
        console.log(cancel);
        clearInterval(cancel)
    }
    if (nearTarget(this.myShape3)(searchNearTarget(this.myShape3)(this.myTeam))) bullet(this.myShape3)(searchNearTarget(this.myShape3)(this.myTeam))(this.scene); else moveNicely(this.myShape3)(searchNearTarget(this.myShape3)(this.myTeam))(Approach)('justTarget')(this.scene);
    if (nearTarget(this.myShape)(searchNearTarget(this.myShape)(this.enemyTeam))) bullet(this.myShape)(searchNearTarget(this.myShape)(this.enemyTeam))(this.scene); else moveNicely(this.myShape)(searchNearTarget(this.myShape)(this.enemyTeam))(Approach)('nearTarget')(this.scene);
}, 10)
        `)
        this.returnCode()
        // let c = 0;
        // let cancel = setInterval(() => {
        //   c++;
        //   // console.log();
        //   if (c > 2000) {
        //     // console.log(cancel);
        //     clearInterval(cancel)
        //   }
        //   if (nearTarget(this.myShape)(searchNearTarget(this.myShape)(this.enemyTeam))) bullet(this.myShape)(searchNearTarget(this.myShape)(this.enemyTeam))(this.scene); else moveNicely(this.myShape)(searchNearTarget(this.myShape)(this.enemyTeam))(Approach)('nearTarget')(this.scene);
        //   //fixme rendererをevalで足す必要はない
        //   //fixme bullet にシーンを引数で渡せばどうとでもなる
        // }, 10)
      },
      evaluate() {
        try {
          eval(this.returnCode())
        } catch (e) {
          console.log(e)
        }
      },
      evaluteTwoCode() {
        try {
          eval(this.returnEnemyMoveCode())
        } catch (e) {
          console.log(e)
        }
      },
      returnCode() {
        return 'let c=0;let cancel=setInterval(()=>{ c++;console.log(c);if(c>2000){console.log(cancel);clearInterval(cancel)}' + this.code + '},10)'
      },
      returnEnemyMoveCode() {
        return 'let c=0;let cancel=setInterval(()=>{ c++;if(c>2000){;clearInterval(cancel)}' + this.code + 'if (nearTarget(this.myShape3)(searchNearTarget(this.myShape3)(this.myTeam))) bullet(this.myShape3)(searchNearTarget(this.myShape3)(this.myTeam))(this.scene); else moveNicely(this.myShape3)(searchNearTarget(this.myShape3)(this.myTeam))(Approach)(\'justTarget\')(this.scene);' + '},10)'

      }

    }

  }


</script>

<!--<script src="~/assets/three.js"></script>-->
<!--<script src="~/assets/index.js"></script>-->

<style scoped>

</style>
