import { Loader2, ShieldAlert, Users, BookOpen, Activity } from 'lucide-react'
import React, { useState, useEffect } from 'react'

function AdminDashboard() {
    const [metrics, setMetrics] = useState({ totalUsers: 0, totalNotes: 0, activeAdminCount: 1 })
    const [usersList, setUsersList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        // Mock data baseline for initial UI rendering check
        setUsersList([
            { _id: '1', username: 'AbhisekKC', email: 'abseekksee08@gmail.com', role: 'admin', createdAt: '2026-01-15' },
            { _id: '2', username: 'JohnDoe', email: 'john@example.com', role: 'user', createdAt: '2026-03-22' },
            { _id: '3', username: 'JaneSmith', email: 'jane@example.com', role: 'user', createdAt: '2026-05-10' },
        ]);
        setMetrics({ totalUsers: 3, totalNotes: 142, activeAdminCount: 1 });

        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);


    }, [])



    return (
        <div className='w-full min-h-screen flex-1 flex flex-col p-6 bg-gray-300 '>
            <div className='max-w-6xl w-full mx-auto space-y-6'>

                {/* Header Block Control Matrix */}
                <div className='flex items-center gap-3 border-b border-gray-400 pb-4'>
                    <ShieldAlert className='h-8 w-8 text-red-600 shrink-0' />
                    <div>
                        <h1 className='text-3xl font-bold text-slate-800 tracking-tight'>Admin Panel.</h1>
                        <p className='text-sm text-slate-700'>Monitor MERN stack metrics data and manage system control access parameters.</p>
                    </div>

                </div>

                {/* Data Cards Layer Grid */}
                {
                    isLoading ?
                        (<div className='flex-1 w-full flex items-center justify-center bg-gray-300 min-h-full'>
                            <Loader2 className='h-10 w-10 animate-spin' />
                        </div>)
                        :
                        (<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className='bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between'>
                                <div>
                                    <p className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Total Registerd Users</p>
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

                        {/* User Management System Table */}
                        <div>

                        </div>




                        </div>)
                }

            </div>

        </div>
    )
}

export default AdminDashboard