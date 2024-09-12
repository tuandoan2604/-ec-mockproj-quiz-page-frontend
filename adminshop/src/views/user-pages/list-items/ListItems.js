import React, { useEffect, useState } from 'react'
import CardItem from '../components/card-item/CardItem'
import { List, Spin } from 'antd'

import { useSelector, useDispatch } from 'react-redux'

import { getProducts } from '../../../redux/actions/product'

export default function ListItems() {
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(false)

  let encryptedUser = localStorage.getItem('user')

  useEffect(() => {
    if (encryptedUser?.length > 0) {
      setIsLogin(true)
    }
  }, [encryptedUser])

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  const [productsLoaded, setProductsLoaded] = useState(false)

  const products = useSelector((state) => state?.product.products)

  useEffect(() => {
    if (products.length > 0) {
      setProductsLoaded(true)
    }
  }, [products])

  return (
    <>
      {productsLoaded ? (
        <List
          grid={{
            gutter: [32, 16],
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            total: 10,
          }}
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <CardItem product={{ ...product }} isLogin={isLogin} />
            </List.Item>
          )}
        />
      ) : (
        <Spin />
      )}
    </>
  )
}
