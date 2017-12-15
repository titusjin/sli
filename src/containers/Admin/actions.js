import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_INPUT_NOT_COMPLETE
} from './constants'

export function login(data) {
  return (dispatch, actions) => {
    console.log('in aciton : login , the data like : ', data);
    if(!data.email || !data.password){
      dispatch({
        type: LOGIN_INPUT_NOT_COMPLETE,
        payload : null
      });
    }else{
      // TODO replace to real api callling
      dispatch({
        type: LOGIN_SUCCESS,
        payload: null
      })
    }
  }
}
