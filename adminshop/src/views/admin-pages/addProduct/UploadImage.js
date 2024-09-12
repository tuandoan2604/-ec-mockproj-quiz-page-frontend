import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, message, Button } from 'antd'

import { storage } from '../../../firebase/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      console.log(reader.result)
      resolve(reader.result)
    }

    reader.onerror = (error) => reject(error)
  })

const UploadImage = ({ setImages }) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }

  const handleChange = ({ fileList: newFileList }) => {
    const alterList = newFileList.map((img) => {
      img.status = 'done'
      img.percent = 100
      return img
    })
    setFileList(alterList)
  }

  const handleBeforeUpload = (file) => {
    const isImage = file.type.indexOf('image/') === 0
    if (!isImage) {
      message.error('You can only upload image file!')
    }

    return isImage
  }
  const handleImageUpload = () => {
    Promise.all(
      fileList.map(async (file) => {
        const imageRef = ref(
          storage,
          `shoesImages/${file.originFileObj.name + v4()}`
        )
        try {
          const image = await uploadBytes(imageRef, file.originFileObj)
          const url = await getDownloadURL(image.ref)
          setImages((prev) => [...prev, url])
        } catch (e) {
          console.log(e.message)
        }
      })
    )
    message.success('Successfully upload images!')
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </div>
  )
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
        multiple={true}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
      <Button onClick={handleImageUpload}>Upload</Button>
    </>
  )
}

export default UploadImage
