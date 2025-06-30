<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="6" class="text-center">
        
        <!-- タイトル表示 -->
        <h2 class="text-h5 font-weight-bold mb-4">購入履歴</h2>
        <v-data-table
          :headers="headers"
          :items="purchases"
          class="elevation-1"
          :items-per-page="5"
        >

        </v-data-table>

      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: 'PurchaseHistory',
  data() {
    return {

      // 購入履歴のテーブルヘッダー(14行目)
      headers: [
        { text: '商品名', value: 'name' },
        { text: '購入日', value: 'date' },
        { text: '数量', value: 'count' },
        { text: '単価', value: 'price' },
        { text: '合計金額', value: 'total' },
      ],

      // 購入履歴のデータ
      // APIから取得したデータを格納する配列
      purchases: [],
    };
  },
  // 画面表示後に購入履歴を取得する(fetchPurchaseHistoryを呼び出す)
  mounted() {
    this.fetchPurchaseHistory();
  },
  methods: {
    async fetchPurchaseHistory() {
      try {
        const response = await fetch('https://m3h-hayashi-0606.azurewebsites.net/api/SELECT2?');
        const data = await response.json();

        // フロント側で購入日付を取得
        const today = new Date().toISOString().split('T')[0]; // new Date().toISOString().split('T')[0] は "YYYY-MM-DD" 形式で日付を取得

        // APIから取得したデータをpurchasesに格納(返却値はListというキーの配列に格納されるのでdata.Listとする)        
        this.purchases = data.List.map(item => ({
          name: item.Name,
          date: today, // 購入日は固定
          count: item.Count,
          price: item.Price,
          total: item.Count * item.Price,
        }));
      } catch (error) {
        console.error('購入履歴の取得に失敗しました:', error);
      }
    },
  },
};
</script>


<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
