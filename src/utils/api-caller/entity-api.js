/**
 * [ entity related API calling interface ]
 *
 * @author titus@deepblu.com
 * @since 2017.10
 */

import api from '../api'

let EntityAPI = {}

EntityAPI.insertEntity = (queryObj) => {
  console.log('In registerUser ation : ', queryObj)

  let url = `${__SEEMO_API_BASE_URL}/apis/entity/v0/`

  return api.fire({
    headers: {
      'Accept-Language': 'en',
      'authorization': queryObj.accessToken
    },
    url: url,
    method: 'POST',
    data: queryObj.data
  })
}

EntityAPI.handleReseller = (queryObj) => {
  console.log('ready to call handleReseller api : ', queryObj)

  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/resellerProfile`
  return api.fire({
    headers: {
      'Accept-Language': 'en',
      'authorization': queryObj.accessToken
    },
    url: url,
    method: 'PATCH',
    data: queryObj.data
  })
}

EntityAPI.handleResellerExt = (queryObj) => {
  console.log('ready to call handleResellerExt api : ', queryObj)

  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/resellerProfileEx`
  return api.fire({
    headers: {
      'Accept-Language': 'en',
      'authorization': queryObj.accessToken
    },
    url: url,
    method: 'PATCH',
    data: queryObj.data
  })
}

module.exports = EntityAPI
