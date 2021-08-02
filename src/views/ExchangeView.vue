<template>
  <div class="">
    <h3 class="text-center mb-10"> View {{ pageType }}: {{ $route.params.id }}</h3>
    <v-card>
      <v-tabs>
        <v-tab>
          Candle Chart
        </v-tab>

        <v-tab>
          Last Trades
        </v-tab>

        <v-tab-item>
          <v-card>
            <v-card-text class="d-flex justify-center">
              <trading-vue :data="this.chart" />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-data-table
                class="elevation-1"
                :headers="headers"
                :items="trades"
              >
                <template v-slot:item.priceUsd="{ item }">
                  <span>${{ (+item.priceUsd).toFixed(2) }}</span>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>

  </div>
</template>

<script>
import TradingVue from 'trading-vue-js'
import apiService from '@/services/api.service'

import { createNamespacedHelpers } from 'vuex'
const vuexMarkets = createNamespacedHelpers('markets')
const vuexExchanges = createNamespacedHelpers('exchanges')

export default {
  components: {
    TradingVue,
  },

  data: () => ({
    chart: {
      ohlcv: []
    },
    headers: [
      { text: 'Exchange', value: 'exchange' },
      { text: 'Base', value: 'base' },
      { text: 'Quote', value: 'quote' },
      { text: 'Direction', value: 'direction' },
      { text: 'Price', value: 'price' },
      { text: 'Volume', value: 'volume' },
      { text: 'Price Usd', value: 'priceUsd' },
    ],
    trades: [],
    connectWS: null,
  }),

  computed: {
    pageType() {
      return this.$route.name
    },
  },

  created() {
    this.getCandleData()
    this.connectToTrades()
  },

  beforeDestroy() {
    if (!!this.connectWS) {
      this.connectWS.close()
    }
  },

  methods: {
    ...vuexMarkets.mapGetters(['getMarket']),
    ...vuexExchanges.mapGetters(['getExchange']),

    async getCandleData() {
      const { data } = await apiService.getCandles({
        exchange: this.$route.params.id,
        baseId: this.$route.query.baseId,
        quoteId: this.$route.query.quoteId,
        interval: 'h8',
      })

      this.chart.ohlcv = data.data.map((item) => {
        let arr = Object.keys(item).map((keyItem, index, arr) => {
          if (index < arr.length - 1) {
            return +item[keyItem]
          }

          return item[keyItem]
        })

        arr[0] = arr.splice(arr.length - 1, 1, arr[0])[0] // swap first and last

        return arr
      })
    },

    connectToTrades() {
      this.connectWS = new WebSocket(`wss://ws.coincap.io/trades/${this.$route.params.id}`)
      this.connectWS.onmessage = ({ data }) => {
        this.trades.unshift(JSON.parse(data))

        if (this.trades.length > 100) {
          this.trades.pop()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
