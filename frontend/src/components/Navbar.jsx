import React from 'react'
import { BookA, BookOpen, LogOut, User, ShieldUser } from 'lucide-react'
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
    const setUser = context?.setUser || (() => { })
    const accessToken = localStorage.getItem('accessToken')

    const getUserInitials = () => {
        if (user?.username) {
            return user.username.charAt(0).toUpperCase();
        }
        if (user?.email) {
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
        <nav className='fixed top-0 left-0 w-full px-4 py-3 border-b border-gray-300 z-50 backdrop-blur-sm '>

            <div className="max-w-7xl mx-auto px-1 sm:px-4">
                {/* Stacks vertically on mobile (flex-col), side-by-side on larger screens (sm:flex-row) */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 sm:h-12">

                    {/* Top Row on Mobile: Logo Section */}
                    <Link
                        to="/to-notes"
                        className="flex gap-2 items-center hover:opacity-90 transition-opacity shrink-0"
                    >
                        <BookOpen className="h-6 w-6 text-green-700" />
                        <span className="font-bold text-xl text-slate-900">
                            <span className="text-green-600">Notes</span>App
                        </span>
                    </Link>

                    {/* Bottom Row on Mobile: Links + User/Auth Actions */}
                    <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 w-full sm:w-auto">
                        <ul className="flex items-center gap-4 sm:gap-5 text-sm text-slate-800 font-medium">
                            <li>
                                <Link to="/" className="hover:text-green-600 transition-colors hover:underline">
                                    🏚️ Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="hover:text-green-600 transition-colors hover:underline">
                                    🪶 Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-green-600 transition-colors hover:underline">
                                    ❓ About
                                </Link>
                            </li>
                        </ul>

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full cursor-pointer focus:outline-none flex items-center justify-center hover:bg-slate-100 transition-colors select-none">
                                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10 pointer-events-none">
                                        <AvatarImage src={user?.profilePicture} alt="Profile" />
                                        <AvatarFallback className="bg-green-600 text-white font-semibold text-sm uppercase">
                                            {getUserInitials()}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56 mt-2 z-50" align="end">
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">My Account</p>
                                                <p className="text-xs leading-none text-muted-foreground mt-1">
                                                    {user?.email || 'Active User'}
                                                </p>
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

                                    <DropdownMenuItem
                                        onClick={logoutHandler}
                                        className="cursor-pointer text-rose-600 focus:text-rose-700 focus:bg-rose-50 gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Log Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Link
                                    to="/login"
                                    className="text-slate-700 hover:text-green-600 px-2.5 py-1.5 rounded-lg transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-green-600 text-white hover:bg-green-500 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </nav>
    )
}

export default Navbar;
