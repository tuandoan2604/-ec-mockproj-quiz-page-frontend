import * as api from '../../api/index'
import { message } from 'antd'

import { getReduxUser, deleteReduxUser } from '../reducers/userSlice'

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await api.getUser()
    dispatch(getReduxUser(data.data.result))
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(userId)
    if (data.message === 'Delete user success') {
      dispatch(deleteReduxUser(userId))
      message.success('Successfully delete user!')
    }
  } catch (error) {
    console.log(error.message)
  }
}
