## setup环境-集成jest做单元测试-集成ts


`npm init -y`

安装tsconfig 大概会报错 缺少 typescript
`npx tsc --init`

先安装typescript 再安装tsconfig
`npm install typescript`
`npx tsc --init`


安装 jest 环境  类型申明文件  https://jestjs.io/
`npm i jest @types/jest --dev`

tsconfig.js 中设置
```js
 "types": ["jest"]
 ```

jest 运行nodejs环境（commonjs环境）

babel 转换成 esm   (https://jestjs.io/docs/getting-started)

`npm install --save-dev babel-jest @babel/core @babel/preset-env`
`npm install --save-dev @babel/preset-typescript`

根目录新建 babel.config.js

```js
 module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
  };
 ```
