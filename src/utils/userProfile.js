
// pass duser immutable obj
export const handleAmbassadorOrReseller = (data) => {
  let userType = {userType: '', role: ''}
  let dataObj = data.toJS()

  if (dataObj.resellerType === 'Reseller') {
    if (dataObj._reseller.verifyStatus == 'active') {
      userType = '_reseller'
    } else if (dataObj._reseller.verifyStatus == 'rejected') {
      userType = 'rejected_reseller'
    } else if (dataObj._reseller.verifyStatus == 'processing') {
      userType = 'processing_reseller'
    }
  } else if (dataObj.resellerType === 'Ambassador') {
    if (dataObj._salesAmbassdor.verifyStatus ==
        'active') {
      userType = '_salesAmbassdor'
    } else if (dataObj._salesAmbassdor.verifyStatus == 'processing') {
      userType = 'processing_salesAmbassdor'
    } else if (dataObj._salesAmbassdor.verifyStatus == 'rejected') {
      userType = 'rejected_salesAmbassdor'
    }
  }
  return userType
}

export const handleStatusColors = (status) => {
  switch (status) {
    case 'active':
      return '#84C43E'
    case 'waitVerify':
      return '#F5BE00'
    case 'pending':
      return 'orange'
    case 'cancel':
      return '#DB4343'
    default:
  }
}

export const handleRoleColor = (role) => {
  console.log('rike', role)
  switch (role) {
    case '_reseller':
      return '#59C1E4 '
    case '_salesAmbassdor':
      return '#DB4343'
  }
}
