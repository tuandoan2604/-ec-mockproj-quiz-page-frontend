import * as api from '../../api/index'
import { message } from 'antd'
import { addProduct, increase, decrease, remove } from '../reducers/cartSlice'

export const addToCart = (product) => async (dispatch) => {
  try {
    dispatch(addProduct(product))
    message.success('Successfully add to your cart!')
  } catch (error) {
    console.log(error.message)
  }
}

export const increaseQuantity = (productId) => async (dispatch) => {
  try {
    dispatch(increase(productId))
  } catch (error) {
    console.log(error.message)
  }
}

export const decreaseQuantity = (productId) => async (dispatch) => {
  try {
    dispatch(decrease(productId))
  } catch (error) {
    console.log(error.message)
  }
}

export const removeProduct = (productId) => async (dispatch) => {
  try {
    dispatch(remove(productId))
  } catch (error) {
    console.log(error.message)
  }
}

export const createCart = (cart) => async (dispatch) => {
  try {
    const { data } = await api.createCart(cart)
    console.log(data)
  } catch (error) {
    console.log(error.message)
  }
}
