/**
 * Entry point for bundle js files for this SPA
 *
 * @author titus
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { Provider } from 'react-redux'

import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import createLogger from 'redux-logger'

import reducers from './reducers'
import { AppContainer } from 'react-hot-loader'
import Router from './Routes'
// import Root from './root'

import 'react-select/dist/react-select.css'
import 'react-input-calendar/style/index.css'
import 'react-datetime/css/react-datetime.css'
import 'react-bootstrap-daterangepicker/css/daterangepicker.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'sweetalert/dist/sweetalert.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './styles/style.css'
import './styles/desktop.css'



function enhancer () {
  if (process.env.NODE_ENV === 'development') {
    const middlewares = [ReduxThunk, ReduxPromise, createLogger() ]
    return composeWithDevTools(applyMiddleware(...middlewares))
  }

  const middlewares = [ ReduxThunk, ReduxPromise ]
  return compose(applyMiddleware(...middlewares))
}

const store = createStore(
    reducers,
    enhancer()
)

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js')

  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
        './Root',
        () => {
          const NewRoot = require('./root').default
          renderApp(NewRoot)
        }
    )
}

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      { Router }
    </Provider>
  </AppContainer>,
  document.querySelector('.app')
)

// ReactDOM.render(
//   <Root store={store} />,
//   document.querySelector('.app')
// )
