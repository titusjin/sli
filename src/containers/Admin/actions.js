import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_INPUT_NOT_COMPLETE
} from './constants'

import userAPI from '~/src/utils/api-caller/users-api.js'
import swal from '~/src/utils/swalTrigger'
import sha1 from 'sha1'

export function login(data) {
  return (dispatch, actions) => {
    console.log('in aciton : login , the data like : ', data);

    if(!data.email || !data.password){
      dispatch({
        type: LOGIN_INPUT_NOT_COMPLETE,
        payload : null
      });
    }else{
      data.password = sha1(data.password)
      userAPI.login(data)
        .then( res => {
          console.log(res);

          let d = new Date();
          d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
          let expires = "expires=" + d.toGMTString();
          document.cookie = `token=${res.data.result};${expires}`;

          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.result
          })
        })
        .catch(err => {
          swal.triggerGeneralAlert('fail', 'Login fail')
        });
    }
  }
}
