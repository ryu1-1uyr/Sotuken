const width = 900;
const height = 900;

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
camera.position.set(1, 1, +80);

// カメラコントローラーを作成
const controls = new THREE.OrbitControls(camera);
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

const makeMaterial = identificationCode => color => {
    const material = new THREE.Mesh(makePlayers(identificationCode), returnMaterial(color))

    switch (identificationCode) {
        case 0:
            material.hp = 100
            material.fireRate = 5
            break
        case 1:
            material.hp = 140
            material.fireRate = 3
            break
        case 2:
            material.hp = 120
            material.fireRate = 2
            break
    }

    console.log(material)
    return material

}

const myShape = makeMaterial(2)( '#0040FF')
const myShape2 = makeMaterial(0)( '#E800A5')
const myShape3 = makeMaterial(1)( '#00E880')
const myShape4 = makeMaterial(0)( '#FFFE41')

scene.add(myShape)
scene.add(myShape2)
scene.add(myShape3)
scene.add(myShape4)

//右下
myShape.position.z = 300 // Zのプラス方向を手前側
myShape.position.x = 300 // Xは右側が整数の領域

//左上
myShape2.position.z = -300
myShape2.position.x = -300

//右上
myShape3.position.z = -300
myShape3.position.x = 300

//左下
myShape4.position.z = 300
myShape4.position.x = -300

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

    // console.log(counter)
    // 箱を回転させる
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;
    // box.rotation.z += 0.01;

    // myShape.rotation.y += 1;

    // shape1が2に近く実験
    if (hogefrag) {
        console.log("a")
        retreat(myShape)(myShape2)
    } else if (myShape.position.x !== myShape2.position.x && myShape.position.z !== myShape2.position.z && hogefrag === false) {
        Approach(myShape)(myShape2)
        console.log("i")
    } else {
        hogefrag = true
        retreat(myShape)(myShape2)
        console.log("u")
    }
    if (myShape.position.x === 301 && myShape.position.z === 301) {
        hogefrag = false
    }

    console.log(myShape3.position)
    // // shape3が5に近く実験
    if (hogefrag2) {
        // console.log(1)
        retreat(myShape3)(myShape4)
    } else if (myShape3.position.x !== myShape4.position.x && myShape3.position.z !== myShape4.position.z && hogefrag2 === false) {
        Approach(myShape3)(myShape4)
        // console.log(2)
    } else {
        hogefrag2 = true
        // console.log(3)
        retreat(myShape3)(myShape4)
    }
    if (myShape3.position.x === 301 && myShape3.position.z === -301) {
        hogefrag2 = false
    }

    // console.log(hogefrag2)

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
}


const init = () => {
    // 初回実行
    try {
        tick();
    } catch (e) {
        console.log(e)
    }
}

window.addEventListener('DOMContentLoaded', init);
