import { Layout, Button, Input, Modal, Spin } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import './User.css'
import SigninForm from './components/signin-form/SigninForm'
import SignupForm from './components/signup-form/SignupForm'
import MyAccount from './my-account/MyAccount'
import ListItems from './list-items/ListItems'
import Cart from './cart/Cart'

import { decryptData } from '../../util/util'

import { useDispatch, useSelector } from 'react-redux'

const { Header, Content, Footer } = Layout
const { Search } = Input

export default function User() {
  const navigate = useNavigate()
  const [isShowCart, setIsShowCart] = useState(false)
  const [isShowSigninModal, setIsShowSigninModal] = useState(false)
  const [isShowSignupModal, setIsShowSignupModal] = useState(false)
  const [user, setUser] = useState()

  let encryptedUser = localStorage.getItem('user')
  let reduxUser = useSelector((state) => state?.auth.user)

  useEffect(() => {
    if (encryptedUser !== null) {
      const salt = process.env.REACT_APP_SALT
      const decryptedUser = decryptData(encryptedUser, salt)
      setUser(decryptedUser)
    }
  }, [reduxUser, encryptedUser])

  //cart

  const handleShowCart = () => {
    setIsShowCart(true)
  }
  const handleViewCart = () => {
    setIsShowCart(false)
    navigate('/cart', { replace: true })
  }
  const handleCheckOut = () => {
    setIsShowCart(false)
  }
  const handleCancel = () => {
    setIsShowCart(false)
    setIsShowSigninModal(false)
    setIsShowSignupModal(false)
  }

  //signin/signup

  const showLoginModal = () => {
    setIsShowSigninModal(true)
  }

  const handleToggle = () => {
    setIsShowSigninModal((prev) => !prev)
    setIsShowSignupModal((prev) => !prev)
  }

  const handleShowAccount = () => {
    navigate('/my-account', { replace: true })
  }
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <a className="logo" href="/">
          SHOP APP
        </a>
        <Button className="btn-categories" icon={<MenuUnfoldOutlined />}>
          Categories
        </Button>
        <Search
          placeholder="Search Items"
          className="search"
          style={{
            width: 500,
            marginTop: 16,
            backgroundColor: '#C4C4C4',
          }}
        />
        <Button
          icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
          style={{
            marginLeft: '30px',
            color: 'white',
            background: '#001529',
            border: 0,
          }}
          onClick={handleShowCart}
        />
        <Modal
          visible={isShowCart}
          style={{ top: 70, left: 200 }}
          width={338}
          height={256}
          onCancel={handleCancel}
          footer={[
            <Button key="cart" onClick={handleViewCart}>
              View Cart
            </Button>,
            <Button key="checkout" type="primary" onClick={handleCheckOut}>
              Checkout
            </Button>,
          ]}
        >
          <p>Subtotal</p>
          <p>Shipping</p>
          <p>Total</p>
        </Modal>
        {user?.username ? (
          <Button
            icon={<SmileOutlined style={{ fontSize: '20px' }} />}
            style={{
              marginLeft: '20px',
              border: 0,
            }}
            onClick={handleShowAccount}
          >
            {user?.username}
          </Button>
        ) : (
          <Button
            icon={<UserOutlined style={{ fontSize: '20px' }} />}
            style={{
              marginLeft: '20px',
              color: 'white',
              background: '#001529',
              border: 0,
            }}
            onClick={showLoginModal}
          />
        )}

        <SigninForm
          isShowSigninModal={isShowSigninModal}
          handleCancel={handleCancel}
          handleToggle={handleToggle}
          setIsShow={setIsShowSigninModal}
        />

        <SignupForm
          isShowSignupModal={isShowSignupModal}
          handleCancel={handleCancel}
          handleToggle={handleToggle}
          setIsShow={setIsShowSignupModal}
        />
      </Header>

      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          marginTop: 90,
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
            height: 'auto',
          }}
        >
          <Routes>
            <Route path="" element={<ListItems />} />
            {user?.username ? (
              <>
                <Route path="cart" element={<Cart />} />
                <Route
                  path="my-account"
                  element={<MyAccount setUser={setUser} />}
                />
              </>
            ) : (
              <Route path="*" element={<h1>Please Login First !</h1>} />
            )}
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      ></Footer>
    </Layout>
  )
}
