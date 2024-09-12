import React, { useState } from 'react'
import { Card } from 'antd'
import { Input, Upload, Select, Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { Option } = Select

export default function AddProduct() {
  const [statusValue, setStatusValue] = useState(1)
  const [verifyEmailValue, setVerifyEmailValue] = useState(1)
  const [verifyContactValue, setVerifyContactValue] = useState(1)
  return (
    <div>
      <h1>CREATE USER</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Card
          title="User information"
          style={{
            width: '720px',
            marginRight: '25px',
          }}
        >
          <h3>Name</h3>
          <Input />

          <h3>Email</h3>
          <Input />

          <h3>Password</h3>
          <Input />

          <h3>Retype password</h3>
          <Input />

          <h3>Role</h3>
          <Select
            defaultValue="Customer"
            style={{
              width: 120,
            }}
          >
            <Option value="customer">Customer</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Card>
        <div>
          <Card
            title="Avatar"
            style={{
              width: '520px',
            }}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Card>
          <Card
            title="Another info"
            style={{
              width: '520px',
            }}
          >
            <h3>Contact</h3>
            <Input />
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '50px',
                }}
              >
                <h3>Status</h3>
                <Radio.Group
                  onChange={(e) => {
                    setStatusValue(e.target.value)
                  }}
                  value={statusValue}
                >
                  <Radio value={1}>Active</Radio>
                  <Radio value={2}>Disable</Radio>
                </Radio.Group>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '50px',
                }}
              >
                <h3>Verify email</h3>
                <Radio.Group
                  onChange={(e) => {
                    setVerifyEmailValue(e.target.value)
                  }}
                  value={verifyEmailValue}
                >
                  <Radio value={1}>Active</Radio>
                  <Radio value={2}>Disable</Radio>
                </Radio.Group>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '50px',
                }}
              >
                <h3>Verify contact</h3>
                <Radio.Group
                  onChange={(e) => {
                    setVerifyContactValue(e.target.value)
                  }}
                  value={verifyContactValue}
                >
                  <Radio value={1}>Active</Radio>
                  <Radio value={2}>Disable</Radio>
                </Radio.Group>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
