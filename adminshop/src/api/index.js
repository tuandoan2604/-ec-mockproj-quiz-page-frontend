import axios from 'axios'
import { decryptData, encryptData } from '../util/util'

const API = axios.create({
  baseURL: 'http://139.59.103.50:5000',
})

const salt = process.env.REACT_APP_SALT

API.interceptors.request.use(async (config) => {
  if (localStorage.getItem('tokens')) {
    let decryptedTokens = decryptData(localStorage.getItem('tokens'), salt)

    const expire = Number(new Date(decryptedTokens.access.expires))
    const current = Number(new Date())
    if (expire < current) {
      console.log('Token expired!!!')
      let refreshToken = decryptedTokens.refresh.token
      const res = await axios.post(
        'http://139.59.103.50:5000/v1/auth/refresh-tokens',
        { refreshToken: refreshToken, deviceId: 'deviceId-hieu1x@gmail.com' }
      )

      config.headers.authorization = `Bearer ${res.data.data.access.token}`
      const encryptedTokens = encryptData(res.data.data, salt)

      localStorage.setItem('tokens', encryptedTokens)
    } else {
      console.log('else')
      config.headers.authorization = `Bearer ${decryptedTokens.access.token}`
    }
  }
  return config
})

export const signUp = (formData) => API.post('/v1/auth/register', formData)
export const signIn = (formData) => API.post('/v1/auth/login', formData)
export const logOut = (reqData) => API.post('/v1/auth/logout', reqData)

export const getProducts = () => API.get('/v1/products?category=Shoes')
export const updateProduct = (formData, id) =>
  API.patch(`/v1/products/${id}`, formData)
export const deleteProduct = (id) => API.delete(`/v1/products/${id}`)
export const createProduct = (formData) => API.post(`/v1/products`, formData)

export const getUser = () => API.get('/v1/users?role=user&size=1000')
export const deleteUser = (id) => API.delete(`/v1/users/${id}`)

export const createCart = (cart) => API.post('/v1/cart', cart)
