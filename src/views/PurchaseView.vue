<template>
    <div>
      <h2>購入ページ</h2>
      <p>カートに入っている商品一覧：</p>
      <ul>
        <!-- 数量が1以上の商品のみに絞って表示 -->
        <li v-for="item in productsInCart" :key="item.id">
          {{ item.name }} - {{ item.quantity }}個
        </li>
      </ul>
      <p><strong>合計金額：</strong>{{ totalPrice }}円</p>
  
      <button @click="purchase" :disabled="loading">
        {{ loading ? '購入処理中...' : '購入する' }}
      </button>
  
      <div v-if="showPopup" class="popup">
        購入が完了しました！
      </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        loading: false,
        showPopup: false
      }
    },
    computed: {
      // 数量が1以上の商品だけを返す
      productsInCart() {
        return this.$store.state.product.products.filter(p => p.quantity > 0); // 名前空間の変更
      },
      totalPrice() {
        return this.$store.getters['product/totalPrice'];
      }
    },
    methods: {
      async purchase() {
        this.loading = true;
        await this.$store.dispatch('product/purchaseItems'); // 名前空間の変更
        this.loading = false;
        this.showPopup = true;
  
        // ポップアップは2秒後に消える
        setTimeout(() => {
          this.showPopup = false;
        }, 2000);
      }
    }
  }
</script>
  
  <style scoped>
  .popup {
    margin-top: 20px;
    padding: 10px;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 5px;
    text-align: center;
  }
  </style>