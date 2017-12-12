/**
 * [ certs related API calling interface ]
 *
 * @author titus@deepblu.com
 * @since 2017.10
 */

import api from '../api'

let CertAPI = {}

CertAPI.fetchCertsMetaAll = (accessToken) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/diveCert/v0/certMetaAll`

  return api.fire({
    headers: {
      'Accept-Language': 'en',
      'authorization': accessToken
    },
    url: url,
    method: 'GET'
  })
}

module.exports = CertAPI
