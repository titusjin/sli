/**
 * [ user related API calling interface ]
 *
 * @author titus@deepblu.com
 * @since 2017.10
 */

import api from '../api'
import eventName from '~/src/utils/eventName'

let UserAPI = {}

UserAPI.registUser = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/register`

  return api.fire({
    url: url,
    method: 'POST',
    data: queryObj
  })
}

UserAPI.registUserExt = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/registerEx`

    // queryObj.source = "DEMA2017"; //eventName.registFormEvent;
  queryObj.source = eventName.registFormEvent
  return api.fire({
    url: url,
    method: 'POST',
    data: queryObj
  })
}

UserAPI.loginUser = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/login`

  return api.fire({
    url: url,
    method: 'POST',
    data: queryObj
  })
}

UserAPI.fillMoreAccountInfoExt = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/profileEx`
  return api.fire({
    headers: {
      'Accept-Language': 'en',
      'authorization': queryObj.accessToken
    },
    url: url,
    method: 'PUT',
    data: queryObj.data
  })
}

UserAPI.fillMoreAccountInfo = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/profile`
  return api.fire({
    headers: {
      'Accept-Language': 'en',
      'authorization': queryObj.accessToken
    },
    url: url,
    method: 'PUT',
    data: queryObj.data
  })
}

UserAPI.handlePro = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/diveCert`
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

UserAPI.handleProExt = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/diveCertEx`
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

UserAPI.fillAmbassadorInfo = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/ambassadorProfile`
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
UserAPI.fillAmbassadorInfoExt = (queryObj) => {
  let url = `${__SEEMO_API_BASE_URL}/apis/user/v0/ambassadorProfileEx`
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

module.exports = UserAPI
