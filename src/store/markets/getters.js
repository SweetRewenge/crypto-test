export const getMarket = (state) => (exchangeId) => {
  return state.markets.find(item => item.exchangeId === exchangeId)
}
