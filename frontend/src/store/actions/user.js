import { SET_CURRENT_USER } from './types'
import { removeUserAndToken, setUserAndToken } from '../../services/auth'
import api from '../../services/api'

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    removeUserAndToken()
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return api.post('/session', data)
      .then(response => {
        setUserAndToken(response.data.token, response.data.user)
        dispatch(setCurrentUser(response.data.user))
        return response
      }).catch(err => {
        return err.response
      })
  }
}

export function register(data) {
  return dispatch => {
    return api.post('/users', data)
      .then(response => {
        setUserAndToken(response.data.token, response.data.user)
        dispatch(setCurrentUser(response.data.user))
        return response
      }).catch(err => {
        return err.response
      })
  }
}