import { Table, Button, Modal } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getUser, deleteUser } from '../../../redux/actions/user'

const onChange = (pagination, filters, sorter, extra) => {}

export default function UserList() {
  const dispatch = useDispatch()

  const [isShowWarning, setIsShowWarning] = useState(false)
  const [currentId, setCurrentId] = useState(0)

  let users = useSelector((state) => state?.user.users)

  const handleShowDelete = (id) => {
    setCurrentId(id)
    setIsShowWarning(true)
  }

  const handleCancel = () => {
    setIsShowWarning(false)
  }

  const handleDelete = () => {
    handleCancel()
    dispatch(deleteUser(currentId))
  }
  const data = users.map((user) => {
    return {
      id: user.id,
      user: user.username,
      status: user.role,
      verifyEmail: String(user.isEmailVerified),
      verifyContact: String(user.isContactVerified),
      ...user,
    }
  })
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'User',
      dataIndex: 'user',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.user.localeCompare(b.user),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Verify Email',
      dataIndex: 'verifyEmail',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.verifyEmail.localeCompare(b.verifyEmail),
    },
    {
      title: 'Verify Contact',
      dataIndex: 'verifyContact',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.verifyContact.localeCompare(b.verifyContact),
    },
    {
      title: '',
      dataIndex: '',
      key: 'functionality',
      render: (user) => (
        <>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              handleShowDelete(user.id)
            }}
          />
        </>
      ),
    },
  ]

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
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
