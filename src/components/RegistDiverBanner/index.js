/**
 * Regist Diver banner component
 *
 * @author titus
 * @since 2017.10
 */

'use strict'

import React from 'react'
import diverbanner from '~/src/images/registform/diver.jpg'
import businessbanner from '~/src/images/registform/business.jpg'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class RegistDiverBanner extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
        // ugly inline style
    const diverBannerImg = {
      backgroundImage: `url(${diverbanner})`
    }
    const businessBannerImg = {
      backgroundImage: `url(${businessbanner})`
    }

    if (this.props.diver === 'y') {
      return (
        <div className={cx('banner dive-banner-img')} style={diverBannerImg}>
          {/* <img src={ diverbanner } className={cx('bannerImg')} /> */}
        </div>
      )
    } else {
      return (
        <div className={cx('banner business-banner-img')} style={businessBannerImg}>
          {/* <img src={ businessbanner } className={cx('bannerImg')} /> */}
        </div>
      )
    }
  }
}

export default RegistDiverBanner
