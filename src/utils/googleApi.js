// GoogleApi.js is a script tag compiler. Essentially, this utility module builds a Google Script tag link allowing us to describe the pieces of the Google API we want to load inusing a JS object and letting it build the endpoint string.
// Sample usage:
//
//    GoogleApi({
//      apiKey: apiKey,
//      libraries: ['places']
//    });
//

export const GoogleApi = function (opts) {
  opts = opts || {}

  const apiKey = opts.apiKey
  const libraries = opts.libraries || []
  const client = opts.client
  const URL = 'https://maps.googleapis.com/maps/api/js'

  const googleVersion = '3.22'
  let script = null
  let google = window.google || null
  // let google = window.google = null;
  // if (window.google === 'undefined'){ let google = window.google = null}
  let loading = false
  let channel = null
  let language = null
  let region = null

  let onLoadEvents = []

  const url = () => {
    let url = URL
    let params = {
      key: apiKey,
      callback: 'CALLBACK_NAME',
      libraries: libraries.join(','),
      client: client,
      v: googleVersion,
      channel: channel,
      language: language,
      region: region
    }

    let paramStr = Object.keys(params)
        .filter(k => !!params[k])
        .map(k => `${k}=${params[k]}`).join('&')

    return `${url}?${paramStr}`
  }

  return url()
}

export default GoogleApi
