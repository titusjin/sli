/**
 * [ abuse related API calling interface ]
 * @author titus@deepblu.com
 */

import api from '../api'

let fetchAbuseReportAPI = {}

fetchAbuseReportAPI.fetchAbuseReports = (queryObj) => {
  let url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/reports`

  let queryParams = '?'
  for (let prop in queryObj) {
    if (queryObj.hasOwnProperty(prop)) {
      let value = queryObj[prop]
      queryParams += `${prop}=${value}&`
    }
  }
  url += queryParams

  return api.fire({
    url: url,
    method: 'GET'
  })
}

fetchAbuseReportAPI.fetchAbuseEntityDetail = (entityId, type) => {
  let url = ''
  if (type) {
    url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/abuseEntity/${entityId}?type=${type}`
  } else {
    url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/abuseEntity/${entityId}`
  }

  return api.fire({
    url: url,
    method: 'GET'
  })
}

fetchAbuseReportAPI.passAbuseReport = (data) => {
  let url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/setAbusePass`
  return api.fire({
    url: url,
    method: 'PUT',
    data: data
  })
}

fetchAbuseReportAPI.hideAbuseReport = (data) => {
  let url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/setAbuseHide`
  return api.fire({
    url: url,
    method: 'PUT',
    data: data
  })
}

fetchAbuseReportAPI.blockAbuseReport = (data) => {
  let url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/setAbuseBlock`
  return api.fire({
    url: url,
    method: 'PUT',
    data: data
  })
}

fetchAbuseReportAPI.fetchAbuseNumber = () => {
  let url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/fetchReportNumber`
  return api.fire({
    url: url,
    method: 'GET'
  })
}

fetchAbuseReportAPI.fetchAbuserReports = (queryObj) => {
  let url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/fetchAbusers`
  let queryParams = '?'
  for (let prop in queryObj) {
    if (queryObj.hasOwnProperty(prop)) {
      let value = queryObj[prop]
      queryParams += `${prop}=${value}&`
    }
  }
  url += queryParams
  return api.fire({
    url: url,
    method: 'GET'
  })
}

fetchAbuseReportAPI.fetchAbuserWithConditons = (queryObj) => {
  let url = `${__IP__BACKEND_API}/ipbackend/abusereport/v0/fetchAbusersWithConditions`

  let queryParams = '?'
  for (let prop in queryObj) {
    if (queryObj.hasOwnProperty(prop)) {
      let value = queryObj[prop]
      queryParams += `${prop}=${value}&`
    }
  }
  url += queryParams

  return api.fire({
    url: url,
    method: 'GET'
  })
}

module.exports = fetchAbuseReportAPI
