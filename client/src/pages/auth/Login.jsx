import React from 'react'
import AuthForm from '../../components/Auth/AuthForm'

const Login = () => {
  return (
    <div className='home'>
        <AuthForm isLogin={true} />
    </div>
  )
}

export default Login