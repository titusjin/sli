/**
 * users related api
 * @author titus
 * @since 2017.12
 */

import api from '../api'
let UserAPI = {}

UserAPI.login = (queryObj) => {
  let url = `${local_API}/users`
  return api.fire({
    url: url,
    method: 'PATCH',
    data: queryObj
  })
}

UserAPI.fetchEvents = () => {
  let url = `${local_API}/events`
  return api.fire({
    url: url,
    method: 'GET'
  })
}

module.exports = UserAPI
