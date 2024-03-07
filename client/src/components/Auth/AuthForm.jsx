import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import {
  LockOutlined,
  MailFilled,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser, registerUser } from "../../api/auth";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const AuthForm = ({ isLogin }) => {
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setSubmitting(true);
    if (isLogin) {
      try {
        const response = await loginUser(values);
        if (response.success) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(setUser({token: response.token, user: response.userDoc}));
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.success) {
          message.success(response.message);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-[80vh] pt-8 2xl:mt-0">
      <div className="w-[350px] bg-[#ffffffe7] shadow px-10 py-4 rounded-md">
        <h2 className="text-3xl font-semibold my-10">
          {isLogin ? "Login" : "Register"}
        </h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {!isLogin && (
            <div className="mb-8">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                  {
                    min: 3,
                    message: "Name must be at least 3 characters.",
                  },
                ]}
                hasFeedback
              >
                <Input prefix={<UserOutlined />} placeholder="Name" />
              </Form.Item>
            </div>
          )}
          <div className="mb-8">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email must be filled!",
                },
                {
                  type: "email",
                  message: "Please enter valid email.",
                },
              ]}
              hasFeedback
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
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
                {
                  min: 3,
                  message: "Password must be at least 3 characters.",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="text"
                placeholder="Password"
              />
            </Form.Item>
          </div>
          <Form.Item>
            <div className="flex justify-between">
              <Form.Item name="remember" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a>Forgot password</a>
            </div>
          </Form.Item>
          <div className="flex justify-center">
            {isLogin ? (
              <Form.Item>
                <button className="bg-[#cf8e9c] hover:bg-[#df7e83e3] hover:-rotate-2 block h-10 w-16 rounded-md mx-auto">
                  {submitting ? (
                    <ThreeDots
                      visible={true}
                      color="#fff"
                      height="35"
                      width="35"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{
                        marginLeft: "15px"
                      }}
                      wrapperClass=""
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="mt-4">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-600 font-mediun">
                    register now
                  </Link>
                </div>
              </Form.Item>
            ) : (
              <Form.Item>
                <button className="bg-[#cf8e9c] hover:bg-[#df7e83e3] block h-10 w-20 rounded-md mx-auto">
                {submitting ? (
                    <ThreeDots
                      visible={true}
                      color="#fff"
                      height="35"
                      width="35"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{
                        marginLeft: "15px"
                      }}
                      wrapperClass=""
                    />
                  ) : (
                    "Register"
                  )}
                </button>
                <div className="mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 font-mediun">
                    login now
                  </Link>
                </div>
              </Form.Item>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
