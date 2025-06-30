<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://i.gyazo.com/31528b044dfa172adbe0cf4c87994042.png"
          transition="scale-transition"
          width="50"
        />
        <h2>おべんとう屋</h2>
        <small class="text-caption grey--text">会議・ロケ・イベントに最適なお弁当をお届け</small>
    
      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/" tag="router-link">商品一覧</v-btn>
      <!-- <v-btn text to="/about" tag="router-link">商品詳細</v-btn> -->
      <!-- <v-btn text to="/purchase" tag="router-link">購入確認</v-btn>             購入確認ビューを追加 -->
      <!-- <v-btn text to="/input" tag="router-link">購入者・決済情報入力</v-btn>     購入者・決済情報入力ビューを追加 -->
      <v-btn text to="/history" tag="router-link">購入履歴</v-btn>              <!-- 購入履歴ビューを追加 -->      
    </v-app-bar>
    
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>