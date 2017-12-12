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
    EXISTING_RESELLETR_FINAL
} from './constants'

import usesrAPI from '~/src/utils/api-caller/user-api'
import entityAPI from '~/src/utils/api-caller/entity-api'
import swalTrigger from '~/src/utils/swalTrigger'
import _ from 'lodash'
let moment = require('moment')

// test aws-sdk by npm install not by script tag
// remove script tag import make the speed a little tiny improved.
// use compile-time loading instead of run-time loading.
let AWS = require('aws-sdk')

let handleError = (err) => {
  console.log(err)

  if (err.data) {
    swalTrigger.triggerGeneralAlert('fail', err.data.message)
  } else {
    swalTrigger.triggerGeneralAlert('fail', 'Fail')
  }
}

export function init (id) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

    fetchData(queryObj)
      .then(data => {
        dispatch({
          type: FETCH_INIT_DATA_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_DATA_FAIL
        })
        swalTrigger.triggerGeneralAlert('fail')
      })
  }
}

export function callCreateUserAPI (data) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

        // TODO prepare queryObj
    usesrAPI.registUser(data)
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
    usesrAPI.loginUser(queryObj)
            .then(res => {
              if (res.data.statusCode == 200) {
                dispatch({
                  type: LOGIN_USER_SUCCESS,
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
                type: GENERAL_FAIL,
                payload: null
              })
            })
  }
}

export function callFillMoreUserInfo (data) {
  let queryObj = {}

  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

    queryObj.accessToken = getState().RegistBusinessFormReducer.accessToken

    if (!data._mailAddress) {
      swalTrigger.triggerGeneralAlert('fail', 'Don\'t forget to tell us where you\'re from. Select a nationality.')
      dispatch({
        type: GENERAL_FAIL,
        payload: null
      })
    } else {
      queryObj.data = {
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        Birthday: data.Birthday,
        gender: data.gender,
        _mailAddress: {
          country: data._mailAddress.country
        }
      }
      usesrAPI.fillMoreAccountInfo(queryObj)
                .then(res => {
                  if (res.data.statusCode == 200) {
                    dispatch({
                      type: FILL_EXTRAUSERINFO_SUCCESS,
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
                    type: GENERAL_FAIL,
                    payload: null
                  })
                })
    }
  }
}

