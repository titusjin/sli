/**
 * Regist From landing page
 *
 * @author titus
 * @since 2017.10
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

        // this.handleLink = this.handleLink.bind( this );
    this.handleBusinessLink = this.handleBusinessLink.bind(this)
    this.handleDiverLink = this.handleDiverLink.bind(this)
  }

  handleBusinessLink (e) {
    e.preventDefault()
    this.context.router.push('/form/businessRegistExt')
  }
  handleDiverLink (e) {
    e.preventDefault()
    this.context.router.push('/form/diverRegistExt')
  }

    // handleLink( e ){
    //     e.preventDefault();
    //
    //     if( 'DIVER' == e.target.text ){
    //         this.context.router.push('/form/diverRegistExt');
    //     }else {
    //         this.context.router.push('/form/businessRegistExt');
    //     }
    // }

  render () {
    const diverStyle = {
      width: '400px',
      height: '500px',
      float: 'right',
      marginRigt: '20px',
      backgroundImage: `url(${diver})`
    }
    const businessStyle = {
      width: '400px',
      height: '500px',
      float: 'left',
      marginLeft: '20px',
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
        <div className={cx('flexContainer')}>
          <div className={cx('item')}>
            <div style={diverStyle}>
              <a onClick={this.handleDiverLink}>
                <div className={cx('linkStyle')}>
                  <span style={linkColor}>
                                        DIVER
                                    </span>
                </div>
              </a>
            </div>
          </div>
          <div className={cx('item')}>
            <div style={businessStyle}>
              <a onClick={this.handleBusinessLink}>
                <div className={cx('linkStyle')}>
                  <span style={linkColor}>
                                        BUSINESS
                                    </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RegistLanding.contextTypes = contextTypes

export default RegistLanding
