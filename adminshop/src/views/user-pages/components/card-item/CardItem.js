import { Card, Button, message } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { addToCart } from '../../../../redux/actions/cart'
const { Meta } = Card

export default function CardItem(props) {
  const dispatch = useDispatch()
  const { name, countInStock, price, id, images } = props.product

  const handleAddToCart = () => {
    if (props.isLogin) {
      dispatch(
        addToCart({
          product: name,
          productId: id,
          price: price,
          quantity: 1,
          image: images[0].url,
        })
      )
    } else {
      message.error('Please login first!')
    }
  }
  return (
    <Card
      hoverable
      style={{
        width: 318,
      }}
      cover={
        <img
          style={{ height: '200px', objectFit: 'cover' }}
          alt="example"
          src={images[0].url}
        />
      }
    >
      <Meta title={name} description={`${countInStock} available`}></Meta>
      <h3>{`$ ${price}`}</h3>
      <Button icon={<ShoppingCartOutlined />} onClick={handleAddToCart} />
    </Card>
  )
}
