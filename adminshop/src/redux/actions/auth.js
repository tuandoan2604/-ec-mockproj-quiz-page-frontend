import * as api from '../../api/index'
import { message } from 'antd'
import { signIn, logOut } from '../reducers/authSlice'

export const signup = (formData) => async () => {
  try {
    const { data } = await api.signUp(formData)

    if (data.message === 'Register Success') {
      message.success('Successfully register! Please Sign In.')
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)
    console.log(data.message)
    if (data.message === 'Login Success') {
      message.success('Successfully Login!')
    }
    console.log(data)
    dispatch(signIn(data))
  } catch (error) {
    console.log(error.message)
    message.error('Email or password is incorrect!')
  }
}

export const logout = (reqData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logOut(reqData)

    if (data.message === 'Logout Success') {
      message.success('Successfully Logout!')
    }
    console.log(data)
    navigate('/', { replace: true })
    dispatch(logOut(data))
  } catch (error) {
    console.log(error.message)
  }
}
