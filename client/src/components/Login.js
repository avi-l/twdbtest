import React from 'react'
import LoginForm from './LoginForm'

function Login (props) {
  return (
    <div className="flex flex-col items-center relative bottom-[-5pc]">
      <h3 className="text-3xl font-bold mb-4">Log in to Twitter Clone</h3>
      <LoginForm {...props} />
    </div>
  )
}

export default Login