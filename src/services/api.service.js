import axios from 'axios'

export default {
  async getExchanges() {
    return await axios.get('/api/exchanges')
  },

  async getMarkets() {
    return await axios.get('/api/markets')
  },
}
