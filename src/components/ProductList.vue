<template>
  <v-app>
    <!-- メインコンテンツ -->
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <!-- タイトル表示 -->
            <h2 class="text-h5 font-weight-bold text-center mb-4">
              商品一覧
            </h2>

            <!-- 検索欄 -->
            <v-text-field
              v-model="search"
              label="商品を検索"
              placeholder="商品名をここに入力…"
              prepend-icon="mdi-magnify"
              solo
            ></v-text-field>

            <!-- 商品リスト -->
            <v-list
              class="text-center flex-column align-center"
              two-line
              dense
            >
              <v-card
                v-for="item in filteredProducts"
                :key="item.id"
                cols="12"
                sm="6"
                md="4"
                class="outlined-card"
                elevation="4"
              >
                <v-card-text>
                  <v-card-title class="text-left">{{ item.name }}</v-card-title>
                  <v-img
                    :src="item.image"
                    height="200px"
                    class="product-image mb-2"
                    cover
                  ></v-img>
                  <v-card-subtitle>
                    {{ item.price }}円 / {{ item.quantity }}個
                  </v-card-subtitle>
                </v-card-text>

                <v-card-actions>
                  <v-btn small color="primary" @click="addToCart(item)">
                    追加
                  </v-btn>
                </v-card-actions>

                <v-card-actions>
                  <v-btn small color="primary" @click="clearCart(item)">
                    削除
                  </v-btn>
                </v-card-actions>

                <v-card-actions>
                  <v-btn small color="primary" @click="goToDetail(item.name)">
                    商品詳細
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

      <!-- 固定フッター -->
      <v-footer
        app
        fixed
        color="white"
        class="pa-4"
        style="border-top: 1px solid #999; box-shadow: 0 -1px 0 #999;"
        >
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="12" md="6" class="text-center">
              <div class="text-subtitle-1 font-weight-bold mb-2">
                合計金額：{{ totalPrice }}円
              </div>
              <v-btn color="primary" to="/purchase" tag="router-link">
                購入確認
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    };
  },
  computed: {
    filteredProducts() {
      return this.$store.state.product.products.filter(product =>
        product.name.includes(this.search)
      );
    },
    products() {
      return this.$store.state.product.products;
    },
    totalPrice() {
      return this.$store.getters['product/totalPrice'];
    },
  },
  methods: {
    clearCart(product) {
      this.$store.commit('product/clearCart', product);
    },
    addToCart(product) {
      this.$store.commit('product/addToCart', product);
    },
    goToDetail(productName) {
      this.$router.push({ name: 'about', query: { name: productName } });
    },
  },
};
</script>

<style scoped>
.v-main {
  padding-bottom: 80px;
}
.outlined-card {
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}
.outlined-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>
