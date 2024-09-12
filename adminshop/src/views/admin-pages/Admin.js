import './Admin.css'
import React, { useEffect, useState } from 'react'
import {
  MedicineBoxOutlined,
  ShoppingCartOutlined,
  WindowsOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'

import { Button } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { logout } from '../../redux/actions/auth'

import ProductList from './productList/ProductList'
import AddProduct from './addProduct/AddProduct'
import UserList from './userList/UserList'
import AddUser from './addUser/AddUser'
import Orders from './orders/Orders'
import Dashboard from './dashboard/Dashboard'
import AuthPage from './authPage/AuthPage'
import EditProduct from './editProduct/EditProduct'

const { Header, Content, Footer, Sider } = Layout

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let refreshToken = useSelector((state) => state?.auth?.tokens?.refresh?.token)
  let deviceId = useSelector((state) => state?.auth?.deviceId)
  // menu data
  const handleLogout = () => {
    console.log(refreshToken)

    localStorage.clear()

    if (deviceId.length > 0) {
      const reqData = { refreshToken, deviceId }
      console.log(reqData)
      dispatch(logout(reqData, navigate))
    }
  }
  const handleToUserPage = () => {
    navigate('/', { replace: true })
  }
  const getItem = (label, key, icon, children, onClick) => {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    }
  }
  const items = [
    getItem('Dashboard', '1', <WindowsOutlined />, null, () =>
      navigate('/admin/dashboard', { replace: true })
    ),
    getItem('Product', '2', <MedicineBoxOutlined />, [
      getItem('Product List', '3', null, null, () =>
        navigate('/admin/product-list', { replace: true })
      ),
      getItem('Add Product', '4', null, null, () =>
        navigate('/admin/add-product', { replace: true })
      ),
    ]),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('User List', '5', null, null, () =>
        navigate('/admin/user-list', { replace: true })
      ),
      getItem('Add User', '6', null, null, () =>
        navigate('/admin/add-user', { replace: true })
      ),
    ]),
    getItem('Orders', '7', <ShoppingCartOutlined />, null, () =>
      navigate('/admin/orders', { replace: true })
    ),
  ]
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <a className="admin-logo" href="/admin">
          SHOP APP
        </a>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div className="header-btn">
            <Button className="sign" onClick={handleToUserPage}>
              Go to User page
            </Button>
            <Button className="sign" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product" element={<EditProduct />} />
              <Route path="user-list" element={<UserList />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="orders" element={<Orders />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        ></Footer>
      </Layout>
    </Layout>
  )
}
