export const getExchange = (state) => (exchangeId) => {
  return state.exchanges.find(item => item.exchangeId === exchangeId)
}
