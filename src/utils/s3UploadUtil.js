/**
 *  Common util for setting config about uploading files in Amazon S3 service
 *
 *  @author titus@deepblu.com
 *  @since 2017.04
 */

'use strict'

let s3uploader = {}
s3uploader.setS3ObjectConfig = (file, folder) => {
  let imgxxxx = `${moment().format('yyyyMMddHHmmss')}${Math.ceil(Math.random() * 10000).toString()}`
  let environment
  let imageURL
  switch (process.env.NODE_ENV) {
    case 'development':
      environment = 'dev'
      imageURL = `https://s3-ap-northeast-1.amazonaws.com/deepblusystem${environment}/web/${folder}/${imgxxxx}.jpg?v=${moment().format('X')}`
      break
    case 'test':
      environment = 'test'
      imageURL = `https://s3-ap-northeast-1.amazonaws.com/deepblusystem${environment}/web/${folder}/${imgxxxx}.jpg?v=${moment().format('X')}`
      break
    case 'production':
      environment = ''
      imageURL = `https://d2jj4mpogkbpyy.cloudfront.net/web/${folder}/${imgxxxx}.jpg?v=${moment().format('X')}`
      break
  }

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:7d2ba766-091e-4c05-b575-bde7ad2310b6'
  })
  AWS.config.region = 'ap-northeast-1'

  let s3 = new AWS.S3()
  let params = {
    Bucket: `deepblusystem${environment}`,
    Key: `web/${folder}/${imgxxxx}.jpg`,
    ACL: 'public-read',
    Body: file
  }

  return { s3Obj: s3, params: params, imageUrl: imageURL }
}

s3uploader.uploadEntityAvatar = (file, orgId, folder) => {
  let imgxxxx = `${moment().format('yyyyMMddHHmmss')}${Math.ceil(Math.random() * 10000).toString()}`
  let environment
  let imageURL

  switch (process.env.NODE_ENV) {
    case 'development':
      environment = 'dev'
      imageURL = `https://s3-ap-northeast-1.amazonaws.com/deepbluentity${environment}/${orgId}/${folder}/${imgxxxx}.jpg`
      break
    case 'test':
      environment = 'test'
      imageURL = `https://s3-ap-northeast-1.amazonaws.com/deepbluentity${environment}/${orgId}/${folder}/${imgxxxx}.jpg`
      break
    case 'production':
      environment = 'production'
      imageURL = `https://d301m460724x78.cloudfront.net/${orgId}/${folder}/${imgxxxx}.jpg`
      break
  }

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:7d2ba766-091e-4c05-b575-bde7ad2310b6'
  })
  AWS.config.region = 'ap-northeast-1'

  let s3 = new AWS.S3()

  let bucket = ''
  if (environment == 'production') {
    bucket = `deepbluentity`
  } else {
    bucket = `deepbluentity${environment}`
  }
  let params = {
    Bucket: bucket,
    Key: `${orgId}/${folder}/${imgxxxx}.jpg`,
    ACL: 'public-read',
    Body: file
  }

  console.log('in s3uploadUtil : ', imageURL)

  return { s3Obj: s3, params: params, imageUrl: imageURL }
}

export default s3uploader
