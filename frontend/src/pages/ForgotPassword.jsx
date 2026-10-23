import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@base-ui/react/button'
import { Input } from '@base-ui/react/input'
import { CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {userApi} from '@/api/axios'
import { toast } from 'sonner' // Ensure your toast library is imported

function ForgotPassword() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setIsLoading(true)
      
      const res = await userApi.post(`/forgot-password`, { email })
      
      if (res.data) {
        setIsSubmitted(true)
        toast.success(res.data.message || 'Reset link sent!')
        navigate(`/verify-otp/${email}`)
        setEmail('')
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // This outer container handles full screen centering across all devices
    <div className='min-h-screen w-full bg-green-100 flex items-center justify-center p-4 overflow-y-auto'>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className='text-3xl font-bold tracking-tight text-green-600'>Reset your password.</h1>
          <p className='text-gray-600'>Enter your email address and we'll send you instructions to reset your password.</p>
        </div>

        <Card className='bg-white shadow-xl rounded-2xl'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center text-green-600'>Forgot Password</CardTitle>
            <CardDescription className='text-center'>
              {isSubmitted 
                ? 'Check your email for reset instructions.' 
                : 'Enter your Email to get a password reset link.'}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4'>
            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitted ? (
              <div className='py-6 flex flex-col items-center justify-center text-center space-y-4'>
                <div className="bg-primary/10 rounded-full p-3">
                  <CheckCircle className='h-6 w-6 text-primary' />
                </div>
                <div className='space-y-2'>
                  <h3 className='font-medium text-lg'>Check your inbox.</h3>
                  <p className='text-muted-foreground'>
                    Password reset link has been sent to your <span className='font-medium text-foreground'>{email}</span>
                  </p>
                  <p className='text-sm'>
                    Check your SPAM if you didn't receive your email or{' '}
                    <button 
                      type="button" 
                      className='hover:underline font-medium text-red-600 cursor-pointer' 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Try again!
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className='space-y-4 px-6'>
                <div className='w-full space-y-2 relative text-gray-800'>
                  <Label>Email</Label>
                  <Input 
                    className='w-full border-2 p-2 rounded-md' 
                    type='email' 
                    placeholder='Enter your email....' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    disabled={isLoading} 
                  />
                </div>
                <Button 
                  type="submit"
                  className='w-full border-2 rounded-md bg-green-600 text-white relative hover:bg-green-500 cursor-pointer py-2 flex items-center justify-center font-medium transition-colors'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                      Sending reset link....
                    </>
                  ) : (
                    'Send reset Link'
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className='flex justify-center border-t pt-4 text-sm text-gray-600'>
            <p>Remember your password?{' '}</p>
            <div className='pl-1'>
              <Link className='text-green-600 hover:underline font-medium' to={'/login'}>
                Login..
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword
