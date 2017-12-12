import api from '../api'

export const updateUserRoleStatusAPI = (status, userArr, userRole) => {
  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/user/v0/updateAmbResellerVerifyStatus/${userRole}`,
    method: 'PUT',
    data: {
      status,
      ownerIds: userArr
    }
  })
}

export const fetchUserByRoleAPI = (params, role) => {
  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/user/v0/getResellersAmbs/${role}`,
    method: 'GET',
    params
  })
}

export const updateSingleUserRoleStatusAPI = (ownerId, status, sendEmail, note, role) => {
  return api.fire({

    url: `${__IP__BACKEND_API}/ipbackend/user/v0/updateSingleAmbResellerStatus/${role}`,
    method: 'PUT',
    data: {
      status,
      note,
      ownerId: ownerId

    }
  })
}

export const userRoleStatsAPI = (userRole) => {
  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/user/v0/fetchResellerNum/${userRole}`,
    method: 'GET'
  })
}

export function fetchAmbassadorCountAPI () {
  const config = {
    url: `${__IP__BACKEND_API}/ipbackend/user/v0/getAmbassadorsCount`,
    method: 'get'
  }
  return api.fire(config)
}
