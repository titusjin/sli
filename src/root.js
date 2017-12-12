/**
 * TODO : will check if abstract this layer is necessary.
 * @author titus
 */

import React from 'react'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import Router from './Routes'

function Root (props) {
  const { store } = props

  return (
    <AppContainer>
      <Provider store={store}>
        { Router }
      </Provider>
    </AppContainer>
  )
}

export default Root
