/**
 * Admin manage page
 *
 * @author titus
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from './actions'

import moment from 'moment'
import DateTime from 'react-datetime'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

import AdminEditEventModal from '~/src/components/AdminEditEventModal'

const contextTypes = {
  router: React.PropTypes.object.isRequired
}

class AdminManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      start: '',
      end: '',
      eventCode: ''
    }

    this.handleStartDatetime = this.handleStartDatetime.bind(this)
    this.handleEndDatetime = this.handleEndDatetime.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
    this.addEvent = this.addEvent.bind(this)
    this.backLogin = this.backLogin.bind(this)
    this.modifyEvent = this.modifyEvent.bind(this)
    this.showEditEventModal = this.showEditEventModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.saveEditResult = this.saveEditResult.bind(this)
  }

  componentWillMount () {
    this.props.actions.fetchEvents()
  }

  closeModal(){
      this.props.actions.closeEditModal()
  }
  modifyEvent(e){
    let eventName = e.target.getAttribute('name')
    let eventId = e.target.getAttribute('id')
    this.props.actions.editEvent(eventId)
  }

  showEditEventModal(){
      return(
        <AdminEditEventModal data={this.props.manageReducer.questions} show={this.props.manageReducer.showEditModal} closeModal = { this.closeModal } saveEditResult={this.saveEditResult}/>
      )
  }
  saveEditResult(saveObj){
    console.log('into adminMange-container saveEditResult method : ', saveObj.content + ',' + saveObj.eventId + ' , ' + saveObj.questionId);
    //TODO save edited queston content to DB by API
  }

  handleTextInput (e) {
    let ob = {}
    ob[e.target.name] = e.target.value
    this.setState(ob)
  }
  handleStartDatetime (momdate) {
    this.setState({
      start: momdate.valueOf()
    })
  }
  handleEndDatetime (momdate) {
    this.setState({
      start: momdate.valueOf()
    })
  }

  addEvent () {
    console.log('trigger add-event action')
  }

  backLogin () {
    this.context.router.push('/landing')
  }

  render () {
    if (this.props.containerReducer.login) {
      return (
        <div className={cx('container')}>
          <div className={cx('content')}>
            <div className={cx('content-title')}>
              <span>Create New Enent</span>
            </div>
            <div className={cx('content-input')}>
              <div className={cx('content-item')}>
                <input className={cx('input-item')} type='text' name='eventName' placeholder='input evnet name' onChange={this.handleTextInput} />
                <input className={cx('input-item')} type='text' name='eventCode' placeholder='input evnet code' onChange={this.handleTextInput} />

                <DateTime className={cx('dateTime-input')} inputProps={{ placeholder: 'Start datetime'}} onChange={this.handleStartDatetime} />
                <DateTime inputProps={{ placeholder: 'End datetime', name: 'endDatetime'}} onChange={this.handleEndDatetime} />

                <button className={cx('input-btn')} type='submit' onClick={this.addEvent}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className={cx('content')}>
            <div className={cx('content-title')}>
              <span>Mange Events</span>
            </div>
            {
              this.props.manageReducer.events.map( e => {
                return (
                  <div id={e.eventId} className={cx('content-input')}>
                    <div className={cx('content-item')}>
                      <div>
                        <label className={cx('existing-event-title')}>
                          Event Name :
                        </label>
                        <label className={cx('existing-event-mange')} onClick={this.modifyEvent} name={e.eventName} id={e.eventId}>
                          {e.eventName}
                        </label>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {this.showEditEventModal()}
        </div>
      )
    } else {
      return (
        <div>
          <span>processing...</span>
          { this.backLogin() }
        </div>
      )
    }
  }
}

AdminManage.contextTypes = contextTypes

/**
 * Redux needed implement
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

function mapStateToProps ({AdminContainerReducer,AdminMangeContainerReducer }) {
  return {
    containerReducer: AdminContainerReducer,
    manageReducer: AdminMangeContainerReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminManage)
