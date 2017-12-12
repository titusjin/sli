/**
 * Regist/update Diver Pro information component
 *
 * @author titus
 * @since 2017.10
 */

'use strict'

import React from 'react'
import logo from '~/src/images/registform/logo.png'
import diver from '~/src/images/registform/select_diver.png'
import business from '~/src/images/registform/select_business.png'

import { Button, Form, FormControl, FormGroup, ControlLabel, Option, Table, Col, Image, Checkbox } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import moment from 'moment'
import _ from 'lodash'
import countryTelData from 'country-telephone-data'
import swalTrigger from '~/src/utils/swalTrigger'

import styles from './styles.css'
import classNames from 'classnames/bind'
let cx = classNames.bind(styles)

import countryMapping from '~/src/utils/countries.json'
import {
    FormattedMessage,
    FormattedHTMLMessage,
    defineMessages,
    injectIntl,
    intlShape
} from 'react-intl'

let placeHolderMessage = defineMessages({
  businessContactNameHolderMessage: {
    id: 'placeholder.businessContactNameHolderMessage',
    defaultMessage: 'Contact Person Name'
  },
  contactPlaceHolderMessage: {
    id: 'placeHolderMessage.contactPlaceHolderMessage',
    defaultMessage: 'Street'
  },
  contactCityHolderMessage: {
    id: 'placeHolderMessage.contactCityHolderMessage',
    defaultMessage: 'City'
  },
  contactStateHolderMessage: {
    id: 'placeHolderMessage.contactStateHolderMessage',
    defaultMessage: 'State/Province/Region'
  },
  postCodeHolderMessage: {
    id: 'placeHolderMessage.postCodeHolderMessage',
    defaultMessage: 'ZIP/Postal Code'
  },
  telNumberHolderMessage: {
    id: 'placeHolderMessage.telNumberHolderMessage',
    defaultMessage: 'Phone number wihtout prefix'
  },
  faxNumberHolderMessage: {
    id: 'placeHolderMessage.faxNumberHolderMessage',
    defaultMessage: 'Fax number without prefix'
  },
  avgCustomerPerMonthHolderMessage: {
    id: 'placeHolderMessage.avgCustomerPerMonthHolderMessage',
    defaultMessage: 'Average customers per month'
  },
  expectedSalesPerMonthHolderMessage: {
    id: 'placeHolderMessage.expectedSalesPerMonthHolderMessage',
    defaultMessage: 'Expected sales per month'
  }
})

let swalInfoMessage = defineMessages({
  mustFillInFields: {
    id: 'swalInfoMessage.mustFillInFields',
    defaultMessage: 'Fields that must be filled in : '
  },
  mustAgreeResellerMAP: {
    id: 'swalInfoMessage.mustAgreeResellerMAP',
    defaultMessage: "Sorry! You are not agree to our MAP , As a result we can't let you apply Ressler."
  }
})

let map = defineMessages({
  termsConditions: {
    id: 'map.termsConditions',
    defaultMessage: 'Deepblu Terms and Conditions'
  },
  privacyPolicy: {
    id: 'map.privacyPolicy',
    defaultMessage: 'Privacy Policy'
  }
})

