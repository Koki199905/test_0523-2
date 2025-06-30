<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="6">
        
        <!-- タイトル表示 -->
        <h2 class="text-h5 font-weight-bold text-center mb-4">
          商品詳細
        </h2>


        <!-- 商品リストを表示する Vuetify のリストコンポーネント -->
        
          <!-- 商品データを1件ずつ表示 -->
          <v-card
            v-for="item in products"
            :key="item.id"
            cols="12" sm="6" md="4"
            class="outlined-card"
            elevation="4"
          >
            <!-- 商品情報を表示するブロック -->
            <v-card-text>

              <!-- 商品名 -->
              <v-card-title class="text-left">{{ item.Name }}</v-card-title>
              <v-divider class="my-4"></v-divider>

              <!-- 商品画像を表示する一時的にコメントアウト（開発済） -->
              <!-- <v-img
                :src=item.image
                height="200px"
                class="mb-2"
                contain
              ></v-img> -->

              <!-- 詳細欄 -->
              <div><strong>価格：</strong>{{ item.Price }}円</div>
              <div><strong>カロリー：</strong>{{ item.Calories }}kcal</div>
              <div><strong>おすすめポイント：</strong>{{ item.Recommendation }}</div>
              <div><strong>アレルギー情報：</strong>{{ item.Allergy }}</div>
              <div><strong>ボリューム感：</strong>{{ item.Volume }}</div>
              <div><strong>消費期限：</strong>{{ item.Deadline }}</div>
              <v-btn color="blue" class="mx-auto my-5" max-width="600" to="/" tag="router-link">商品一覧に戻る</v-btn>

              
            </v-card-text>

          </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

...
<!-- 商品名をキーにProductTableから詳細情報を取得する -->
<script>
export default {
  data() {
    return {
      productDetail: null,
    };
  },
  async created() {
    const productName = this.$route.query.name;
    if (productName) {
      try {
        const response = await fetch(`https://m3h-hayashi-0606.azurewebsites.net/api/SELECT?name=${encodeURIComponent(productName)}`);
        const data = await response.json();
      // 商品名で一致する商品を抽出（完全一致）
        const matched = data.List.find(item => item.Name === productName);
        this.productDetail = matched || null;
      } catch (error) {
        console.error('商品詳細の取得に失敗しました:', error);
      }
    }
  },
  computed: {
    products() {
      return this.productDetail ? [this.productDetail] : [];
    }
  }
}
</script>



<style scoped>
  .outlined-card {
    border: 2px solid #ccc;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
  }
  .outlined-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
</style>
