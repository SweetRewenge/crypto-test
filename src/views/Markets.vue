<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="markets"
    @click:row="openPage"
  >
    <template v-slot:item.priceUsd="{ item }">
      <span>${{ (+item.priceUsd).toFixed(2) }}</span>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('markets')

export default {
  name: 'Markets',

  data:() => ({
    headers: [
      { text: 'Rank', value: 'rank' },
      { text: 'Exchange Id', value: 'exchangeId' },
      { text: 'Base Symbol', value: 'baseSymbol' },
      { text: 'Quote Symbol', value: 'quoteSymbol' },
      { text: 'Price', value: 'priceUsd' },
    ]
  }),

  created() {
    this.getMarkets()
  },

  computed: {
    ...mapState(['markets']),
  },

  methods: {
    ...mapActions(['getMarkets']),

    openPage(value) {
      console.log(value)
      this.$router.push({
        name: 'market',
        params: {
          id: value.exchangeId,
        },
        query: {
          quoteId: value.quoteId,
          baseId: value.baseId,
        }
      })
    },
  },
}
</script>