class RegistDiverBusiness extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logoBase64ContentFront: '',
      logoBase64ContentBack: '',
      data: {},
      reselleryes: false,
      resellerno: false,
      emailFormatInvalid: false,
      data: {
        phoneType1: 'landline'
      }
    }

    this.handleBusinessType = this.handleBusinessType.bind(this)
    this.handleCounrty = this.handleCounrty.bind(this)

    this.setTextInput = this.setTextInput.bind(this)
    this.handlePhoneType = this.handlePhoneType.bind(this)
    this.handleTelCodeChange = this.handleTelCodeChange.bind(this)
    this.setFaxCode = this.setFaxCode.bind(this)

    this.applyBusiness = this.applyBusiness.bind(this)
    this.setResellerOption = this.setResellerOption.bind(this)
    this.setBusinessPic = this.setBusinessPic.bind(this)
    this.applyReseller = this.applyReseller.bind(this)

    this.checkApplyBusinessData = this.checkApplyBusinessData.bind(this)

    this.handleResellerIntro = this.handleResellerIntro.bind(this)
    this.setmapAgreeOption = this.setmapAgreeOption.bind(this)
  }

  componentWillMount () {
    let countrySelect = []
    countryMapping.forEach(function (o) {
      let temp = {}
      temp.label = o.en
      temp.value = o.isoCode

      countrySelect.push(temp)
    })

    let telCodeSelect = []
    countryTelData.allCountries.forEach(function (o) {
      let temp = {}
      temp.label = o.dialCode
      temp.value = o.iso2.toUpperCase()

      telCodeSelect.push(temp)
    })
    this.setState({
      countrySelect: countrySelect,
      phoneType: [{ 'value': 'landline', 'label': 'LandLine' }, { 'value': 'mobile', 'label': 'Mobile' }],
      telCodeSelect: telCodeSelect
    })
  }

  setTextInput (e) {
    let preData = this.state.data

    let id = e.target.id
    let value = e.target.value

    if (id == 'email') {
      let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regExp.test(value)) {
        let data = {
          ...preData
        }
        data[id] = value

        this.setState({
          data: data,
          emailFormatInvalid: false
        })
      } else {
        this.setState({ emailFormatInvalid: true })
      }
    } else {
      let data = {
        ...preData
      }
      data[id] = value
      this.setState({
        data: data
      })
    }
  }

  handleBusinessType (v) {
    let preData = this.state.data
    this.setState({
      data: { ...preData, entityType: v }
    })
  }
  setResellerOption (e) {
    let result = e.target.value
    let preData = this.state.data

    if (result == 'y') {
      this.setState({
        data: {
          ...preData,
          reselleryes: true,
          resellerno: false
        }
      })
    } else {
      this.setState({
        data: {
          ...preData,
          reselleryes: false,
          resellerno: true
        }
      })
    }
  }

  checkApplyBusinessData (data) {
    let result = ''
    if (!data.businessName) {
      result += 'Business name, '
    }
    if (!data.entityType) {
      result += 'Business Type, '
    }
    if (!data.contactPerson) {
      result += 'Contact Name, '
    }
    if (!data.contactAddress || !data.country || !data.city || !data.zipCode) {
      result += 'Contact Address, '
    }
    if (!data.email) {
      result += 'Contact Email, '
    }
    if (!data.phone1 || !data.phoneCountryCode1 || !data.phoneType1) {
      result += 'Contact Phone, '
    }

    if ((this.props.userInfo.resellerType && this.props.userInfo.resellerType.toLowerCase() !== 'reseller') || (!this.props.userInfo.resellerType)) {
      if (!data.reselleryes && !data.resellerno) {
        result += 'Want to be a COSMIQ+ Reseller'
      }
    }

    return result
  }
  applyBusiness () {
    let queryData = this.state.data
    let checkResult = this.checkApplyBusinessData(queryData)
    const { formatMessage } = this.props.intl

    if (checkResult) {
      let message = formatMessage(swalInfoMessage.mustFillInFields)
      swalTrigger.triggerGeneralAlert('fail', message + checkResult)
    } else {
      this.state.data.userInfo = this.props.userInfo
      this.props.applyBusiness(this.state.data)
    }
  }
  applyReseller () {
    const { formatMessage } = this.props.intl

    if (this.state.data.mapAgreeOption !== 'y') {
      let message = formatMessage(swalInfoMessage.mustAgreeResellerMAP)

      swalTrigger.triggerGeneralAlert('fail', message)
    } else {
      this.props.applyReseller(this.state.data)
    }
  }

  setBusinessPic (e) {
    let that = this
    let preData = this.state.data

    e.preventDefault()
    let logo = e.target.files[0]

    const reader = new FileReader()
    reader.onload = function (event) {
      const dataUrl = event.target.result

      that.setState({ logoBase64ContentFront: dataUrl })
      that.setState({
        data: { ...preData, businessPic: logo }
      })
    }
    reader.readAsDataURL(logo)
  }

  setAddress (e) {
    let result = e.targe.value
    let preData = this.state.data

    this.setState({
      data: { ...preData, address: result }
    })
  }

  handleCounrty (val) {
    let preData = this.state.data

    let preSetTelCode = _.find(this.state.telCodeSelect, function (o) {
      return o.value == val
    })

    let countryStr = ''
    this.state.countrySelect.forEach(function (o) {
      if (o.value == val) {
        countryStr = o.label
      }
    })

    this.setState({
      data: {
        ...preData,
        countryCode: val,
        country: countryStr,
        phoneCountryCode1: '+' + preSetTelCode.label,
        phoneCountryCode2: '+' + preSetTelCode.label,
        phoneType2: 'fax'
      }
    })
  }
  handlePhoneType (val) {
    let preData = this.state.data
    this.setState({
      data: { ...preData, phoneType1: val }
    })
  }
  handleTelCodeChange (val) {
    let country = _.find(this.state.telCodeSelect, function (o) {
      return o.value == val
    })

    let result = '+' + country.label
    let preData = this.state.data
    this.setState({
      data: { ...preData, phoneCountryCode1: result }
    })
  }
  setWebSite (e) {
    let result = e.target.value
    let preData = this.state.data

    this.setState({
      data: { ...preData, webSite: result }
    })
  }
  setFaxCode (val) {
    let country = _.find(this.state.telCodeSelect, function (o) {
      return o.value == val
    })

    let result = '+' + country.label
    let preData = this.state.data
    this.setState({
      data: { ...preData, phoneCountryCode2: result, phoneType2: 'fax'}
    })
  }
  setdiveStudentNumberEstimation (val) {
    let preData = this.state.data

    this.setState({
      data: { ...preData, diveStudentNumberEstimation: val }
    })
  }
  setDiveComputerUsage (e) {
    let preData = this.state.data

    this.setState({
      data: { ...preData, diveComputerUsage: e.target.value }
    })
  }
  setmapAgreeOption (e) {
    let result = e.target.value
    let preData = this.state.data

    if (result == 'y') {
      this.setState({
        mapAgreeno: false,
        mapAgreeyes: true,
        data: {
          ...preData,
          mapAgreeOption: 'y'
        }
      })
    } else {
      this.setState({
        mapAgreeno: true,
        mapAgreeyes: false,
        data: {
          ...preData,
          mapAgreeOption: 'n'
        }
      })
    }
  }

    // *  Acions start from here ...

    // * render start from here
  render () {
    const businessTypeSelect = [
            { 'value': 'diveshop', 'label': 'Dive Shop' },
            { 'value': 'liveaboard', 'label': 'Liveaboard' },
            { 'value': 'resort', 'label': 'Dive Resort' }
    ]
    const { formatMessage } = this.props.intl

    let userInfo = this.props.userInfo
    return (
      <div className={cx('basicInfoContainer')}>
        <FormGroup controlId='businessName'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'business.businessName'}
                defaultMessage={'Business Name'}
                            />&#42;
                        </label>
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <FormControl
              type='text'
              onChange={this.setTextInput}
              disabled={this.props.applyBusinessResult} />
          </Col>
        </FormGroup>
        <FormGroup controlId='entityType'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'business.businessType'}
                defaultMessage={'Business Type'}
                            />&#42;
                        </label>
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <Select
              name='businessType'
              value={this.state.data.entityType}
              options={businessTypeSelect}
              onChange={this.handleBusinessType}
              disabled={this.props.applyBusinessResult}
                        />
          </Col>
        </FormGroup>
        <FormGroup controlId='contactPerson'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'business.contactName'}
                defaultMessage={'Contact Name'}
                            />&#42;
                        </label>
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <FormControl
              type='text'
              placeholder={
                                formatMessage(placeHolderMessage.businessContactNameHolderMessage)
                            }
              onChange={this.setTextInput}
              disabled={this.props.applyBusinessResult} />
          </Col>
        </FormGroup>
        <FormGroup controlId='contactAddress'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedMessage
                id={'business.contactAddress'}
                defaultMessage={'Contact Address'}
                            />
            </label>
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <FormControl
              type='text'
              onChange={this.setTextInput}
              disabled={this.props.applyBusinessResult}
              placeholder={
                                formatMessage(placeHolderMessage.contactPlaceHolderMessage)
                            }
                        />
          </Col>
          <Col sm={1} style={{ 'marginRight': '0', 'paddingLeft': '0' }}>
                        &#42;
                    </Col>
        </FormGroup>
        <FormGroup controlId='city'>
          <Col sm={3}>
            <label className={cx('ControlLabel')} />
          </Col>
          <Col sm={7} style={{ 'marginLeft': '0', 'paddingRight': '0' }}>
            <FormControl
              type='text'
              onChange={this.setTextInput}
              style={{ disPlay: 'inline' }}
              disabled={this.props.applyBusinessResult}
              placeholder={
                                    formatMessage(placeHolderMessage.contactCityHolderMessage)
                                }
                            />
          </Col>
          <Col sm={1} style={{ 'marginRight': '0', 'paddingLeft': '0' }}>
                            &#42;
                        </Col>
        </FormGroup>
        <FormGroup controlId='region'>
          <Col sm={3}>
            <label className={cx('ControlLabel')} />
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <FormControl
              type='text'
              onChange={this.setTextInput}
              disabled={this.props.applyBusinessResult}
              placeholder={
                                    formatMessage(placeHolderMessage.contactStateHolderMessage)
                                }
                            />
          </Col>
        </FormGroup>
        <FormGroup controlId='zipCode'>
          <Col sm={3}>
            <label className={cx('ControlLabel')} />
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <FormControl
              type='text'
              onChange={this.setTextInput}
              disabled={this.props.applyBusinessResult}
              placeholder={
                                    formatMessage(placeHolderMessage.postCodeHolderMessage)
                                }
                            />
          </Col>
          <Col sm={1} style={{ 'marginRight': '0', 'paddingLeft': '0' }}>
                            &#42;
                        </Col>
        </FormGroup>
        <FormGroup controlId='counrty'>
          <Col sm={3}>
            <label className={cx('ControlLabel')} />
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <Select
              name='counrty'
              options={this.state.countrySelect}
              value={this.state.data['country']}
              onChange={this.handleCounrty}
              disabled={this.props.applyBusinessResult}
                            />
          </Col>
          <Col sm={1} style={{ 'marginRight': '0', 'paddingLeft': '0' }}>
                            &#42;
                        </Col>
        </FormGroup>
        <FormGroup controlId='email'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'business.email'}
                defaultMessage={'Contact Email'}
                                />&#42;
                            </label>
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <FormControl
              type='text'
              onChange={this.setTextInput}
              disabled={this.props.applyBusinessResult} />
            <div
              style={{ display: this.state.emailFormatInvalid ? '' : 'none', color: 'red' }}>
              <FormattedMessage
                id={'general.emailFormatInvalidAlert'}
                defaultMessage={'Sorry! This Email format is not valid.'}
                                />
            </div>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'business.contactPhone'}
                defaultMessage={'Contact Phone'}
                            />&#42;
                        </label>
          </Col>
          <Col sm={3}>
            <Select
              name='phoneType'
              value={this.state.data.phoneType1}
              options={[{ 'value': 'landline', 'label': 'LandLine' }, { 'value': 'mobile', 'label': 'Mobile' }]}
              onChange={this.handlePhoneType}
              disabled={this.props.applyBusinessResult}
                        />
          </Col>
          <Col sm={4} style={{ 'paddingRight': '0' }}>
            <Select
              name='telCode'
              value={this.state.data.phoneCountryCode1}
              options={this.state.telCodeSelect}
              onChange={this.handleTelCodeChange}
              disabled={this.props.applyBusinessResult}
                        />
          </Col>
        </FormGroup>

        <FormGroup controlId='phone1'>
          <Col sm={3} />
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <FormControl
              type='text'
              onChange={this.setTextInput}
              disabled={this.props.applyBusinessResult}
              placeholder={
                                formatMessage(placeHolderMessage.telNumberHolderMessage)
                            }
                        />
          </Col>
        </FormGroup>

        <FormGroup controlId='webSite'>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'amb.webSite'}
                defaultMessage={'Web Site'}
                            />
            </label>
          </Col>
          <Col sm={7} style={{ 'paddingRight': '0' }}>
            <FormControl
              type='text'
              onChange={this.setTextInput}
              disabled={this.props.applyBusinessResult} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3}>
            <label className={cx('ControlLabel')}>
              <FormattedMessage
                id={'amb.Fax'}
                defaultMessage={'Fax'}
                            />
            </label>
          </Col>
          <Col sm={3}>
            <Select
              name='faxCode'
              value={this.state.data.phoneCountryCode2}
              options={this.state.telCodeSelect}
              onChange={this.setFaxCode}
              disabled={this.props.applyBusinessResult}
                        />
          </Col>
          <Col sm={4}>
            <FormGroup controlId='phone2'>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.faxNumberHolderMessage)
                                }
                onChange={this.setTextInput}
                disabled={this.props.applyBusinessResult} />
            </FormGroup>
          </Col>
        </FormGroup>
        { this.renderResellerOption() }

        <FormGroup>
          <Button
            bsStyle='primary'
            className='pull-center'
            onClick={this.applyBusiness}
            block
            style={{ display: (this.props.applyBusinessResult) ? 'NONE' : '' }}
                        >
            <FormattedHTMLMessage
              id={'general.NextStep'}
              defaultMessage={'Next'}
                        />
          </Button>
        </FormGroup>

        { this.renderResellerSection() }
      </div>
    )
  }

  renderResellerOption () {
    if (this.props.userInfo.resellerType !== 'Reseller') {
      return (
        <FormGroup>
          <Col sm={3} style={{ 'paddingRight': '0' }}>
            <label className={cx('ControlLabel')}>
              <FormattedHTMLMessage
                id={'reseller.wantToApplyReseller'}
                defaultMessage={'Want to be a COSMIQ+ Reseller?'}
                            />&#42;
                        </label>
          </Col>
          <Col sm={5}>
            <Checkbox
              className={cx('checkboxStyle')}
              inline
              checked={this.state.data.reselleryes}
              onChange={this.setResellerOption}
              value='y'
              disabled={this.props.applyBusinessResult}>
              <span>
                <FormattedMessage
                  id={'diveProSpecific.wanwantToApplyAmb'}
                  defaultMessage={'I Would Love to'}
                                />
              </span>
            </Checkbox>
            <Checkbox className={cx('checkboxStyle')} inline
              checked={this.state.data.resellerno}
              onChange={this.setResellerOption}
              value='n'
              disabled={this.props.applyBusinessResult}>
              <span>
                <FormattedMessage
                  id={'diveProSpecific.latlaterApplyAmb'}
                  defaultMessage={'May be later'}
                                />
              </span>
            </Checkbox>
          </Col>
          <Col sm={5}>
            <label>
              <a href='http://about.deepblu.com/intro_reseller.html' onClick={this.handleResellerIntro}>
                <FormattedMessage
                  id={'reseller.resellerIntro'}
                  defaultMessage={'What is COSMIQ+ Reseller ?'}
                                />
              </a>
            </label>
          </Col>
        </FormGroup>
      )
    }
  }
  handleResellerIntro (e) {
    e.preventDefault()
    window.open(e.target.href, '"_blank"')
  }

  renderResellerSection () {
    const { formatMessage } = this.props.intl

        // if( this.props.userInfo.resellerInfo ){
    if ((this.props.applyBusinessResult && this.state.data.reselleryes) && this.props.userInfo.resellerType !== 'Reseller') {
      return (
        <div>
          <FormGroup controlId='businessNumber'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'business.licenseNumber'}
                  defaultMessage={'Business License Number'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <FormControl
                type='text'
                onChange={this.setTextInput} />
            </Col>
          </FormGroup>

          <FormGroup controlId='businessPic'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'business.licensePic'}
                  defaultMessage={'PhotoCopy of Business License'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <FormControl
                type='file'
                onChange={this.setBusinessPic} />
            </Col>
          </FormGroup>
          <Image responsive src={this.state.logoBase64ContentFront} style={{display: (this.state.logoBase64ContentFront) ? '' : 'none', marginTop: '10px', marginBottom: '20px'}} />

          <FormGroup controlId='avgCustomerPerM'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'business.averageCustomerNum'}
                  defaultMessage={'Average Number of Customer per Month'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.avgCustomerPerMonthHolderMessage)
                                }
                onChange={this.setTextInput} />
            </Col>
          </FormGroup>
          <FormGroup controlId='expectedSalePerM'>
            <Col sm={3}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'business.expectedSalesPerMonth'}
                  defaultMessage={'Expected Number of Sales per Month'}
                                />
              </label>
            </Col>
            <Col sm={7}>
              <FormControl
                type='text'
                placeholder={
                                    formatMessage(placeHolderMessage.expectedSalesPerMonthHolderMessage)
                                }
                onChange={this.setTextInput} />
            </Col>
          </FormGroup>

          <FormGroup controlId='mapAgreeOption'>
            <Col sm={10}>
              <label className={cx('ControlLabel')}>
                <FormattedMessage
                  id={'map.alreadyRead'}
                  values={{
                    deepbluTermsConditions: <a href=' https://www.deepblu.com/terms-of-condition'>{ formatMessage(map.termsConditions) }</a>,
                    privacyPolicy: <a href='https://www.deepblu.com/privacy-policy'> { formatMessage(map.privacyPolicy) }</a>
                  }}
                  defaultMessage={`I have read and agree to the <a href=" https://www.deepblu.com/terms-of-condition">
                                        Deepblu Terms and Conditions</a>, the
                                        <a href=" https://www.deepblu.com/privacy-policy">
                                            Privacy Policy
                                        </a>
                                         and the Minimum Advertised Price displayed below.` }
                                />&#42;
                            </label>
            </Col>
            <Col sm={7} className={cx('inputFieldDiv')}>
              <Checkbox className={cx('checkboxStyle')}
                inline
                checked={this.state.mapAgreeyes}
                onChange={this.setmapAgreeOption}
                value='y'>
                <span>
                  <FormattedMessage
                    id={'map.agree'}
                    defaultMessage={'Yes'}
                                    />
                </span>
              </Checkbox>
              <Checkbox className={cx('checkboxStyle')}
                inline
                checked={this.state.mapAgreeno}
                onChange={this.setmapAgreeOption}
                value='n'>
                <span>
                  <FormattedMessage
                    id={'map.disagree'}
                    defaultMessage={'No'}
                                    />
                </span>
              </Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <p className={cx('maptermContent')}>
              <FormattedHTMLMessage
                id={'map.termContent'}
                defaultMessage={
                                    `To protect the investments of Deepblu Sales Ambassadors and COSMIQ Resellers, Deepblu requires all Resellers and Ambassadors to adhere to below Minimum Advertised Price (MAP) Policy.<br />

                                    The MAP is set by Deepblu and may be changed at any time at our sole discretion.<br />

                                    Failure to comply with this MAP Policy, intentional and/or repeated failure to abide, may result in the immediate termination of your COSMIQ Reseller or Deepblu Ambassador status and the connected benefits.`
                                }
                            />
            </p>
          </FormGroup>

          <FormGroup>
            <Button
              bsStyle='primary'
              className='pull-center'
              onClick={this.applyReseller}
              block
                            >
              <FormattedHTMLMessage
                id={'general.NextStep'}
                defaultMessage={'Next'}
                            />
            </Button>
          </FormGroup>
        </div>
      )
    }
  }
}

RegistDiverBusiness.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(RegistDiverBusiness)
// export default RegistDiverBusiness;
