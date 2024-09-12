import { Table, Button, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getProducts } from '../../../redux/actions/product'
import { deleteProduct } from '../../../redux/actions/product'

const onChange = (pagination, filters, sorter, extra) => {}

export default function ProductList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isShowWarning, setIsShowWarning] = useState(false)
  const [currentId, setCurrentId] = useState(0)

  let products = useSelector((state) => state?.product.products)
  const handleShowDelete = (id) => {
    setCurrentId(id)
    setIsShowWarning(true)
  }

  const handleCancel = () => {
    setIsShowWarning(false)
  }
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const handleDelete = () => {
    handleCancel()
    dispatch(deleteProduct(currentId))
  }

  let data = products.map((item, index) => {
    return {
      key: index,
      id: item.id,
      product: item.name,
      brand: item.brand,
      stock: item.countInStock,
      price: item.price,
      rating: item.rating,
      description: item.description,
    }
  })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Product',
      dataIndex: 'product',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: '',
      dataIndex: '',
      key: 'functionality',
      render: (item) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              navigate('/admin/edit-product', {
                state: item,
                replace: true,
              })
            }
          />
          <Button
            icon={
              <DeleteOutlined
                onClick={() => {
                  handleShowDelete(item.id)
                }}
              />
            }
          />
        </>
      ),
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <Modal
        visible={isShowWarning}
        onCancel={handleCancel}
        footer={[
          <Button key="signin" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="signup" type="danger" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        Are you sure to delete product #{currentId}
      </Modal>
    </>
  )
}
