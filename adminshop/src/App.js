import './App.css'
import Admin from './views/admin-pages/Admin'
import User from './views/user-pages/User'
import { useEffect, useState } from 'react'
import { decryptData } from './util/util'

import { useSelector } from 'react-redux'

import 'antd/dist/antd.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './views/admin-pages/authPage/AuthPage'

function App() {
  const [admin, setAdmin] = useState()
  let encryptedUser = localStorage.getItem('user')
  let reduxUser = useSelector((state) => state?.auth.user)
  useEffect(() => {
    if (encryptedUser !== null) {
      const salt = process.env.REACT_APP_SALT
      let decryptedUser = decryptData(encryptedUser, salt)
      if (decryptedUser.role === 'admin') {
        setAdmin(decryptedUser)
      }
    }
  }, [encryptedUser, reduxUser])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {admin?.username ? (
            <>
              <Route path="/admin/*" element={<Admin />} />
            </>
          ) : (
            <Route path="/admin/*" element={<AuthPage />} />
          )}
          <Route path="/*" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
