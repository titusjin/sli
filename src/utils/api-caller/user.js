import api from '../api'

export const updateUserForShopAPI = (userId) => {
  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/shopSync/v0/syncuser/${userId}`,
    method: 'PUT'
  })
}
