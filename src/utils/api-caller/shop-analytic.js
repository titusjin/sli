import api from '~/src/utils/api'

const host = __IP__BACKEND_API
const baseURL = '/ipbackend/analytics/v0/sales/'

module.exports.buyerSummaryInCountry = function (querys) {
  const { country } = querys

  return api.fire({
    url: `${host}${baseURL}buyerSummaryInCountry?country=${country}`,
    method: 'get',
    headers: {
      'Accept-Language': 'en',
      'content-type': 'application/json'
    }
  })
}
