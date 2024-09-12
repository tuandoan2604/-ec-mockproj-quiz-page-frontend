import { createSlice } from '@reduxjs/toolkit'
import { encryptData } from '../../util/util'
import { decryptData } from '../../util/util'

const initialState = {
  user: {},
  tokens: {},
  deviceId: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      const salt = process.env.REACT_APP_SALT

      const encryptedUser = encryptData(action.payload.data.user, salt)
      const encryptedTokens = encryptData(action.payload.data.tokens, salt)
      const encryptedDeviceId = encryptData(action.payload.data.deviceId, salt)

      localStorage.setItem('user', encryptedUser)
      localStorage.setItem('tokens', encryptedTokens)
      localStorage.setItem('deviceId', encryptedDeviceId)

      state.user = action.payload.data.user
      state.tokens = action.payload.data.tokens
      state.deviceId = action.payload.data.deviceId
    },
    logOut: (state) => {
      state.user = {}
      state.tokens = {}
    },
  },
})

export const { signIn, logOut } = authSlice.actions
export default authSlice.reducer
