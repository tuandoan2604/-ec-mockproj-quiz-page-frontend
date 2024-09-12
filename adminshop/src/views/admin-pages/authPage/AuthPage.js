import React from 'react'

import { Button, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { signin } from '../../../redux/actions/auth'

import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function SignIn() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const formData = {
        email: values.email,
        password: values.password,
        deviceId: 'deviceId-hieu1x@gmail.com',
      }
      dispatch(signin(formData))
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required')
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Invalid Email'
        ),
      password: Yup.string()
        .required('Required')
        .min(8, 'Password is more than 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
    }),
  })
  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#001529',
          color: 'white',
        }}
      >
        <div
          style={{
            marginTop: '20px',
            fontSize: '28px',
            fontWeight: '400',
            color: 'white',
            textAlign: 'center',
          }}
        >
          WELCOME BACK! Please login as Admin
        </div>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div>
            <Input
              id="email"
              name="email"
              value={formik?.value?.email}
              onChange={formik.handleChange}
              placeholder="Email"
              style={{
                width: '353px',
                height: '50.6px',
                borderRadius: '38px',
                paddingLeft: '23px',
                marginTop: '65px',
              }}
            />
            <p>{formik.errors.email}</p>
          </div>
          <div>
            <Input.Password
              id="password"
              name="password"
              value={formik?.value?.password}
              onChange={formik.handleChange}
              placeholder="Password"
              style={{
                width: '353px',
                height: '50.6px',
                borderRadius: '38px',
                paddingLeft: '23px',
                marginTop: '28.4px',
              }}
            />
            <p>{formik.errors.password}</p>
          </div>
          <div>
            <Button
              style={{
                width: '353px',
                height: '50.6px',
                borderRadius: '38px',
                marginTop: '28.4px',
              }}
              htmlType="submit"
            >
              LOG IN
            </Button>
          </div>
        </form>
        <div
          style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: '400',
            marginTop: '25.4px',
          }}
        >
          Forgot Password?
        </div>

        <div
          style={{
            marginTop: '50px',
            fontSize: '14px',
            fontWeight: '400',
            color: 'grey',
          }}
        >
          DON'T HAVE ACCOUNT?&nbsp;
          <a href="/signup" style={{ color: 'white' }}>
            SIGN UP
          </a>
        </div>
      </div>
    </>
  )
}
