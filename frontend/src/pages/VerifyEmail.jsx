import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'

function VerifyEmail() {
  return (
    <div className='relative w-full min-h-screen overflow-hidden bg-green-200'>
      <div className='flex flex-col items-center justify-center min-h-screen px-4'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
          <h1 className='text-3xl font-bold text-green-700 mb-4'>Verify Your Email ✅</h1>
          
          <p className='text-lg text-gray-700 mb-6'>
            A verification link has been sent to your email. Please check your inbox and click the link to verify your account.
          </p>
          
          {/* Replaced raw link with a cleaner button-style layout */}
          <div className="flex justify-center mb-6">
            <a 
              href='https://google.com/mail' 
              target='_blank' 
              rel='noopener noreferrer' 
              className='inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition duration-200 gap-2'
            >
              <span>Go to Gmail</span>
              <FontAwesomeIcon icon={faGoogle}  />
              <FontAwesomeIcon icon={faEnvelope}  />
            </a>
          </div>

          <p className='text-sm text-gray-500 leading-relaxed'>
            If you haven't received the email, please check your spam folder or{' '}
            <a href="/resend-verification" className='text-green-600 underline font-medium hover:text-green-700'>
              resend the verification email
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
