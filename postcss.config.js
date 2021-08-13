module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 通常为设计稿的十分之一，但这里为了适配vant的样式，设置为37.5
      propList: ['*'] // 转换的属性白名单，所有在内的属性都可以转换为rem（内联样式除外）
    }
  }
}
