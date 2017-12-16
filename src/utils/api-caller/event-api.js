/**
 * event related apis
 * @author titus
 * @since 2017.12
 */

import api from '../api'
let EventAPI = {}

EventAPI.createEvent = (queryObj) => {
  let url = `${local_API}/events`
  return api.fire({
    url: url,
    method: 'POST',
    data: queryObj
  })
}

EventAPI.fetchEvents = () => {
  let url = `${local_API}/events`
  return api.fire({
    url: url,
    method: 'GET'
  })
}

module.exports = EventAPI
