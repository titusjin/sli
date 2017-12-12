import api from '../api'

export const saveContinentApi = (continent, country) => {
  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/divespot/v0/createOldContinet`,
    method: 'PUT',
    data: {
      country,
      continent
    }
  })
}

export const repointSpotsToExistingSpotsApi = (divelogId, shouldbeSpotId, diveSiteName, coordinates) => {
  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/divespot/v0/rePointMissingDiveSpotInDivelog`,
    method: 'PUT',
    data: {
      spot: {
        divelogId,
        shouldbeSpotId,
        diveSiteName,
        coordinates
      }
    }
  })
}
