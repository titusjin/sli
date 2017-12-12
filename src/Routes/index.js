import React from 'react'
import {
    Router,
    hashHistory,
    browserHistory
} from 'react-router'
import registRoute from './regist-routes'

import App from 'Components/App'
import Landing from 'Components/Landing'


// History
let history = browserHistory
// if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
//     history = hashHistory;
// } else if (process.env.NODE_ENV === "production") {
//     history = browserHistory;
// }

// Router config
const allRoutes = {
  path: '/',
  component: App,
  name: 'App',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/landing'),
    componet: Landing
  },
  childRoutes: [
    ...registRoute
  ]
}
module.exports = <Router history={history} routes={allRoutes} />
