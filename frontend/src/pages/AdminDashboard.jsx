import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, ShieldAlert, Users, BookOpen, Activity, ShieldCheck, UserPlus, Trash2, X, User } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

export default function AdminDashboard() {
    const [metrics, setMetrics] = useState({ totalUsers: 0, totalNotes: 0, activeAdminCount: 1 })
    const [usersList, setUsersList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //Modal states for adding a user
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [newUserData, setNewUserData] = useState({ username: '', email: '', role: 'user' })

    useEffect(() => {
        // Mock data baseline for initial UI rendering check
        setUsersList([
            { _id: '1', username: 'AbhisekKC', email: 'abseekksee08@gmail.com', role: 'admin', createdAt: '2026-01-15' },
            { _id: '2', username: 'JohnDoe', email: 'john@example.com', role: 'user', createdAt: '2026-03-22' },
            { _id: '3', username: 'JaneSmith1', email: 'jane1@example.com', role: 'user', createdAt: '2026-05-10' },
            { _id: '4', username: 'JaneSmith2', email: 'jane2@example.com', role: 'user', createdAt: '2026-05-10' },
            { _id: '5', username: 'JaneSmith3', email: 'jane3@example.com', role: 'user', createdAt: '2026-05-10' },
        ]);
        setMetrics({ totalUsers: 5, totalNotes: 142, activeAdminCount: 1 });

        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [])

    // to handle role change
    const handleRoleToggle = (userId, currentRole) => {
        const nextRole = currentRole === 'admin' ? 'user' : 'admin';

        // 1. Update the user list
        setUsersList(prev => prev.map(u => u._id === userId ? { ...u, role: nextRole } : u));

        // 2. Dynamically adjust the activeAdminCount metric
        setMetrics(prev => ({
            ...prev,
            activeAdminCount: nextRole === 'admin' ? prev.activeAdminCount + 1 : prev.activeAdminCount - 1
        }));

        toast.success(`User access configuration updated to ${nextRole}!`);
    }

    //handles eliminating a user profile record from state
    const handleDeleteUser = (userId, userRole) => {
        setUsersList(prev => prev.filter(u => u._id !== userId));

        setMetrics(prev => (
            {
                ...prev,
                totalUsers: prev.totalUsers - 1,
                activeAdminCount: userRole === 'admin' ? prev.activeAdminCount - 1 : prev.activeAdminCount
            }))
        toast.error('User profile deleted successfully');


    }

    //handles injecting a new mock user profile into the state
    const handleAddUserSubmit = (e) => {
        e.preventDefault()
        if (!newUserData.username || !newUserData.email) {
            toast.error('Please fill out all mandatory identity metrics fields.')
            return;
        }

        const newUser = {
            _id: Date.now().toString(),
            username: newUserData.username,
            email: newUserData.email,
            role: newUserData.role,
            createdAt: new Date().toISOString().split('T')[0]
        }
        setUsersList(prev => [...prev, newUser])
        setMetrics(prev => (
            {
                ...prev,
                totalUsers: prev.totalUsers + 1,
                activeAdminCount: newUser.role === 'admin' ? prev.activeAdminCount + 1 : prev.activeAdminCount
            }))
        toast.success(`New profile verified for ${newUser.username}!`);
        setIsAddModalOpen(false)
        setNewUserData({ username: '', email: '', role: 'user' });

    }

    return (
        <div className='w-full min-h-screen flex-1 flex flex-col p-6 bg-slate-100'>
            <div className='max-w-6xl w-full mx-auto space-y-6'>

                {/* Header Block Control Matrix */}
                <div className='flex items-center gap-3 border-b bg-linear-to-l from-green-200 to-white pb-4'>
                    <ShieldAlert className='h-8 w-8 text-indigo-600 shrink-0' />
                    <div>
                        <h1 className='text-3xl font-bold text-slate-800 tracking-tight'>Admin Panel.</h1>
                        <p className='text-sm text-slate-500'>Monitor MERN stack metrics data and manage system control access parameters.</p>
                    </div>
                </div>


                {/* Data Cards Layer Grid */}
                {isLoading ? (
                    <div className='flex-1 w-full flex items-center justify-center min-h-100'>
                        <Loader2 className='h-10 w-10 animate-spin text-slate-600' />
                    </div>
                ) : (
                    <div className='max-w-6xl w-full mx-auto space-y-6'>

                        {/* Updated Grid for 3 cards */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                            <div className='bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between'>
                                <div>
                                    <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Total Registered Users</p>
                                    <h3 className='text-3xl font-bold text-slate-900 mt-1'>{metrics.totalUsers}</h3>
                                </div>
                                <div className='bg-blue-50 p-3 rounded-xl text-blue-500'><Users className='h-6 w-6' /></div>
                            </div>

                            <div className='bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between'>
                                <div>
                                    <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Global Notes Written</p>
                                    <h3 className='text-3xl font-bold text-slate-900 mt-1'>{metrics.totalNotes}</h3>
                                </div>
                                <div className='bg-green-50 p-3 rounded-xl text-green-600'><BookOpen className='h-6 w-6' /></div>
                            </div>

                            <div className='bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between'>
                                <div>
                                    <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Active Administrator Profiles</p>
                                    <h3 className='text-3xl font-bold text-slate-900 mt-1'>{metrics.activeAdminCount}</h3>
                                </div>
                                <div className='bg-purple-50 p-3 rounded-xl text-purple-600'><Activity className='h-6 w-6' /></div>
                            </div>
                        </div>

                        {/* User Management System Table */}
                        <div className='bg-linear-to-l from-green-200 to-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
                            <div className='p-5 border-b border-slate-100 bg-slate-50/50'>
                                <h3 className='font-bold text-slate-800 text-lg'>System User Registry!</h3>
                            </div>
                            <div className='overflow-x-auto'>
                                <table className='w-full text-left border-collapse text-sm'>
                                    <thead>
                                        <tr className='bg-slate-50 text-slate-600 font-semibold border-b border-slate-200'>
                                            <th className='p-4'>Username</th>
                                            <th className='p-4'>Email Address</th>
                                            <th className='p-4'>Roles</th>
                                            <th className='p-4 text-center'>Management Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {usersList.length === 0 ?
                                            (<tr className='hover:bg-slate-50/70 transition-colors border-b border-slate-100 last:border-0'>
                                                <td colSpan='4' className='p-4 font-medium text-slate-900'>
                                                    No registered database users exist currently.
                                                </td>
                                            </tr>)
                                            :
                                            (
                                                usersList.map((account) => (
                                                    <tr key={account._id} className='hover:bg-slate-50/70 transition-colors border-b border-slate-100 last:border-0'>
                                                        <td className='p-4 font-medium text-slate-900'>{account.username}</td>
                                                        <td className='p-4 text-slate-600'>{account.email}</td>
                                                        <td className='p-4'>
                                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${account.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                                                                {account.role}
                                                            </span>
                                                        </td>
                                                        <td className='p-4 text-center'>
                                                            <Button
                                                                onClick={() => handleRoleToggle(account._id, account.role)}
                                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer bg-white ${account.role === 'admin' ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-red-200 text-red-600 hover:bg-red-50'}`}>
                                                                <ShieldCheck className='h-3.5 w-3.5' />
                                                                {account.role === 'admin' ? 'Demote User' : 'Make Admin'}
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleDeleteUser(account._id, account.role)}
                                                                className='inline-flex items-center justify-center gap-1.5
                                                                   px-3 py-1.5 rounded-lg border  border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all bg-white cursor-pointer shadow-2xs '
                                                            >
                                                                <Trash2 className='h-4 w-4' />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}

                                    </tbody>
                                </table>
                            </div>
                        </div>


                        {/* Add User Model dialog wrapper */}
                        {!isLoading && (
                            <Button
                                onClick={() => setIsAddModalOpen(true)}
                                className='inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-xs cursor-pointer'
                            >
                                <UserPlus className='h-4 w-4' />
                                Add System User
                            </Button>
                        )}

                        {
                            isAddModalOpen && (
                                <div className='bg-linear-to-l from-green-200 to-white flex itesm-center justify-center rounded-xl shadow-sm border border-slate-200 backdrop-blur-xs p-4 animate-fade-in'>
                                    <div className='w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hiiden transform scale-100 transition-transform'>
                                        {/* Modal Header */}
                                        <div className='p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50'>
                                            <h3 className='font-bold text-slate-800 text-lg'>Register New Authorization Profile.</h3>
                                            <Button
                                                onClick={() => setIsAddModalOpen(false)}
                                                className='p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer'
                                            >
                                                <X className='h-4 w-5' />
                                            </Button>
                                        </div>
                                        {/* Modal Input Form */}
                                        <form onSubmit={handleAddUserSubmit} className='p-5 space-y-5'>
                                            {/* Username Field */}
                                            <div className='space-y-1'>
                                                <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Username</label>
                                                <Input
                                                    type='text'
                                                    required
                                                    placeholder='e.g. RockStarDev'
                                                    value={newUserData.username}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, username: e.target.value }))}
                                                    className='w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50'
                                                />
                                            </div>

                                            {/* Email Field */}
                                            <div className='space-y-1'>
                                                <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Eamil</label>
                                                <Input
                                                    type='email'
                                                    required
                                                    placeholder='e.g. dev@stack.com'
                                                    value={newUserData.email}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                                                    className='w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50'
                                                />
                                            </div>

                                            {/* Role Dropdown */}
                                            <div className='space-y-1'>
                                                <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Role Privilege.</label>
                                                <select
                                                    value={newUserData.role}
                                                    onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value }))}
                                                    className='w-full px-3.5 py-2 border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50/50'
                                                >
                                                    <option value='user'>👤 User</option>
                                                    <option value='admin'>🛡️ Admin</option>
                                                </select>

                                            </div>

                                            {/* Form Action Controls */}
                                            <div className='flex gap-3 pt-3 border-t border-slate-100 justify-end'>
                                                <Button
                                                    type='submit'
                                                    className='px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition:colors cursor-pointer shadow-xs'

                                                >Register.</Button>
                                                <Button
                                                    type='buton'
                                                    onClick={() => setIsAddModalOpen(false)}
                                                    className='px-4 py-2 border border-slate-300 text-white hover:text-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer'
                                                >Cancel</Button>


                                            </div>



                                        </form>

                                        <div>

                                        </div>
                                    </div>

                                </div>
                            )
                        }

                    </div>
                )}
            </div>
        </div>
    )
}
