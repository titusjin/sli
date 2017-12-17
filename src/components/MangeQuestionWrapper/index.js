/**
 * evnet manage modal single question
 *
 * @author titus
 */

import React from 'react'
import logo from '~/src/images/logo.png'

import { Modal, Button, Form, FormControl, FormGroup, ControlLabel, Option, Table, Row, Col, Radio, Image } from 'react-bootstrap'
import moment from 'moment'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

import thumbUpImage from '~/src/images/thumbup.png'

class MangeQuestionWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showEdit: false,
      eidtedContent: ''
    }
    this.edit = this.edit.bind(this)
    this.showEditArea = this.showEditArea.bind(this)
    this.saveEditResult = this.saveEditResult.bind(this)
    this.setEidtedContent = this.setEidtedContent.bind(this)
    this.delete = this.delete.bind(this)
  }

  setEidtedContent(e){
    console.log(e.target.value)
    this.setState({
      eidtedContent: e.target.value
    })
  }
  edit(){
    this.setState({
      showEdit: true
    })
  }
  saveEditResult(){
    let data = this.props.data
    let saveObj = {
      content: this.state.eidtedContent,
      _id: data._id,
      eventId: data.eventId
    }
    this.props.saveEditResult(saveObj)
    this.setState({
      showEdit: false
    })
  }

  delete(){
    let data = this.props.data
    let deleteObj = {
      _id: data._id,
      eventId: data.eventId
    }
    this.props.delete(deleteObj)
    this.setState({
      showEdit: false
    })
  }

  showEditArea(){
    if(this.state.showEdit){
      const q = this.props.data
      return (
        <div>
          <textarea className={cx('edit-textArea')} onChange={this.setEidtedContent} defaultValue={q.content}></textarea>
          <button className={cx('save-btn')} onClick={this.saveEditResult}>Save</button>
        </div>
      )
    }
  }

  render () {
    const q = this.props.data

    const thubupNumManageQ = {
      paddingRight: '2rem'
    }
    const smallTitle = {
      fontSize:'12'
    }
    return (
      <div id={q.eventId} className={cx('sigleMange-q')}>
        <div><span>{q.username}</span></div>
        <button className={cx('mange-btn')} onClick={this.edit}>Edit</button>
        <button className={cx('mange-btn')} onClick={this.delete}>Delete</button>
        <div style={smallTitle}>
          <img src={thumbUpImage} className={cx('thumbupImage-mangeQ')}/>
          <span style={thubupNumManageQ}>{q.thumbUpCount}</span>
          <span>
            {moment(parseInt(q.timestamp)).format('MMMM Do YYYY, h:mm:ss a')}
          </span>
        </div>
        <div>
          <p>{q.content}</p>
          {
            this.showEditArea()
          }
        </div>
      </div>
    )
  }
}

export default MangeQuestionWrapper
