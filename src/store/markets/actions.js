import apiService from '@/services/api.service'

export const getMarkets = async ({ commit }) => {
  const { data } = await apiService.getMarkets()

  commit('setMarkets', { data: data.data })
}
