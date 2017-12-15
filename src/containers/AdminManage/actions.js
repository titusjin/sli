import {
  FETCH_SUCCESS
} from './constants'

export function fetchEvents(){
  return (dispatch, actions) => {
    // TODO real API
    dispatch({
      type: FETCH_SUCCESS,
      payload: [
        {
          eventName: 'First',
          startTime: '',
          endTime: ''
        },
        {
          eventName: 'Second',
          startTime: '',
          endTime: ''
        }
      ]
    })
  }
}
