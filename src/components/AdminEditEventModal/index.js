/**
 * admin editing event modal
 *
 * @author titus
 */

import React from 'react'
import logo from '~/src/images/logo.png'

import { Modal, Button, Form, FormControl, FormGroup, ControlLabel, Option, Table, Row, Col, Radio, Image } from 'react-bootstrap'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

import MangeQuestionWrapper from '~/src/components/MangeQuestionWrapper'

class AdminEditEventModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const footerStyle = {
      color: '#FC5053'
    }
    const questions = this.props.data
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Body>
          <div className={cx('headerText')}>Questions</div>
            <div>
              {
                questions.map( q => {
                  return (
                    <MangeQuestionWrapper data={q} saveEditResult={this.props.saveEditResult}/>
                  )
                })
              }
            </div>
        </Modal.Body>
        <Modal.Footer style={footerStyle}>
          &copy;Shopback
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AdminEditEventModal
