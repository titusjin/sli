import api from './api'
import _ from 'lodash'
import swalTrigger from './swalTrigger'

export const selectedRowHelper = (getState, row, isSelected) => {
  const arr = []
  let selectedArr = getState().DiveLogDirtyDataReducer.get('selectedArr').toJS()
  console.log('pre', selectedArr)

  if ((row) && (isSelected)) {
    const isInArr = selectedArr.find(inArr => row._id === inArr._id)
    if (isInArr) {
      return
    } else {
      selectedArr.push(row)
    }
  }

  if ((row) && (!isSelected)) {
    selectedArr = selectedArr.filter(inArr => {
      if (inArr._id === row._id) {
        return false
      } else {
        return true
      }
    })
  }
  return selectedArr
}

export const checkDiveSpotGeoGoogle = (lat, lng) => {
  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/divespot/v0/diveSpotGeoInfo?lat=${lat}&lng=${lng}`,
    method: 'GET'
  })
}

export const handleSuggestions = (comparator, googleApi) => {
  const suggested = _.omitBy(googleApi, function (v, k) { return comparator[k] === v })
  let suggestedArr = []

  Object.keys(suggested).map((key, value) => {
    suggestedArr.push(
      {
        name: key,
        value: suggested[key],
        isSelected: false
      }
        )
  })
  return suggestedArr
}

export const handleNoUserLoggedInId = () => {
  swal('oops', 'something went wrong with your token. please login again', 'error')
  setTimeout(() => {
    localStorage.clear()
    if (!location.origin) {
      location.origin = `${location.protocol}//${location.host}`
    }
    window.location.replace(location.origin)
  }, 2000)
}

export const handleReplaceDivespotName = (val, stateObj, closeModalAndClearState, clearSelected) => {
  const {
        userSpots,
        systemSpots,
        existedSystemDiveSpotId,
        existedUserDiveSpotId
    } = stateObj

  if (!existedUserDiveSpotId && !existedSystemDiveSpotId) {
    swalTrigger.triggerCustomSwal({
      title: 'ooops',
      text: 'You must select at least one Divespot as default to replace the other divespots',
      type: 'error',
      allowOutsideClick: true,
      allowEscapeKey: true
    })
    closeModalAndClearState()
  }

  if (existedUserDiveSpotId && existedSystemDiveSpotId) {
    swalTrigger.triggerCustomSwal({
      title: 'Oooops!',
      text: 'You can only replace system or user divespot, not both at the same time',
      type: 'error',
      allowOutsideClick: true,
      allowEscapeKey: true
    })
    clearSelected()
    return
  }

  let data = {
    systemSpotIds: [],
    userSpotIds: [],
    existedSystemDiveSpotId: ''
  }
  if (val === 'User') {
    data['existedSystemDiveSpotId'] = existedUserDiveSpotId
    const replaceUserSpots =
            userSpots
                .filter(spot => spot.isReplace)
                .map(item => item._id)

    data.userSpotIds = replaceUserSpots
    return data
  } else {
    data['existedSystemDiveSpotId'] = existedSystemDiveSpotId
    const replaceSystemSpots =
            systemSpots
                .filter(spot => spot.isReplace)
                .map(item => item._id)
    data.systemSpotIds = replaceSystemSpots
    return data
  }
}

export const onlyUserSelectables = (arr, val) => {
  const indexes = []
  let i
  for (i = 0; i < arr.length; i++) {
    if (arr[i].spottype === val) {
      indexes.push(arr[i]._id)
    }
  }
  return indexes
}
