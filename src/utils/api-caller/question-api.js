/**
 * question related apis
 * @author titus
 * @since 2017.12
 */

import api from '../api'
let QuestionAPI = {}

QuestionAPI.saveEditResult = (queryObj) => {
  let url = `${local_API}/questions`
  return api.fire({
    url: url,
    method: 'PUT',
    data: queryObj
  })
}

QuestionAPI.deleteQestion = (deleteObj) => {
  let url = `${local_API}/questions`
  return api.fire({
    url: url,
    method: 'DELETE',
    data: deleteObj
  })
}

QuestionAPI.fetchQ = (eventId) => {
  let url = `${local_API}/questions/${eventId}`
  return api.fire({
    url: url,
    method: 'GET',
  })
}

module.exports = QuestionAPI
