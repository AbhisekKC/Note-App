import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { userApi } from '@/api/axios'

function ChangePassword() {
  const { email } = useParams()
  const navigate = useNavigate()
  
  // Separate visibility states for each field so they don't toggle together
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = async () => {
    setError('')
    setSuccess('')

    if (!newPassword || !confirmPassword) {
      setError('Please fill all fields!!!')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!!!')
      return
    }

    try {
      setIsLoading(true)
      const res = await userApi.post(`/change-password/${email}`, {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      })
      setSuccess(res.data.message || 'Password Updated!!!')
      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong...')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-100 px-4'>
      <div className='bg-white shadow-md rounded-lg p-5 max-w-md w-full'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>Change Old Password!!</h2>
        <p className='text-sm text-gray-500 text-center mb-4'>
          Set a new password for <span className='font-semibold'>{email}</span>
        </p>

        {error && <p className='text-red-500 text-sm mb-3 text-center'>{error}</p>}
        {success && <p className='text-green-500 text-sm mb-3 text-center'>{success}</p>}

        <div className='space-y-4'>
          {/* New Password Input */}
          <div className='relative flex items-center'>
            <Input
              type={showNewPassword ? 'text' : 'password'}
              placeholder='New password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='pr-10'
            />
            <Button
              type="button"
              variant='ghost'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
              onClick={() => setShowNewPassword(!showNewPassword)}
              disabled={isLoading}
            >
              {showNewPassword ? (
                <EyeOff className='w-4 h-4 text-gray-600' />
              ) : (
                <Eye className='w-4 h-4 text-gray-600' />
              )}
            </Button>
          </div>

          {/* Confirm Password Input */}
          <div className='relative flex items-center'>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='pr-10'
            />
            <Button
              type="button"
              variant='ghost'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className='w-4 h-4 text-gray-600' />
              ) : (
                <Eye className='w-4 h-4 text-gray-600' />
              )}
            </Button>
          </div>

          <Button 
            className='w-full bg-green-600 hover:bg-green-500' 
            disabled={isLoading} 
            onClick={handleChangePassword}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                Changing...
              </>
            ) : (
              'Change password....'
            )}
          </Button>

          <div className='text-center text-sm text-gray-500'>
            <p>
              Remember your password?{' '}
              <span className='text-sm font-bold hover:underline'>
                <Link to={'/login'}>Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
