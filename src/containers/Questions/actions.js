import {
  SINGLE_EVENT_Q_SUCCESS
} from './constants'

import eventAPI from '~/src/utils/api-caller/event-api.js'
import questionAPI from '~/src/utils/api-caller/question-api.js'
import swal from '~/src/utils/swalTrigger'

export function saveQ(saveObj){
  return (dispatch, actions)=>{
    questionAPI.saveQ(saveObj)
      .then(res => {
        if (res.data.statusCode == 200) {
          console.log(res.data)
          questionAPI.fetchQ(saveObj.eventId)
            .then(res => {
              if (res.data.statusCode == 200) {
                dispatch({
                  type: SINGLE_EVENT_Q_SUCCESS,
                  payload: res.data.result
                })
              } else {
                throw new Error('FETCH_SINGLEEVENT_FAIL')
              }
            })
        } else {
          reject(new Error('FETCH_SINGLEEVENT_FAIL'))
        }
      })
      .catch(err => {
        swal.triggerGeneralAlert('fail', 'input your question fail.')
      })
  }
}
