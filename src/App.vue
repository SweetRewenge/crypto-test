<template>
  <v-app>
    <v-app-bar
      class="d-flex justify-center"
      app
      color="primary"
      dark
    >
    <v-btn
      class="mr-2"
      :to="{ name: 'markets' }"
      text
    >
      Markets
    </v-btn>
    <v-btn
      :to="{ name: 'exchanges' }"
      text
    >
      Exchanges
    </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view class="mt-10" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
