import React from 'react'
import AuthForm from '../../components/Auth/AuthForm'

const Register = () => {
  return (
    <div className='home'>
        <AuthForm isLogin={false} />
    </div>
  )
}

export default Register