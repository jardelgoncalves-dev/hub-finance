import { SET_CURRENT_USER } from './types'

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    dispatch(setCurrentUser({}));
  }
}

export function login(user) {
  return dispatch => {
      dispatch(setCurrentUser(user))
  }
}