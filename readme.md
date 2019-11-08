# 卒業制作のためのあれこれ

メイン開発環境はhubpageにまとめられてます
ドキュメントはgoogle drive参照

- blocklysample => blockly周りを試してみたサンプル

- canvasSample => なんかそれっぽい自作フレームワーク＋Vueでの実装

- threeSample => three.js使って描画部分をリッチにいしていきたいねってやつ、Vueも使い始めたあびゃあ

- hubpage => Nuxt製のはぶぺーじ

- threeAndVueEditor => pureJS of myFramework and Vue.js


> 構成
```$xslt
.
├── blockly
│   ├── LICENSE
│   ├── README.md
│   ├── accessible
│   ├── appengine
│   ├── blockly_accessible_compressed.js
│   ├── blockly_accessible_uncompressed.js
│   ├── blockly_compressed.js
│   ├── blockly_uncompressed.js
│   ├── blocks
│   ├── blocks_compressed.js
│   ├── build.py
│   ├── core
│   ├── dart_compressed.js
│   ├── demos
│   ├── externs
│   ├── generators
│   ├── gulpfile.js
│   ├── i18n
│   ├── javascript_compressed.js
│   ├── local_build
│   ├── lua_compressed.js
│   ├── media
│   ├── msg
│   ├── package.json
│   ├── php_compressed.js
│   ├── python_compressed.js
│   ├── tests
│   └── theme_scripts
└── index.html
```

一旦細かな値を定めるために雑に作っていく奴

IE8 とそれ以下のバージョンをサポートしていません

使うかもれしれないやつ
- https://github.com/SortableJS/Sortable
- Three.js
- Vue.js