## vue 移动端适配方案

- master分支： 使用淘宝的 `flexible` 进行移动端适配
- vm 分支： 使用vm 进行移动端适配方案

#### 阿里可伸缩布局方案 `lib-flexible`
1. 使用 `vue-cli` 初始化一个项目

2. 安装 `lib-flexible` 和 `px2rem-loader`
```
  npm install lib-flexible px2rem-loader --save
```

3. 引入 `lib-flexible`：(在 `mian.js` 中引入)
```javascript
import 'lib-flexible/flexible'
```
4. 配置 `px2rem-loader`：（在项目 `build` 文件下的 `utils.js` 里面修改）
```javascript
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // const postcssLoader = {
  //   loader: 'postcss-loader',
  //   options: {
  //     sourceMap: options.sourceMap
  //   }
  // }

  const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 75 // 设置转换比例，这里是 1rem === 75px
    }
  } 

 // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    // const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    const loaders = [cssLoader,px2remLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
```
5. `px2rem` 用法
- 安装px2rem后，再使用px上有些不同，大家可以参考[px2rem](https://www.npmjs.com/package/px2rem)官方介绍，下面简单介绍一下。

  >1. 直接写px，编译后会直接转化成rem ---- 除开下面两种情况，其他长度用这个
  >2. 在px后面添加/*no*/，不会转化px，会原样输出。 --- 一般border需用这个
  >3. 在px后面添加/*px*/,会根据dpr的不同，生成三套代码。---- 一般字体需用这个 

**示例：**
```css
.selector {
    width: 150px;
    height: 64px; /*px*/
    font-size: 28px; /*px*/
    border: 1px solid #ddd; /*no*/
}
编译后（打包后的代码）
.selector {
    width: 2rem;
    border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
    height: 32px;
    font-size: 14px;
}
[data-dpr="2"] .selector {
    height: 64px;
    font-size: 28px;
}
[data-dpr="3"] .selector {
    height: 96px;
    font-size: 42px;
}
```

**[注意:]**
  
  **1. 不能在index.html的头部加 name 为 viewport 的 meta 标签，flexible会自动为我们添加！**
  
  **2. 使用 `px2rem` 可能会导致引用的ui库也会被转换**

> 如果是 vscode 编辑器， 可以使用 cssrem 插件，下载后，在 文件 -> 首选项 -> 设置，用户设置
```json
// 基础的font-size, 如果设计图是750标准的，设置成75
"cssrem.rootFontSize": 75, 
// px转rem小数点最大长度
"cssrem.fixedDigits":  2,
// 自动移除0开头的前缀，默认：true
"cssrem.autoRemovePrefixZero": true
```
  

### 使用 vw 适配方案

[参考文章： 大漠老师对 vw 布局的讲解](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

1. 通过 vue-cli 构建的项目，在项目根目录下有一个 .postcssrc.js，默认已经有了
```javascript
module.exports = { 
  "plugins": { 
    "postcss-import": {},
    "postcss-url": {},
    "autoprefixer": {}
  } 
}
```
2. 安装插件：</br>
  Vue-cli默认配置了上述三个PostCSS插件，但我们要完成vw的布局兼容方案，或者说让我们能更专心的撸码，还需要配置下面的几个PostCSS插件：
  - postcss-aspect-ratio-mini
  - postcss-px-to-viewport
  - postcss-write-svg
  - postcss-cssnext
  - postcss-viewport-units
  - cssnano
```
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --save
```

3. 在 `.postcssrc.js`文件中对新安装的 `PostCSS` 插件进行配置：
```javascript
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数
      viewportUnit: "vw",   //指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false     // 允许在媒体查询中转换`px`
    },
    "postcss-viewport-units": {},
    "cssnano": {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    }
  }
}
```
> **【注意】**: 因为 `cssnano` 的配置中，使用了preset: "advanced"，所以我们需要另外安装：
```
npm i cssnano-preset-advanced --save-dev
```

目前出视觉设计稿，我们都是使用750px宽度的，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。在实际撸码过程，不需要进行任何的计算，直接在代码中写px，比如：
```css
  .test {
    border: .5px solid black;
    border-bottom-width: 4px;
    font-size: 14px;
    line-height: 20px;
    position: relative;
  }
  [w-188-246] {
    width: 188px;
  }
```
编译出来的CSS：
```css
  .test {
    border: .5px solid #000;
    border-bottom-width: .533vw;
    font-size: 1.867vw;
    line-height: 2.667vw;
    position: relative; 
  } 
  [w-188-246] { 
    width: 25.067vw; 
  }
```
在不想要把px转换为vw的时候，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)：
```html
 <div class="box ignore"></div>
```
其余具体使用，请查看 [文章](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
