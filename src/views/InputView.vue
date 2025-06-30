<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="6" class="text-center">
        

            <!-- フォーム送信時にページのリロードを防ぎ、submitOrder 関数を呼び出す -->
            <form @submit.prevent="submitOrder">
              <!-- 情報入力欄 -->
              
              <h2>購入者情報</h2>
              <v-text-field 
                v-model="form.name"
                label="氏名(必須)"
                :rules="requiredRule"
                hint="この項目は必須です"
                placeholder="例：山田太郎"
                outlined
               />
              
              <v-text-field
                v-model="form.email"
                label="メールアドレス(必須)"
                :rules="requiredRule"
                hint="この項目は必須です"
                placeholder="例：taro.yamada@gmail.com"
                outlined
              />
              
              <v-text-field
                v-model="form.phone"
                label="電話番号(任意)"
                placeholder="例：090-0000-0000"
                outlined
               />

              <v-text-field
                v-model="form.address"
                label="住所(必須)"
                :rules="requiredRule"
                hint="この項目は必須です"
                placeholder="例：東京都新宿区西新宿3-7-1 新宿パークタワー 27階"
                outlined
              />

              <h2>クレジットカード情報</h2>
              <v-text-field
                v-model="form.cardNumber"
                placeholder="カード番号"
                outlined
              />

              <v-text-field
                v-model="form.expiry"
                placeholder="有効期限 (MM/YY)"
                outlined
              />

              <v-text-field
                v-model="form.cvv"
                placeholder="CVV"
                outlined
              />

            <!-- 合計金額の表示(再掲) -->
            <v-divider class="my-3"></v-divider>
            <p class="text-subtitle-1 font-weight-bold mb-4">
              合計金額：{{ totalPrice }}円
            </p>


              <v-btn type="submit" color="primary" class="mt-4">注文する</v-btn>
            
            </form>

      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios';

export default {
  data(){
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
      },
      requiredRule: [(value) => !!value || 'この項目は必須です'],
    };
  },
  computed: {
    totalPrice() {
      return this.$store.getters['product/confirmedTotalPrice'];
    }
  },
  methods: {
    async submitOrder() {
      try {
        const products = this.$store.getters['product/confirmedProducts'];

        if (!products || products.length === 0) {
          alert('商品が選択されていません。');
          return;
        }

        // 各商品をループして送信
        for (const product of products) {
          const params = new URLSearchParams({
            Name: product.name,
            Price: product.price,
            Count: product.quantity
          });

          console.log('送信データ:', params.toString());

          await axios.get(`/api/INSERT?${params.toString()}`);
        }

        alert('購入が完了しました！発送までお待ちください。');

        // 合計金額とカートをリセット
        this.$store.commit('product/resetConfirmedTotalPrice');
        this.$store.commit('product/clearCart');

        // フォームをリセット
        this.form = {
          name: '',
          email: '',
          phone: '',
          address: '',
          cardNumber: '',
          expiry: '',
          cvv: ''
        };

      } catch (error) {
        console.error('注文処理中にエラーが発生しました:', error);
        alert('注文に失敗しました。もう一度お試しください。');
      }
    }

  },
  mounted() {
    console.log('取得した合計金額:', this.totalPrice);
  }
}
</script>


<style scoped>

  form {
    max-width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  input, select {
    margin: 8px 0;
    padding: 8px;
  }
  button {
    margin-top: 16px;
    padding: 10px;
  }
  
</style>
