<template>
    <div>
        <h2>商品一覧</h2>
        <ul>
            <!-- VueXのstate.productsをループで全て表示 -->
            <li v-for="item in products" :key="item.id">
                {{ item.name }} - {{ item.price }}円 - {{ item.quantity }}個
                <button @click="addToCart(item)">追加</button> <!--mutationボタンを追加-->
            </li>
        </ul>
            <p><strong>合計金額：</strong>{{ totalPrice }}円</p> <!--合計金額を表示するビューを追加-->
    </div>
</template>
  
<script>
    export default {
        computed: {
            
            // VueXのstateから商品リストを取得
            products() {
                return this.$store.state.product.products; // 名前空間の変更
            },
            
            // getterから合計金額を取得
            totalPrice() {
                return this.$store.getters['product/totalPrice']; // 名前空間の変更
            }
        },

        methods: {
            // ボタン押下でmutationをcommitする
            addToCart(product) {
                this.$store.commit('product/addToCart', product); // 名前空間の変更
            }
        }
    }
</script>
  
  <style scoped>
  .product-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 8px;
  }
  </style>