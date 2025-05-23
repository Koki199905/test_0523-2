<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ProductList /> <!--Productlistのコンポーネントを描画-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ProductList from '@/components/ProductList.vue' //ProductList.vueをインポート

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    ProductList //ProductListを追加
  }
}
</script>
