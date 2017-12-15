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

class AdminEditEventModal extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render(){
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Body>
          <div className={cx('headerText')}>Questions</div>

          {/* <Row style={rebuseRowContainerStyle}>
            <div className={cx('ReviewHeaderText')}>Review Report</div>
            <Col md={6}>
              <Row className={cx('rowStyle')}>
                <div>Report Time</div>
                <div>
                  { moment(data.createTime).format('YYYY-MM-DD HH:mm') }
                </div>
              </Row>
              <Row className={cx('rowStyle')}>
                <div>Report type</div>
                <div>
                  {
                    data.detail ? data.detail.abuseTypes.map((element, index) => (<div>{element}</div>)) : data.type
                  }
                </div>
              </Row>
            </Col>
            <Col md={6}>
              <Row className={cx('rowStyle')}>
                <div>Review Status</div>
                <div>
                  {data.status}
                </div>
              </Row>
              <Row className={cx('rowStyle')}>
                <div>Report Comments</div>
                <div className={cx('commentStyle')}>
                  {data.comment}
                </div>
              </Row>
            </Col>
          </Row> */}
        </Modal.Body>
        <Modal.Footer>
          footer
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AdminEditEventModal
