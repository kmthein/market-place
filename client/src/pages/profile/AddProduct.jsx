import { Form, Input } from 'antd'
import React from 'react'

const AddProduct = () => {
  return (
    <div>
        <h1>What you want to sell?</h1>
        <Form layout='vertical'>
        <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>
        </Form>
    </div>
  )
}

export default AddProduct