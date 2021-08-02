export const getMarket = (state) => (exchangeId) => {
  return state.exchanges.find(item => item.exchangeId === exchangeId)
}
