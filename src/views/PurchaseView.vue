<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="6" class="text-center">
        
        <!-- タイトル表示 -->
        <h2 class="text-h5 font-weight-bold text-center mb-4">購入確認ページ</h2>

        <!-- 商品リストの説明文 -->
        <p class="text-subtitle-1 mb-2">カートに入っている商品一覧：</p>

        <!-- カート内の商品を表示する Vuetify のリストコンポーネント -->
        <v-list dense class="mb-4">
          <!-- 数量が1以上の商品だけを1件ずつ表示 -->
          <v-list-item
            v-for="item in productsInCart"
            :key="item.id"
          >
            <!-- 商品名と個数を中央揃えで表示 -->
            <v-list-item-content class="text-center">
              <v-list-item-title>
                {{ item.name }} × {{ item.quantity }}個
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- 合計金額の表示 -->
        <v-divider class="my-3"></v-divider>
        <p class="text-subtitle-1 font-weight-bold mb-4">
          合計金額：{{ totalPrice }}円
        </p>

        <!-- 購入者情報入力ページへのリンクボタン(商品名・個数・値段・合計金額を保持する) -->
        <v-btn color="success" class="mx-auto my-5" @click="goToInput">
          購入者・決済情報入力へ
        </v-btn>

      </v-col>
    </v-row>
  </v-container>
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
      },
      goToInput() {
        console.log('保存する合計金額:', this.totalPrice); 
        this.$store.commit('product/setConfirmedTotalPrice', this.totalPrice);
        // 商品情報を保存（複数対応する場合は配列で保存）
        const selectedProduct = this.productsInCart[0];
        if (selectedProduct) {
          this.$store.commit('product/setConfirmedProduct', {
            name: selectedProduct.name,
            price: selectedProduct.price,
            count: selectedProduct.quantity
          });  
        }
        this.$router.push('/input');
      }
    }
  }
</script>