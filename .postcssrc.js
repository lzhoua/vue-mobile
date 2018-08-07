// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {}, // 解决@import引入路径问题
    "postcss-url": {}, // 处理文件、图片、字体等引用路径问题
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}