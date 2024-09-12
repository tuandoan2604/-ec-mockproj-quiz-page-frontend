import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getReduxUser: (state, action) => {
      state.users = action.payload
    },
    deleteReduxUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
  },
})

export const { getReduxUser, deleteReduxUser } = userSlice.actions
export default userSlice.reducer
