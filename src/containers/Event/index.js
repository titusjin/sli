/**
 *  admin container
 *
 *  @author titus
 */

import React from 'react'
import * as actions from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import _ from 'lodash'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

class EventContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.setLoginRole = this.setLoginRole.bind(this)
  }

  setLoginRole () {
    this.props.setLoginRole('admin')
  }

  render () {
    console.log('in event container render ...');

    return (
      <div className={cx('content')}>
        <div className={cx('content-title')}>
          <span>Enter Event To Ask Questions</span>
        </div>
        <div className={cx('content-input')}>
          <div className={cx('content-item')}>
            <input className={cx('input-item')} type='text' name='eventCode' placeholder='Input evnet Code' onChange={this.handleVEentCode} />
            <button className={cx('input-btn')} type="submit">
              Enter
            </button>
          </div>
          <div className={cx('input-gap-text')}> or </div>
          <div className={cx('content-item')}>
            <label onClick={ this.setLoginRole }>
              <a href="#">Login As Admin</a>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Redux needed implement
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

function mapStateToProps ({EventContainerReducer}) {
  return {
    reducer: EventContainerReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer)
