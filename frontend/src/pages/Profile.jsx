import React from 'react'
import { useContext } from 'react'
import {  UserContext } from '@/context/userContext'
import {  Mail, CalendarDays, Clock , ShieldCheck, ShieldAlert, KeyRound, FileQuestion, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const user = context?.user || null

    const getInitials = () => {
        if (user?.username) return user.username.charAt(0).toUpperCase();
        if (user?.email) return user.email.charAt(0).toUpperCase();
        return 'U'; // FIXED: Added an explicit fallback character to avoid printing undefined
    }

    const joinDate = user?.createdAt ? 
       new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Recently';
    const lastLoginTime = user?.lastLogin ?
     new Date(user.lastLogin).toLocaleDateString('en-US',{month:'short' ,day: 'numeric', hour:'2-digit', minute:'2-digit'})
     : ' Just Now!!'

    return (
        <div className='bg-linear-to-l from-green-200 to-white min-h-screen py-10 px-4 flex justify-center items-start'>
            <div className='w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-6 mb-20'>
                
                {/* Header accent bar */}
                {/* FIXED: Adjusted absolute positioning offset to align Avatar properly without overlapping content */}
                <div className='bg-linear-to-r from-emerald-600 to-green-600 h-32 w-full relative'>
                    <div className='absolute -bottom-10 left-8 z-10'>
                        <Avatar className='h-24 w-24 border-4 border-white shadow-md'>
                            <AvatarFallback className='bg-slate-800 text-white font-bold text-2xl uppercase select-none'>
                                {getInitials()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* Details panel */}
                {/* FIXED: Increased top padding (pt-14) so the absolute overlay Avatar does not overlap header text */}
                <div className='bg-linear-to-l from-green-200 to-white pt-14 p-8'>
                    <div className='border-b pb-4'>
                        {/* FIXED: Swapped layout tags to inline blocks to prevent severe vertical text distortion */}
                        <div className='flex flex-wrap items-center gap-2 mb-2'>
                            <h1 className='text-2xl font-bold text-slate-900'>
                                {user?.username || 'Active User.'}
                            </h1>
                            {/* FIXED: Added optional chaining (?.) protection wrapper block */}
                            {user?.isVerified ? (
                                <span className='inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200'>
                                    <ShieldCheck className='h-3.5 w-3.5' /> Verified
                                </span>
                            ) : (
                                <span className='inline-flex items-center gap-1 text-xs font-semibold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200'>
                                    <ShieldAlert className='h-3.5 w-3.5' /> Not Verified yet
                                </span>
                            )}
                            Admin//User
                            <User />    
                        </div>
                        <p className='text-sm text-slate-500 mt-0.5'>
                            Manage your secure cloud Account parameters.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6'>
                        <div className='flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100'>
                            <Mail className='h-5 w-5 text-slate-500 shrink-0' />
                            <div>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5'>Email Address</p>
                                {/* FIXED: Corrected spelling to 'break-all' and mapped user?.email instead of user?.username duplicate */}
                                <p className='text-sm font-medium text-slate-800 break-all'>{user?.email || 'N/A'}</p>
                            </div>
                        </div>
                        {/* CREATION TIMESTAMPS CARD */}
                        <div className='flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100'>
                            <CalendarDays className='h-5 w-5 text-slate-500 shrink-0' />
                            <div>
                                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5'>Member Since</p>
                                <p className='text-sm font-medium text-slate-800'>{joinDate}</p>
                            </div>
                        </div>
                        {/* NEW: DYNAMIC GOOGLE LOGIN TIMESTAMP CARD LAYER */}
                        <div className='flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100'>
                            <Clock className='h-4 w-4 text-emerald-600 shrink-0 animate-pulse' />
                            <div>
                                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5'>Last Active</p>
                                <p className='text-xs font-semibold text-emerald-700'>{lastLoginTime}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Panel Buttons Matrix */}
                    <div className='mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row gap-3 justify-between items-center w-full'>
                        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                            <Button
                                variant='outline'
                                className='text-slate-600 border-slate-200 text-xs gap-2 font-medium cursor-pointer shadow-sm'
                                onClick={() => {
                                      if(window.confirm('Do you want to goto the change password page?')){
                                        navigate(`/change-password/${encodeURIComponent(user?.email || '')}`)
                                      }
                                }}
                            >
                                <KeyRound className='h-3.5 w-3.5 text-slate-400' />Change Password
                            </Button>
                            <Button
                                variant='outline'
                                className='text-slate-600 border-slate-200 text-xs gap-2 font-medium cursor-pointer shadow-sm'
                                onClick={() => {
                                      if(window.confirm('Do you want to goto the forgot-password page?')){
                                        navigate(`/forgot-password/`)
                                      }
                                }}
                            >
                                <FileQuestion className='h-3.5 w-3.5 text-slate-400' />Forgot Password
                            </Button>
                        </div>
                        
                        <Button
                            className='w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm cursor-pointer shadow-sm shadow-emerald-100'
                            onClick={() => navigate(`/to-notes`)}
                        >
                            Open Notes Workspace
                        </Button>
                    </div>

                </div>
               
            </div>
        </div>
    )
}

export default Profile;
