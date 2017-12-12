
import api from './api'
import COUNTRIES from './countries.json'

// must encode ids for this function
export const fetchUsersFromMongo = (userIds) => {
  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/user/v0/getUser?userId=${userIds}`,
    method: 'get',
    headers: {'Authorization': localStorage.getItem('token')}

  })
}

export const getUserDiveType = (duser) => {
  if (duser.resellerType && duser.resellerType === 'Ambassador' && duser._salesAmbassdor &&
            duser._salesAmbassdor.verifyStatus === 'active') {
    return 'Ambassador'
  }
  if (duser.resellerType && duser.resellerType === 'Reseller' && duser._reseller &&
            duser._reseller.verifyStatus === 'active') {
    return 'Reseller'
  }
  if (duser.DiveID && duser.DiveID.role && duser.DiveID.role === 'Pro' && duser.DiveID.issueStatus === 'active') {
    return 'Pro'
  }
  return 'Regular'
}

export const convertCountryCodeToCountry = (countryCode) => {
  const countryName = COUNTRIES.find((country) => {
    return countryCode === country.isoCode
  })

  return countryName ? countryName.en : countryCode
}

// export const colorsToRole = []
