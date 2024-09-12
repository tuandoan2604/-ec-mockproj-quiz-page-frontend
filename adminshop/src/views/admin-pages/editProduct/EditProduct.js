import React from 'react'
import { Button, Card } from 'antd'
import { Input } from 'antd'
import { useLocation } from 'react-router-dom'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'
import { editProduct } from '../../../redux/actions/product'

export default function EditProduct() {
  const editItem = useLocation().state
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: editItem.product,
      brand: editItem.brand,
      category: 'Shoes',
      description: editItem.description,
      price: editItem.price,
      countInStock: editItem.stock,
    },
    onSubmit: (editedData) => {
      dispatch(editProduct(editedData, editItem.id, navigate))
    },
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
        <h1>EDIT PRODUCT</h1>
        <Button type="primary" onClick={formik.handleSubmit}>
          Save
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

          <h3>Description</h3>
          <Input
            name="description"
            value={formik?.values?.description}
            onChange={formik.handleChange}
          />
          <div>
            <h3>Price</h3>
            <Input
              name="price"
              value={formik?.values?.price}
              onChange={formik.handleChange}
            />
          </div>

          <h3>Brand</h3>
          <Input
            name="brand"
            value={formik?.values?.brand}
            onChange={formik.handleChange}
          />

          <h3>Stock quantity</h3>
          <Input
            name="countInStock"
            value={formik?.values?.countInStock}
            onChange={formik.handleChange}
          />
        </Card>
      </div>
    </div>
  )
}
