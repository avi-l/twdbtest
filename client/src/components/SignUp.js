import React from 'react'
import SignUpForm from './SignUpForm'

function SignUp (props) {
  return (
    <div className="flex flex-col items-center relative bottom-[-5pc]">
      <h3 className="text-3xl font-bold mb-4">Create your account</h3>
      <SignUpForm {...props} />
    </div>
  )
}

export default SignUp