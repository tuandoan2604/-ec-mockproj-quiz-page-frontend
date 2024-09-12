import React from 'react'
import { Input, Modal, Button } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { signin } from '../../../../redux/actions/auth'

export default function SigninForm(props) {
  const dispatch = useDispatch()
  const { isShowSigninModal, handleCancel, handleToggle, setIsShow } = props
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      setIsShow(false)
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
      <Modal
        visible={isShowSigninModal}
        onCancel={handleCancel}
        footer={[
          <Button key="signin" type="primary" onClick={formik.handleSubmit}>
            Sign In
          </Button>,
          <Button key="signup" onClick={handleToggle}>
            Create An Account
          </Button>,
        ]}
      >
        <h1>Welcome to Shop App</h1>

        <Input
          id="email"
          name="email"
          value={formik?.values?.email}
          onChange={formik.handleChange}
          placeholder="Email@gmail.com"
        />
        <p>{formik.errors.email}</p>
        <Input.Password
          id="password"
          name="password"
          value={formik?.values?.password}
          onChange={formik.handleChange}
          style={{ marginTop: 20 }}
          placeholder="Password"
        />
        <p>{formik.errors.password}</p>
      </Modal>
    </>
  )
}
