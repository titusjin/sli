/**
 * Landing page
 *
 * @author titus
 */

'use strict'

import React from 'react'
import logo from '~/src/images/registform/logo.png'
import diver from '~/src/images/registform/select_diver.png'
import business from '~/src/images/registform/select_business.png'

import { Link } from 'react-router'
import { connect } from 'react-redux'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

const contextTypes = {
  router: React.PropTypes.object.isRequired
}

class RegistLanding extends React.Component {
  constructor (props) {
    super(props)

    this.handleBusinessLink = this.handleBusinessLink.bind(this)
    this.handleDiverLink = this.handleDiverLink.bind(this)
  }

  handleBusinessLink (e) {
    e.preventDefault()
    this.context.router.push('/form/businessRegist')
  }
  handleDiverLink (e) {
    e.preventDefault()
    this.context.router.push('/form/diverRegist')
  }

  render () {
    const diverStyle = {
      backgroundImage: `url(${diver})`
    }
    const businessStyle = {
      backgroundImage: `url(${business})`
    }
    const linkColor = {
      color: '#FFFFFF'
    }

    return (
      <div className={cx('container')}>
        <div className={cx('title')}>
          <img src={logo} className={cx('logo')} />
        </div>
        <div className={cx('content')}>
          <a style={linkColor} onClick={this.handleDiverLink}>
            <div className={cx('item')} style={diverStyle}>
              <div className={cx('linkStyle')}>DIVER</div>
            </div>
          </a>
          <a style={linkColor} onClick={this.handleBusinessLink}>
            <div
              className={cx('item')}
              style={businessStyle}>
              <div className={cx('linkStyle')}>BUSINESS</div>
            </div>
          </a>
        </div>
      </div>
    )
  }
}

RegistLanding.contextTypes = contextTypes

export default RegistLanding
