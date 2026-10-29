import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from "lucide-react"
import  {userApi}  from "@/api/axios"
import { toast } from 'sonner'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const res = await userApi.post(`/register`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Handle server-side success flags gracefully
      if (res.data.success) {
        toast.success('Account created successfully! Please log in.');
        
        // Safely extract and save token if present
        const token = res.data.token;
        if (token) {
          localStorage.setItem('token', token);
        }

        navigate('/verify');
      } else {
        // Handle cases where the API returns 200 but success is false
        toast.error(res.data.message || 'Failed to create account.');
      }
        
    }
    catch (error) {
      console.error('Error during signup:', error);
      // Fallback to extract backend message if available (e.g., error.response.data.message)
      const errorMsg = error.response?.data?.message || 'Failed to create account. Please try again.';
      toast.error(errorMsg);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='relative w-full h-screen bg-green-100 overflow-hidden flex items-center justify-center p-4'>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl text-green-600'>Sign Up for an Account</CardTitle>
          <CardDescription>Enter your details below to create an account.</CardDescription>
          <div className="pt-2">
            Already have an existing Account?
            <Button variant="link" type="button" disabled={isLoading}>
              <Link to="/login" className='font-bold'>Sign In.</Link>
            </Button>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full name</Label>
                <Input 
                  id="fullname" 
                  name='username' 
                  value={formData.username} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  type="email" 
                  placeholder="m@example.com" 
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className='relative'>
                  <Input 
                    id="password" 
                    name='password' 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    type={showPassword ? "text" : "password"} 
                    required 
                    disabled={isLoading}
                  />
                  <Button 
                    type="button" 
                    variant='ghost' 
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent' 
                    onClick={() => setShowPassword(!showPassword)} 
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className='w-4 h-4 text-gray-600' />
                    ) : (
                      <Eye className='w-4 h-4 text-gray-600' />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-500" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Creating Account...
                </>
              ) : 'Create Account'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Signup;
