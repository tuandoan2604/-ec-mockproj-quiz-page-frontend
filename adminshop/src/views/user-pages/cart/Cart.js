import React from 'react'
import { Table, Button, Card } from 'antd'
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  createCart,
} from '../../../redux/actions/cart'

import { decryptData } from '../../../util/util'

export default function Cart() {
  const dispatch = useDispatch()
  const addedProducts = useSelector((state) => state?.cart.addedProducts)
  let totalCart = 0
  const data = addedProducts.map((product) => {
    totalCart += product.quantity * product.price
    return {
      product: product.product,
      price: product.price,
      quantity: { quantity: product.quantity, productId: product.productId },
      total: `$${product.quantity * product.price}`,
      image: product.image,
    }
  })

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId))
  }

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId))
  }

  const handleRemove = (productId) => {
    dispatch(removeProduct(productId))
  }

  const handleCreateCart = () => {
    const encryptedUser = localStorage.getItem('user')
    const salt = process.env.REACT_APP_SALT
    const decryptedUser = decryptData(encryptedUser, salt)

    const cart = {
      cart: {
        totalPrice: totalCart,
        userId: decryptedUser.id,
      },
      itemArr: addedProducts.map((product) => {
        totalCart += product.quantity * product.price
        return {
          productId: product.productId,
          price: product.price,
          quantity: product.quantity,
          total: product.quantity * product.price,
        }
      }),
    }

    dispatch(createCart(cart))
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (url) => (
        <img
          style={{ width: 120, height: 120, objectFit: 'cover' }}
          src={url}
          alt="img"
        />
      ),
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: ({ quantity, productId }) => (
        <>
          <Button
            icon={<PlusOutlined />}
            size="small"
            style={{ marginRight: '10px' }}
            onClick={() => handleIncrease(productId)}
          />
          {quantity}
          <Button
            icon={<MinusOutlined />}
            size="small"
            style={{ marginLeft: '10px' }}
            onClick={() => handleDecrease(productId)}
          />
          <Button
            icon={<CloseOutlined />}
            size="small"
            style={{ marginLeft: '20px', color: '#ff4d4f' }}
            onClick={() => handleRemove(productId)}
          />
        </>
      ),
    },

    {
      title: 'Total',
      dataIndex: 'total',
    },
  ]

  const onChange = (pagination, filters, sorter, extra) => {}
  return (
    <>
      <h1>Shopping Cart</h1>

      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
      />
      <Card
        style={{
          width: 600,
          marginLeft: 'auto',
          marginTop: 43,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h1>Cart Total</h1>
        <h3>Subtotal</h3>
        <h3>Shipping</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <h2>Total: </h2>
          <h1>${totalCart}</h1>
        </div>

        <Button
          style={{
            width: 500,
            height: 60,
            color: 'white',
            backgroundColor: '#001529',
            fontSize: '30px',
          }}
        >
          Proceed to checkout
        </Button>
        <Button
          style={{
            width: 500,
            height: 60,
            color: 'white',
            backgroundColor: '#001529',
            fontSize: '30px',
          }}
          onClick={handleCreateCart}
        >
          Create Cart
        </Button>
      </Card>
    </>
  )
}
