const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  // 加上configureWebpack才是修改webpack配置
  configureWebpack: {
    // 配置解决跨域访问的问题
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://152.136.185.210:4000',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    },
    // 按需引入饿了么
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  transpileDependencies: true
})
