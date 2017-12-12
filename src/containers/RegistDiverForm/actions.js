'use strict'

import {
    SET_LODDING,

    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOGIN_USER_SUCCESS,
    FILL_EXTRAUSERINFO_SUCCESS,
    FILL_PROINFO_SUCCESS,
    CONTINUE_AMB_PROCESS,
    FILL_AMBINFO_SUCCESS,
    SUCCESS_APPLY_BUSINESS,
    SUCCESS_APPLY_RESELLER,
    GENERAL_FAIL,
    FINAL_FINISH,
    EXISTING_RESELLETR_FINAL,
    FILL_EXTRAUSERINFO_SUCCESS_NOAPPLYPRO,
    RENDER_PRO_FINALPAGE
} from './constants'

import userAPI from '~/src/utils/api-caller/user-api'
import entityAPI from '~/src/utils/api-caller/entity-api'
import certAPI from '~/src/utils/api-caller/cert-api'
import swalTrigger from '~/src/utils/swalTrigger'
import _ from 'lodash'

let moment = require('moment')
// test aws-sdk by npm install not by script tag
let AWS = require('aws-sdk')

let handleError = (err) => {
  console.log(err)
  if (err.data) {
    swalTrigger.triggerGeneralAlert('fail', err.data.message)
  } else {
    swalTrigger.triggerGeneralAlert('fail', 'Fail')
  }
}

export function callCreateUserAPI (data) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

        // TODO prepare queryObj
    userAPI.registUser(data)
            .then(res => {
              if (res.data.statusCode == 200) {
                dispatch({
                  type: CREATE_USER_SUCCESS,
                  payload: res.data.result
                })
              } else {
                throw { message: {
                  data: {
                    message: 'Server not working. Pls contact Deepblu.com Thanks!'
                  }
                }}
              }
            })
            .catch(err => {
              handleError(err)
              dispatch({
                type: CREATE_USER_FAIL,
                payload: null
              })
            })
  }
}

export function callLoginAPI (data) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

    let queryObj = {
      email: data.email,
      password: data.password
    }
    userAPI.loginUser(queryObj)
            .then(res => {
              if (res.data.statusCode == 200) {
                dispatch({
                  type: LOGIN_USER_SUCCESS,
                  payload: res.data.result
                })
              } else {
                throw { message: {
                  data: {
                    message: 'Server not working. Pls contact Deepblu.com Customer Service（support@deepblu.com) Thanks!'
                  }
                }}
              }
            })
            .catch(err => {
              handleError(err)

              dispatch({
                type: GENERAL_FAIL,
                payload: null
              })
            })
  }
}

export function callFillMoreUserInfo (data, proyes) {
  let queryObj = {}
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

    queryObj.accessToken = getState().RegistDiverFormReducer.accessToken
    queryObj.data = {
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      Birthday: data.Birthday,
      gender: data.gender,
      _mailAddress: {
                // country: data._mailAddress.country
      }
    }

    if (data._mailAddress) {
      queryObj.data._mailAddress.country = data._mailAddress.country
    }

    userAPI.fillMoreAccountInfo(queryObj)
            .then(res => {
              if (res.data.statusCode == 200) {
                if (proyes) {
                  certAPI.fetchCertsMetaAll(queryObj.accessToken)
                            .then(certMetas => {
                              dispatch({
                                type: FILL_EXTRAUSERINFO_SUCCESS,
                                payload: res.data.result,
                                certMetas: certMetas.data.result
                              })
                            })
                } else {
                  if (data.userDiveType == 'Pro') {
                    dispatch({
                      type: FILL_EXTRAUSERINFO_SUCCESS_NOAPPLYPRO,
                      payload: res.data.result
                    })
                  } else {
                    dispatch({
                      type: FILL_EXTRAUSERINFO_SUCCESS,
                      payload: res.data.result
                    })
                  }
                }
              } else {
                throw { message: {
                  data: {
                    message: 'Server not working. Pls contact Deepblu.com Thanks!'
                  }
                }}
              }
            })
            .catch(err => {
              handleError(err)
              dispatch({
                type: GENERAL_FAIL,
                payload: null
              })
            })
  }
}

