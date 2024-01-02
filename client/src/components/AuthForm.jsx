import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, MailFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
  const onFinish = () => {};
  return (
    <div className="flex justify-center items-center h-[80vh] text-[#194F92]">
      <div className="w-[350px] bg-[#ffffffe1] shadow px-10 py-4 rounded-md">
        <h2 className="text-3xl font-semibold my-10">{isLogin ? "Login" : "Register"}</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
            {
                !isLogin &&
                <div className="mb-8">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          </div>
            }
            <div className="mb-8">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email must be filled!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          </div>
          <div className="mb-8">
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          </div>
          <Form.Item>
            <div className="flex justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </div>
          </Form.Item>
          <div className="flex justify-center">
            {
                isLogin ? (
                    <Form.Item>
                    <button className="bg-[#e9a1a4] hover:bg-[#ff9499e3] block py-2 px-3 rounded-md mx-auto">
                      Log in
                    </button>
                    <div className="mt-2">
                      Or <Link to="/register">register now!</Link>
                    </div>
                  </Form.Item>
                ) : (
                    <Form.Item>
                    <button className="bg-[#e9a1a4] hover:bg-[#ff9499e3] block py-2 px-3 rounded-md mx-auto">
                      Register
                    </button>
                    <div className="mt-2">
                      Or <Link to="/login">login now!</Link>
                    </div>
                  </Form.Item>
                )
            }
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
