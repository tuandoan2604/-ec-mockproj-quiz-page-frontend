import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './reducers/authSlice'
import productReducer from './reducers/productSlice'
import cartReducer from './reducers/cartSlice'
import userReducer from './reducers/userSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})