const upLoadToS3 = (dispatch, getState, fileImage) => {
  return new Promise((resolve, reject) => {
    let imgxxxx = `${moment().format('yyyyMMddHHmmss')}${Math.ceil(Math.random() * 10000).toString()}`
    let environment
    let imageURL

    switch (process.env.NODE_ENV) {
      case 'development':
        environment = 'dev'
        imageURL = `https://s3-ap-northeast-1.amazonaws.com/deepblusystem${environment}/web/badges/${imgxxxx}.jpg?v=${moment().format('X')}`
        break
      case 'test':
        environment = 'test'
        imageURL = `https://s3-ap-northeast-1.amazonaws.com/deepblusystem${environment}/web/badges/${imgxxxx}.jpg?v=${moment().format('X')}`
        break
      case 'production':
        environment = ''
        imageURL = `https://d2jj4mpogkbpyy.cloudfront.net/web/badges/${imgxxxx}.jpg?v=${moment().format('X')}`
        break
    }

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-1:7d2ba766-091e-4c05-b575-bde7ad2310b6'
    })

    AWS.config.region = 'ap-northeast-1'
    let s3 = new AWS.S3()

    let params = {
      Bucket: `deepblusystem${environment}`,
      Key: `web/badges/${imgxxxx}.jpg`,
      ACL: 'public-read',
      Body: fileImage
    }

    s3.putObject(params, (err, data) => {
      if (err) {
        reject({ data: { message: 'Uploading Buiness Image fail' }})
      } else {
        resolve(imageURL)
      }
    })
  })
}

export function callSaveProInfo (data) {
  let queryObj = {}
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

    let certOrg = data.certOrg
    let certLevel = data.certLevel
    let certMetaId = ''

    _.forEach(getState().RegistDiverFormReducer.certMetas, function (o) {
      if (o.organizationName == certOrg) {
        if (o.certificationLevel == certLevel) {
          certMetaId = o.id
        }
      }
    })

    queryObj.accessToken = getState().RegistDiverFormReducer.accessToken
    queryObj.data = {
      certificationMetaId: certMetaId,
      issueNo: data.certNum
    }

    upLoadToS3(dispatch, getState, data.licenseFontPic)
            .then(res => {
              queryObj.data.issueUrl = res
              return userAPI.handlePro(queryObj)
            })
            .then(res => {
              if (res.data.statusCode == 200) {
                if (data.ambyes) {
                  dispatch({
                    type: CONTINUE_AMB_PROCESS,
                    payload: res.data.result
                  })
                } else {
                  dispatch({
                    type: FILL_PROINFO_SUCCESS,
                    payload: res.data.result
                  })
                }
              } else {
                throw { message: {
                  data: {
                    message: 'Server not working. Pls contact Deepblu.com Thanks!'
                  }
                }}
              }
            })
            .catch(err => {
              handleError(err)
              dispatch({
                type: GENERAL_FAIL,
                payload: null
              })
            })
  }
}

export function saveAmbData (data) {
  let queryObj = {}
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

    queryObj.accessToken = getState().RegistDiverFormReducer.accessToken
    queryObj.data = {
      phone: data.phoneCountryCode1 + data.phone1,
      fax: data.fax + data.phone2,
      website: data.webSite,
      mailAddress: {
      },
      contactEmail: data.contactEmail,
      employmentStatus: data.employmentStatus,
      studentNumber: data.studentNumber,
      currentDiveComputer: data.currentDiveComputer
    }

    if (data.city) {
      queryObj.data.mailAddress.city = data.city
    }
    if (data.state) {
      queryObj.data.mailAddress.state = data.state
    }
    if (data.country) {
      queryObj.data.mailAddress.country = data.country
      queryObj.data.mailAddress.countryCode = data.country
    }
    if (data.zipCode) {
      queryObj.data.mailAddress.zipCode = data.zipCode
    }
    if (data.address) {
      queryObj.data.mailAddress.line1 = data.address
    }

    userAPI.fillAmbassadorInfo(queryObj)
            .then(res => {
              dispatch({
                type: FILL_AMBINFO_SUCCESS,
                payload: ''
              })
            })
            .catch(err => {
              handleError(err)
              dispatch({
                type: GENERAL_FAIL,
                payload: null
              })
            })
  }
}

export function directRenderProFinalPage () {
  return (dispatch, getState) => {
    dispatch({
      type: RENDER_PRO_FINALPAGE,
      payload: null
    })
  }
}
