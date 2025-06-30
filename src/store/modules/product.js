
export default {
  namespaced: true, // モジュール名でアクセスするための設定
  state: {
    products: [
      { id: 1, name: '日の丸弁当', price: 300, quantity: 0, image: 'https://i.gyazo.com/a07db2f52cd0ee65194ce8b5464fc4b1.jpg' },
      { id: 2, name: '唐揚げ弁当', price: 750, quantity: 0, image: 'https://i.gyazo.com/dd1e43ead3b6de330c4f1d422c620e80.jpg' },
      { id: 3, name: '焼売弁当', price: 800, quantity: 0, image: 'https://i.gyazo.com/c91dea941d71a348924713892740bd56.jpg' },
      { id: 4, name: '日替わり弁当', price: 650, quantity: 0, image: 'https://i.gyazo.com/a0e447c95e03bc40a67b074e9b245479.png' },
      { id: 5, name: '豚の生姜焼き弁当', price: 850, quantity: 0, image: 'https://i.gyazo.com/6c492f6f04f78df0c9f3e54afd3ab68c.png' },
      { id: 6, name: '野菜炒め弁当', price: 650, quantity: 0, image: 'https://i.gyazo.com/dd0b6d9baa2dba73066a67a7c8de0c72.png' },
      { id: 7, name: 'かつ丼', price: 900, quantity: 0, image: 'https://i.gyazo.com/3ed6bd80174701ca6a395d3cd15697b8.png' },
      { id: 8, name: '和牛弁当', price: 1500, quantity: 0, image: 'https://i.gyazo.com/a2942dc2d151208c05279185801aa281.png' },
      { id: 9, name: '海の幸弁当', price: 1700, quantity: 0, image: 'https://i.gyazo.com/a7501c7a4bfc46116c61c0b23cf5a007.png' },
      { id: 10, name: '玉子焼き', price: 250, quantity: 0, image: 'https://i.gyazo.com/357240dd34ec22d7a5727c9d42049b00.png' },
      { id: 11, name: '味噌汁', price: 150, quantity: 0, image: 'https://i.gyazo.com/941c42fa156d4c32d717e6e3414354de.png' }
    ],
    // details: [
    //   { id: 1, name: '日の丸弁当', price: 300, calories: 150, recommendation: 'おいしいです', allergy: 'なし', image: 'https://i.gyazo.com/a07db2f52cd0ee65194ce8b5464fc4b1.jpg', volume: "成人男性で満腹感あり", deadline:"製造から一日" },
    //   { id: 2, name: '日の丸弁当', price: 300, calories: 150, recommendation: 'おいしいです', allergy: 'なし', image: 'https://i.gyazo.com/a07db2f52cd0ee65194ce8b5464fc4b1.jpg', volume: "成人男性で満腹感あり", deadline:"製造から一日" },
    //   { id: 3, name: '日の丸弁当', price: 300, calories: 150, recommendation: 'おいしいです', allergy: 'なし', image: 'https://i.gyazo.com/a07db2f52cd0ee65194ce8b5464fc4b1.jpg', volume: "成人男性で満腹感あり", deadline:"製造から一日" }
    // ],
    // 購入確認時の合計金額を保持
    confirmedTotalPrice: 0,
    //購入時の情報をHistoryTableに渡すための情報
    confirmedProduct: null,
  },
  getters: {
    totalPrice(state) {
      return state.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    productsInCart(state) {
      return state.products.filter(p => p.quantity > 0);
    },
    confirmedTotalPrice(state) {
      return state.confirmedTotalPrice;
    },
    confirmedProducts(state) {
      return state.products.filter(p => p.quantity > 0);
    },
  },
  mutations: {
    addToCart(state, product) {
      const item = state.products.find(p => p.id === product.id);
      if (item) item.quantity++;
    },
    clearCart(state) {
      state.products.forEach(p => (p.quantity = 0));
    },
    setConfirmedTotalPrice(state, price) {
      state.confirmedTotalPrice = price;
    },
    resetConfirmedTotalPrice(state) {
      state.confirmedTotalPrice = 0;
    },
    setConfirmedProduct(state, product) {
      state.confirmedProduct = product;
    },
  },
  actions: {
    async purchaseItems({ commit }) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      commit('clearCart');
    }
  }
}