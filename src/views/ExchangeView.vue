<template>
  <div class="">
    <trading-vue :data="this.chart" />
  </div>
</template>

<script>
import TradingVue from 'trading-vue-js'
import apiService from '@/services/api.service'

export default {
  data: () => ({
    chart: {
      ohlcv: []
    },
  }),

  created() {
    this.getCandleData()
  },

  components: {
    TradingVue,
  },

  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
