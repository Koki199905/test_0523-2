const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  // //CORS対策のための設定(http://localhost:8081（Vueアプリ）から http://localhost:7071（API）にアクセスできるようにするため)※開発環境限定。ビルド後の本番環境では使えない。
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7071', // APIサーバーのURL
        changeOrigin: true,
      }
    }
  }
})
