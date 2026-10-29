import React from 'react'
import { BookA, BookOpen, LogOut, User , ShieldUser } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button' 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserContext } from '@/context/userContext'
import { useContext } from 'react'
import { toast } from 'sonner'

import { userApi } from '@/api/axios'

function Navbar() {
    const navigate = useNavigate()
    const context = useContext(UserContext)
    const user = context?.user || null
    const setUser = context?.setUser || (() => {})
    const accessToken = localStorage.getItem('accessToken')

    const getUserInitials = () =>{
        if(user?.username) {
            return user.username.charAt(0).toUpperCase();
        }
        if(user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
    }

    const logoutHandler = async () => {
        try {
            const res = await userApi.post(`/logout`, {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            if (res.data.success) {
                setUser(null)
                toast.success('Logged out successfully!!')
                localStorage.clear()
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong during logout.')
        }
    }

    return (
        <nav className='fixed top-0 left-0 w-full p-4 border-b border-gray-300 z-50 backdrop-blur-sm '>
            <div className='max-w-7xl mx-auto px-1 sm:px-2 lg:px-2 '>
                <div className='flex justify-between items-center h-12'>
                    {/* Logo Section */}
                <Link to="/to-notes" className='flex gap-2 items-center hover:opacity-90 transition-opacity shrink-0' >
                    <BookOpen className='h-6 w-6 text-green-700' />
                    <h1 className='font-bold text-xl text-slate-900'><span className='text-green-600'>Notes</span>App</h1>
                </Link>

                {/* Navigation Links */}
                <div className='flex gap-7 items-center'>
                    <ul className='flex gap-2 items-center text-sm text-slate-800 font-medium'>
                        <li>
                            <Link to="/" className='hover:text-green-600 transition-colors cursor-pointer hover:underline'>🏚️Home</Link>
                        </li>
                        <li className='hover:text-green-600 transition-colors cursor-pointer'>
                            <Link to="/features" className='hover:text-green-600 transition-colors cursor-pointer hover:underline'>Features</Link>
                        </li>
                        
                        <li className='hover:text-green-600 transition-colors cursor-pointer hover:underline'>
                            <Link to="/about" className='hover:text-green-600 transition-colors'>About</Link>
                        </li>
                        
                        {user ? (
                            <li className="list-none flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="relative h-10 w-10 rounded-full cursor-pointer focus:outline-none flex items-center justify-center hover:bg-slate-50 transition-colors select-none">
                                        <Avatar className="h-10 w-10 pointer-events-none">
                                            <AvatarImage src="https://github.com" alt="Profile" />
                                            <AvatarFallback className='bg-green-600 text-white font-semibold text-sm uppercase select-none pointer-events-none'>
                                               {getUserInitials()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    
                                    <DropdownMenuContent className="w-56 mt-2 z-50" align="end">
                                        {/* CHOICE 1: Wrapped the validation context labels inside a group */}
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel className="font-normal">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">My Account</p>
                                                    <p className="text-xs leading-none text-muted-foreground mt-1">{user?.email || 'Active User'}</p>
                                                </div>
                                            </DropdownMenuLabel>
                                        </DropdownMenuGroup>
                                        
                                        <DropdownMenuSeparator />
                                        
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => navigate('/profile')}>
                                                <User className="h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => navigate('/admin')}>
                                                <ShieldUser className="h-4 w-4" /> 
                                                <span>Admin Dashboard</span>
                                            </DropdownMenuItem>
                                            
                                            <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => navigate('/to-notes')}>
                                                <BookA className="h-4 w-4" /> 
                                                <span>Notes</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        
                                        <DropdownMenuSeparator />
                                        
                                        <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer text-rose-600 focus:text-rose-700 focus:bg-rose-50 gap-2">
                                             <LogOut className="h-4 w-4" />  
                                             <span>Log Out!</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        ) : (
                            <li className='flex flex-col items-center gap-1'>
                                <Link to='/login' className='bg-green-600 text-white hover:bg-green-500 px-1 py-2 rounded-lg transition-colors shadow-sm'>
                                    LogIn.
                                </Link>
                                <Link to='/signup'className='bg-green-600 text-white hover:bg-green-500 px-1 py-2 rounded-lg transition-colors shadow-sm'>
                                    SignUp.
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>

                </div>
                
                

            </div>
        </nav>
    )
}

export default Navbar;
