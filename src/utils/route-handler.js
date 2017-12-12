import { browserHistory, hashHistory } from 'react-router'

let history
if ((process.env.NODE_ENV === 'development') || (process.env.NODE_ENV === 'test')) {
  history = hashHistory
} else if (process.env.NODE_ENV === 'production') {
  history = browserHistory
}

export const toRoute = (url) => {
  return history.push(url)
}

export function goBack () {
  return history.goBack()
};

export function replaceRoute (url) {
  return history.replace(url)
}

export function errorLoading (error) {
  throw new Error(`Dynamic page loading failed: ${error}`)
}

// Loading modules!
export function loadRoute (cb) {
  return module => cb(null, module.default)
}
