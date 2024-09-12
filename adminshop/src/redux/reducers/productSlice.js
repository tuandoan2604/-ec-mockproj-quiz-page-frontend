import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProduct: (state, action) => {
      state.products = action.payload.data.result
    },
    deleteReduxProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      )
    },
  },
})

export const { fetchProduct, deleteReduxProduct } = productSlice.actions
export default productSlice.reducer
