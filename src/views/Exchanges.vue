<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="exchanges"
    @click:row="openPage"
  >
    <template v-slot:item.percentTotalVolume="{ item }">
      <span>{{ (+item.percentTotalVolume).toFixed(2) }}%</span>
    </template>

    <template v-slot:item.volumeUsd="{ item }">
      <span>${{ (+item.volumeUsd).toFixed(0) }}</span>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('exchanges')

export default {
  name: 'Exchanges',

  data:() => ({
    headers: [
      { text: 'Rank', value: 'rank' },
      { text: 'Name', value: 'name' },
      { text: 'Trading Pairs', value: 'tradingPairs' },
      { text: 'Percent Total Volume', value: 'percentTotalVolume' },
      { text: 'Volume Usd', value: 'volumeUsd' },
    ]
  }),

  created() {
    this.getExchanges()
  },

  computed: {
    ...mapState(['exchanges']),
  },

  methods: {
    ...mapActions(['getExchanges']),

    openPage(value) {
      this.$router.push({
        name: 'exchange',
        params: {
          id: value.exchangeId
        }
      })
    },
  },
}
</script>
