import apiService from '@/services/api.service'

export const getExchanges = async ({ commit }) => {
  const { data } = await apiService.getExchanges()

  commit('setExchanges', { data: data.data })
}
