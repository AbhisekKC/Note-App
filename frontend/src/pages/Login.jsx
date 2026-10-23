import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from "lucide-react"
import {userApi} from "@/api/axios.js"
import { toast } from 'sonner'
import { useNavigate , Link } from 'react-router-dom'
import { getData } from "@/context/userContext"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import googleLogin
import { GoogleLogin } from "@react-oauth/google"

function Login() {
  const {setUser} = getData()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  //--Google login oauth handlers
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
       //1. dispatch the encrpyted id token onto your backend endpoint controller
       const res = await userApi.post('/google-login',{
        idToken: credentialResponse.credential
       });
       if(res.data.success){
        toast.success('Logged in with Google Successfully!');
        localStorage.setItem('accessToken' , res.data.accessToken);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        setUser(res.data.user)
        navigate('/');
       }

    } catch (error) {
       console.error('Google Auth Error',error)
       toast.error(error.response?.data?.message || 'Google Authentication Failed!!') 
    } finally{
      setIsLoading(false);
    }
  }

  const handleGoogleError = () =>{
    toast.error('Google verification prompt was closed or rejected!!!')

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       setIsLoading(true); // 1. Start loading indicator
       const res = await userApi.post(`/login`, formData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token from localStorage
        }
       });
       if (res.data.success){
        toast.success('Logged in successfully!');
       
       localStorage.setItem('accessToken', res.data.accessToken)
       localStorage.setItem('userData', JSON.stringify(res.data.user))
       setUser(res.data.user)
       }
        navigate('/');
       
        
    }
    catch (error) {
      console.error('Error during login:', error);
      toast.error('Failed to log in. Please try again.');
    }
    finally {
      setIsLoading(false); // 2. Stop loading indicator regardless of success/error
    }
  }

  return (
    <div className='relative w-full h-screen bg-green-100 overflow-hidden flex items-center justify-center p-4'>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl text-green-600'>Sign in to your Account</CardTitle>
          <CardDescription>Enter your details below to login....</CardDescription>
          <div className="pt-2">
            Don't have an Account?
            <Button variant="link" type="button" disabled={isLoading} >
              <Link to="/signup" className='font-bold'>Sign Up.</Link>
            </Button>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <CardContent>
            <div className="flex flex-col gap-6">
              
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
                  disabled={isLoading} // Prevent modification during submission
                />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                <div className='relative'>
                  <Input 
                    id="password" 
                    name='password' 
                    placeholder='enter your password'
                    value={formData.password} 
                    onChange={handleInputChange} 
                    type={showPassword ? "text" : "password"} 
                    required 
                    disabled={isLoading} // Prevent modification during submission
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
                <Link to='/forgot-password'>Forgot your Password?</Link>
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
                  Signing In...
                </>
              ) : 'Sign In'}
            </Button>
            {/* MODERN ACCENT SEPARATOR SPLIT LINE */}
            <div className="w-full flex items-center justify-between text-[11px] font-bold uppercase text-slate-400 select-none py-1">
                <div className="border-b flex-1 border-slate-200"></div>
                <span className="px-3 tracking-wider">Or continue with</span>
                <div className="border-b flex-1 border-slate-200"></div>
            </div>

            {/* DYNAMIC OFFICIAL GOOGLE INTERACTIVE POPUP BUTTON */}
            <div className="w-full flex flex-col items-center justify-center overflow-hidden px-1 ">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                uxMode='redirect'
                theme="filled_blue"
                shape="pill"
                text="signin_with"
                
                useOneTap={false}  // Matches the width parameter bounds of max-w-md Card layouts perfectly
              />
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login;