export function applyBusiness (data) {
  let queryObj = {}
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

    queryObj.accessToken = getState().RegistBusinessFormReducer.accessToken
    queryObj.data = {
      businessName: data.businessName,
      entityType: data.entityType,
      contactPerson: data.contactPerson,
      email: data.email,
      phone1: data.phoneCountryCode1 + data.phone1,
      phone2: data.phoneCountryCode2 + data.phone2,
      phoneCountryCode1: data.phoneCountryCode1 ? data.phoneCountryCode1 : '',
      phoneCountryCode2: data.phoneCountryCode2 ? data.phoneCountryCode2 : '',
      phoneType1: data.phoneType1,
      phoneType2: data.phoneType2,
      zipCode: data.zipCode,
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
      state: data.region ? data.region : '',
      webSite: data.webSite ? data.webSite : '',
            // TODO should be change to use street instead of addressLine1 --- 又改！！
      street: data.contactAddress
            // addressLine1: data.contactAddress
    }

        /**
         * below 神邏輯 講過不聽！ 上線了一週 又改回來！！
         * ＠2017.11.13 to resolve counrty 跟 region 間的空格問提
         * 加上BE API 要等 3.0.1 上線才可以不用地址相加，所以再度改回來
         */
        // let addressLine1 = '';
		// if( data.contactAddress ){
		// 	addressLine1 += data.contactAddress;
		// }
		// if( data.city){
		// 	addressLine1 += (' ' + data.city);
		// }
		// if( data.region){
		// 	addressLine1 += (' ' + data.region);
		// }
		// if( data.country){
		// 	addressLine1 += (' ' + data.country);
		// }
        // queryObj.data.addressLine1 = addressLine1;

    entityAPI.insertEntity(queryObj)
            .then(res => {
              if (res.data.statusCode == 200) {
                if (data.resellerno) {
                  dispatch({
                    type: FINAL_FINISH,
                    payload: res.data.result
                  })
                } else if (getState().RegistBusinessFormReducer.userInfo.resellerType == 'Reseller') {
                  dispatch({
                    type: EXISTING_RESELLETR_FINAL,
                    payload: res.data.result
                  })
                } else {
                  dispatch({
                    type: SUCCESS_APPLY_BUSINESS,
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

const upLoadToS3 = (dispatch, getState, fileImage) => {
  return new Promise((resolve, reject) => {
    let imgxxxx = `${moment().format('yyyyMMddHHmmss')}${Math.ceil(Math.random() * 10000).toString()}`
    let environment
    let imageURL

    switch (process.env.NODE_ENV) {
      case 'development':
        environment = 'dev'
        imageURL = `https://s3-ap-northeast-1.amazonaws.com/deepblusystem${environment}/web/user/${imgxxxx}.jpg?v=${moment().format('X')}`
        break
      case 'test':
        environment = 'test'
        imageURL = `https://s3-ap-northeast-1.amazonaws.com/deepblusystem${environment}/web/user/${imgxxxx}.jpg?v=${moment().format('X')}`
        break
      case 'production':
        environment = ''
        imageURL = `https://d2jj4mpogkbpyy.cloudfront.net/web/user/${imgxxxx}.jpg?v=${moment().format('X')}`
        break
    }

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-northeast-1:7d2ba766-091e-4c05-b575-bde7ad2310b6'
    })

    AWS.config.region = 'ap-northeast-1'
    let s3 = new AWS.S3()

    let params = {
      Bucket: `deepblusystem${environment}`,
      Key: `web/user/${imgxxxx}.jpg`,
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

export function applyReseller (data) {
  let queryObj = {}

  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

    queryObj.accessToken = getState().RegistBusinessFormReducer.accessToken
    queryObj.data = {
      businessLicenseNumber: data.businessNumber,
            // 有時候 code 被改了～ 你真的不知道為什麼不通知一聲！！然後還改錯！！
            // businessLicenseNumber : data.businessLicenseNumber,

      avgCustomerPerM: data.avgCustomerPerM,
      expectedSalePerM: data.expectedSalePerM,
      mailAddress: {
      }
    }

    if (data.city) {
      queryObj.data.mailAddress.city = data.city
    }
    if (data.state) {
      queryObj.data.mailAddress.state = data.state
    }
    if (data.country) {
      queryObj.data.mailAddress.country = data.country
    }
    if (data.countryCode) {
      queryObj.data.mailAddress.countryCode = data.countryCode
    }
    if (data.zipCode) {
      queryObj.data.mailAddress.zipCode = data.zipCode
    }
    if (data.contactAddress) {
      queryObj.data.mailAddress.line1 = data.contactAddress
    }

    upLoadToS3(dispatch, getState, data.businessPic)
            .then(res => {
              queryObj.data.businessLicenseUrl = res
              return entityAPI.handleReseller(queryObj)
            })
            .then(res => {
              if (res.data.statusCode == 200) {
                dispatch({
                  type: SUCCESS_APPLY_RESELLER,
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
                type: GENERAL_FAIL,
                payload: null
              })
            })
  }
}

export function callSaveProInfo (data) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LODDING,
      showLoad: true
    })

        // fake
    if (data.ambOption == 'y') {
      dispatch({
        type: CONTINUE_AMB_PROCESS,
        payload: ''
      })
    } else {
      dispatch({
        type: FILL_PROINFO_SUCCESS,
        payload: ''
      })
    }

        // TODO prepare queryObj
        // usesrAPI.fillMoreAccountInfo( queryObj )
        //     .then( res => {
        //         dispatch({
        //             type: LOGIN_USER_SUCCESS,
        //             payload: res.data
        //         });
        //     })
        //     .catch( err => {
        //         // TODO according to different error message do different error handling.
        //     });
  }
}
