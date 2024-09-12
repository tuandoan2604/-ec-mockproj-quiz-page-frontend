import React, { useState } from 'react'
import { Card, Button, message } from 'antd'
import { Input, Upload, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import UploadImage from './UploadImage'
import { createItem } from '../../../redux/actions/product'

const { Option } = Select

export default function AddProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      brand: '',
      category: 'Shoes',
      description: '',
      price: '',
      rating: '',
      countInStock: '',
      imageUrls: [...images],
    },
    onSubmit: (values) => {
      if (values.imageUrls.length > 0) {
        dispatch(createItem(values, navigate))
      } else {
        message.error('Please upload images first!')
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required')
        .min(4, 'Please type something greater than 4 characters'),
      brand: Yup.string()
        .required('Required')
        .min(4, 'Please type something greater than 4 characters'),
      description: Yup.string()
        .required('Required')
        .min(4, 'Please type something greater than 4 characters'),
      price: Yup.number().required('Required'),
      rating: Yup.number().required('Required'),
      countInStock: Yup.number().required('Required'),
    }),
  })
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <h1>CREATE PRODUCT</h1>
        <Button type="primary" onClick={formik.handleSubmit}>
          Create
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Card
          title="Basic information"
          style={{
            width: '720px',
            marginRight: '25px',
          }}
        >
          <h3>Name</h3>
          <Input
            name="name"
            value={formik?.values?.name}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.name}</p>

          <h3>Description</h3>
          <Input
            name="description"
            value={formik?.values?.description}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.description}</p>

          <h3>Price</h3>
          <Input
            name="price"
            value={formik?.values?.price}
            onChange={formik.handleChange}
          />

          <p>{formik.errors.price}</p>

          <h3>Brand</h3>
          <Input
            name="brand"
            value={formik?.values?.brand}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.brand}</p>

          <h3>Stock quantity</h3>
          <Input
            name="countInStock"
            value={formik?.values?.countInStock}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.countInStock}</p>
        </Card>
        <div>
          <Card
            title="Images"
            style={{
              width: '520px',
            }}
          >
            <UploadImage setImages={setImages} />
          </Card>
          {/* <Card
            title="Categories"
            style={{
              width: '520px',
            }}
          >
            <Input />
          </Card> */}
          <Card
            title="Rating"
            style={{
              width: '520px',
            }}
          >
            <Input
              name="rating"
              value={formik?.values?.rating}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.rating}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
