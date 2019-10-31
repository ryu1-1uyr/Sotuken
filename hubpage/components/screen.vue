<template>
  <div>
    <canvas id='myCanvas'></canvas>
  </div>
</template>

<script>
  import * as THREE from "three";
  import orbitcontrols from 'three-orbitcontrols';

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
        myShape3: makeMaterial(1)('#00E880'),
        myShape4: makeMaterial(0)('#FFFE41'),
        light: new THREE.DirectionalLight(0xFFFFFF),
        light2: new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0),
        plane: new THREE.GridHelper(600, 8, 0x888888, 0x888888),

        myTeam: [
          this.myShape,
          this.myShape2,
        ],
        enemyTeam: [
          this.myShape3,
          this.myShape4,
        ],


      }
    },
    mounted() {

      //todo ここはmounded
      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      //todo ここはmounded


      this.camera.position.set(1, 300, 850)
      this.camera.rotation.x = -0.3
      // カメラコントローラーを作成
      const controls = new orbitcontrols(this.camera, document.querySelector('#myCanvas'));
      // これなんかJQueryまわりの変なエラー吐くからなぁ…

      //fixme シーンにオブジェクトが追加されない可能性 add を外部関数でやっているから
      //右下
      this.myShape.position.z = 300 // Zのプラス方向を手前側
      this.myShape.position.x = 300 // Xは右側が整数の領域

      //左上
      this.myShape2.position.z = -250
      this.myShape2.position.x = -280

      //右上
      this.myShape3.position.z = -300
      this.myShape3.position.x = 300

      //左下
      this.myShape4.position.z = 200
      this.myShape4.position.x = -200

      this.scene.add(this.myShape)
      this.scene.add(this.myShape2)
      this.scene.add(this.myShape3)
      this.scene.add(this.myShape4)


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

      const sleep = (waitSec) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, waitSec);
        });
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

    }

  }


</script>

<!--<script src="~/assets/three.js"></script>-->
<!--<script src="~/assets/index.js"></script>-->

<style scoped>

</style>
