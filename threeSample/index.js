const width = 600;
const height = 600;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(1, 300, 850)
camera.rotation.x = - 0.3
// カメラコントローラーを作成
// const controls = new THREE.OrbitControls(camera);
// これなんかJQueryまわりの変なエラー吐くからなぁ…

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
            material.bullet.baseSpeed = {x:1, z:1}
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
    scene.add(material)
    // material.geometry.boundingSphere.radius *= 0.8

    return material

}

const myShape = makeMaterial(2)('#0040FF')
const myShape2 = makeMaterial(0)('#E800A5')

const myShape3 = makeMaterial(1)('#00E880')
const myShape4 = makeMaterial(0)('#FFFE41')

// scene.add(myShape)
// scene.add(myShape2)
// scene.add(myShape3)
// scene.add(myShape4)

//右下
myShape.position.z = 30 // Zのプラス方向を手前側
myShape.position.x = 30 // Xは右側が整数の領域

//左上
myShape2.position.z = -300
myShape2.position.x = -300

//右上
myShape3.position.z = -300
myShape3.position.x = 300

//左下
myShape4.position.z = 200
myShape4.position.x = -200

// 平行光源
const light = new THREE.DirectionalLight(0xFFFFFF);
// const light2 = new THREE.DirectionalLight(0xFFFFFF);
const light2 = new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0);


light.intensity = 1; //光度
light2.intensity = 1; //光度

light.position.set(600, 600, 600);
light2.position.set(-300, -1000, 0);

// シーンに追加
scene.add(light);
scene.add(light2);

const plane = new THREE.GridHelper(600, 8, 0x888888, 0x888888);//サイズ、1片あたりいくつ刻むか
plane.position.y = -40;
scene.add(plane);

// let counter = 0
//myShape.hp = 10 // myShapeはobjectなのでこういう運用もできる可能性を感じた

let hogefrag = false
let hogefrag2 = false

//このtickみたいなものを定義することができれば、コマンド選択した動き？みたいなのを実現できるかもしれない
tick = () => {
    // console.log(counter++)

    // console.log(counter)
    // 箱を回転させる
    myShape2.rotation.y += 0.01;
    // box.rotation.y += 0.01;
    // box.rotation.z += 0.01;

    // myShape.rotation.y += 1;
    bullet(myShape)(myShape3)
    // console.log(myShape3.position)
    // console.log(myShape.bullet.position)

    // fixme この部分をゆくゆく自動生成できるようにする
    // shape1が2に近く実験
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

    // // // shape3が5に近く実験
    // if (hogefrag2) {
    //     retreat(myShape3)(myShape4)
    //     console.log(1)
    // } else if (myShape3.position.x !== myShape4.position.x && myShape3.position.z !== myShape4.position.z && hogefrag2 === false) {
    //     Approach(myShape3)(myShape4)
    //     console.log(2)
    // } else {
    //     hogefrag2 = true
    //     retreat(myShape3)(myShape4)
    //     console.log(3)
    // }
    // if (myShape3.position.x === 301 && myShape3.position.z === -301) {
    //     hogefrag2 = false
    // }

    console.log(camera.position)


    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
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
            tick();
        })
    } catch (e) {
        console.log(e)
    }
}

window.addEventListener('DOMContentLoaded', init);
