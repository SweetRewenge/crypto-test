<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="exchanges"
  >
    <template v-slot:item.percentTotalVolume="{ item }">
      <span>{{ (+item.percentTotalVolume).toFixed(4) }}%</span>
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
  },
}
</script>
