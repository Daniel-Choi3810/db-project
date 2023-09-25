import SignUpForm from '@/components/SignUpForm'
import React from 'react'

export default function SignUpPage() {
  return (
    <div className='flex flx-col gap-4'>
      <h1 className='text-3xl'>SignUp Page</h1>
      <SignUpForm />
    </div>
  )
}
