import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  addedProducts: [],
}

export const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const recentAddedProduct = action.payload
      console.log(recentAddedProduct)
      const dupItem = state.addedProducts.filter(
        (item) => item.productId === recentAddedProduct.productId
      )
      if (dupItem.length > 0) {
        dupItem[0].quantity += 1
      } else {
        state.addedProducts.push(recentAddedProduct)
      }
    },

    increase: (state, action) => {
      const increaseProductId = action.payload
      const increaseItem = state.addedProducts.filter(
        (item) => item.productId === increaseProductId
      )
      increaseItem[0].quantity += 1
    },

    decrease: (state, action) => {
      const decreaseProductId = action.payload
      const decreaseItem = state.addedProducts.filter(
        (item) => item.productId === decreaseProductId
      )
      if (decreaseItem[0].quantity > 1) {
        decreaseItem[0].quantity -= 1
      }
    },

    remove: (state, action) => {
      const removeProductId = action.payload
      const newProducts = state.addedProducts.filter(
        (item) => item.productId !== removeProductId
      )
      state.addedProducts = newProducts
    },
  },
})

export const { addProduct, increase, decrease, remove } = productSlice.actions
export default productSlice.reducer
