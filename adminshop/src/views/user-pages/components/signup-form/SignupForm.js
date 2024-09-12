import React from 'react'
import { Input, Modal, Button } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { signup } from '../../../../redux/actions/auth'

export default function SignupForm(props) {
  const dispatch = useDispatch()
  const { isShowSignupModal, handleCancel, handleToggle, setIsShow } = props
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log(values)
      setIsShow(false)
      const formData = {
        username: values.username,
        email: values.email,
        password: values.confirmPassword,
      }
      dispatch(signup(formData))
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required')
        .min(4, 'Last name is more than 4 characters'),
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
      confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
  })
  return (
    <>
      <Modal
        visible={isShowSignupModal}
        onCancel={handleCancel}
        footer={[
          <Button key="signup" type="primary" onClick={formik.handleSubmit}>
            Register
          </Button>,
          <Button key="signin" onClick={handleToggle}>
            Login
          </Button>,
        ]}
      >
        <h1>Welcome to Shop App</h1>
        <Input
          id="username"
          name="username"
          value={formik?.value?.username}
          onChange={formik.handleChange}
          placeholder="Username"
        />
        <p>{formik.errors.username}</p>
        <Input
          id="email"
          name="email"
          value={formik?.value?.email}
          onChange={formik.handleChange}
          style={{ marginTop: 20 }}
          placeholder="Email@gmail.com"
        />
        <p>{formik.errors.email}</p>
        <Input.Password
          id="password"
          name="password"
          value={formik?.value?.password}
          onChange={formik.handleChange}
          style={{ marginTop: 20 }}
          placeholder="Password"
        />
        <p>{formik.errors.password}</p>
        <Input.Password
          id="confirmPassword"
          name="confirmPassword"
          value={formik?.value?.confirmPassword}
          onChange={formik.handleChange}
          style={{ marginTop: 20 }}
          placeholder="Confirm Password"
        />
        <p>{formik.errors.confirmPassword}</p>
      </Modal>
    </>
  )
}
