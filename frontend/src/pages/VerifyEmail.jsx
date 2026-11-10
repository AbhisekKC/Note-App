import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { userApi } from '@/api/axios.js'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

function VerifyEmail() {
  const email = localStorage.getItem('email')
  const [isLoading, setIsloading] = useState(false)

  const handleSendEmailAgain = async () => {
    setIsloading(true)
    try {
      const res = await userApi.post('/resend-verification-email', { email });
      if (res) { toast.success(res.data.message) }

    } catch (error) {
      toast.error(error.message)

    } finally {
      setIsloading(false)
    }

  }

  return (
    <div className='relative w-full min-h-screen overflow-hidden bg-green-200'>
      <div className='flex flex-col items-center justify-center min-h-screen px-4'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
          <h1 className='text-3xl font-bold text-green-700 mb-4'>Verify Your Email ✅</h1>

          <p className='text-lg text-gray-700 mb-6'>
            A verification link has been sent to your email <span className='font-bold '>{email}</span> . Please check your inbox and click the link to verify your account.
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
              <FontAwesomeIcon icon={faGoogle} />
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>

          <p className='flex flex-col items-center text-center text-sm text-gray-500 leading-relaxed'>
            If you haven't received the email, please check your spam folder or{' '}
            {
              isLoading ?


                <Loader2 className='w-8 h-8 text-green-600   animate-spin' />
                :
                <button
                  onClick={handleSendEmailAgain}
                  className='text-green-600 underline font-medium hover:text-green-700 cursor-pointer'
                >
                  resend the verification email
                </button>


            }

          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
