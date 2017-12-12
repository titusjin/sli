/**
 * Root component for the application
 *
 * @author titus
 * @since 2017.10
 */
'use strict'

import React, { Component } from 'react'
import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={cx('root-container')}>
        { this.props.children }
      </div>
    )
  }
}

export default App
