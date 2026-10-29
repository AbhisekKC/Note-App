import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, ShieldAlert, Users, BookOpen, Activity, ShieldCheck, UserPlus, Trash2, X, Pen, User, FileText, Search } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'

export default function AdminDashboard() {
    const [metrics, setMetrics] = useState({ totalUsers: 0, totalNotes: 0, activeAdminCount: 1 })
    const [usersList, setUsersList] = useState([])
    const [notesList, setNotesList] = useState([])
    const [noteSearchQuery , setNoteSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    //update states for user
    const [editingUser, setEditingUser] = useState(null);
    const editAreaRef = useRef(null)


    //Modal states for adding a user
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [newUserData, setNewUserData] = useState({ username: '', email: '', role: 'user' })

    useEffect(() => {
        // Mock data baseline for initial UI rendering check
        setUsersList([
            { _id: '1', username: 'AbhisekKC', email: 'abhisekkc07@gmail.com', role: 'admin', createdAt: '2026-01-15' },
            { _id: '2', username: 'JohnDoe', email: 'john@example.com', role: 'user', createdAt: '2026-03-22' },
            { _id: '3', username: 'JaneSmith1', email: 'jane1@example.com', role: 'user', createdAt: '2026-05-10' },
            { _id: '4', username: 'JaneSmith2', email: 'jane2@example.com', role: 'user', createdAt: '2026-05-10' },
            { _id: '5', username: 'JaneSmith3', email: 'jane3@example.com', role: 'user', createdAt: '2026-05-10' },
        ]);

        setNotesList([
            { _id: 'n1', title: 'Deployment Guide', content: 'Configure production reverse proxy using Nginx architecture.', creator: 'AbhisekKC', createdAt: '2026-01-20' },
            { _id: 'n5', title: 'Gym Routine', content: 'Sunday:-Chesday, Monday:-Backday, Tuesday:-legday and Repeat', creator: 'AbhisekKC', createdAt: '2026-10-21' },
            { _id: 'n6', title: 'Todo list for my NoteAPP', content: ' 1. add google auth done.,2. profile section done.,3. Add features page done.,4. Add about page done.,5. Project already pushed to Github done.,6. Clickon nav link to take you to at the top of that page. same thing for edit note button , should take me to the edit section.,7. also the note content section starts clipping if its too long , make it expand if needed done.,8. Add a 404 page done.,9. learn how to push changes to github., 10. Added a mock admin panel for others users to see ,the mock data is only testing and has not been connected to the backend. Done., 11.Just deploy this version of this app for others to test and see.',creator:'AbhisekKC', createdAt: '2026-10-21' },
            
            { _id: 'n2', title: 'Shopping List', content: 'Buy whey protein, oats, peanut butter, and chicken breast.', creator: 'JohnDoe', createdAt: '2026-03-25' },
            { _id: 'n3', title: 'MERN State Management', content: 'Use Redux Toolkit or Context API for simple global structures.', creator: 'JaneSmith1', createdAt: '2026-05-12' },
            { _id: 'n4', title: 'SQL vs NoSQL notes', content: 'MongoDB fits flexible schemas; Postgres handles relational constraints.', creator: 'JaneSmith2', createdAt: '2026-05-14' },
        ])
        
        setMetrics({ totalUsers:5, totalNotes:6, activeAdminCount: 1 });
        const timer = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(timer);
    }, [])
    
    // to handle role change
    const handleRoleToggle = (userId, currentRole, userName) => {
        const nextRole = currentRole === 'admin' ? 'user' : 'admin';
        if (window.confirm(`Are you sure you want to make ${userName} into ${nextRole} ?`)) {


            // 1. Update the user list
            setUsersList(prev => prev.map(u => u._id === userId ? { ...u, role: nextRole } : u));

            // 2. Dynamically adjust the activeAdminCount metric
            setMetrics(prev => ({
                ...prev,
                activeAdminCount: nextRole === 'admin' ? prev.activeAdminCount + 1 : prev.activeAdminCount - 1
            }));

            toast.success(`User access configuration updated to ${nextRole}!`);

        }

    }

    //handles eliminating a user profile record from state
    const handleDeleteUser = (userId, userRole, userName) => {
        if (window.confirm(`Do you want to delete user ${userName} ?`)) {
            setUsersList(prev => prev.filter(u => u._id !== userId));

            setMetrics(prev => (
                {
                    ...prev,
                    totalUsers: prev.totalUsers - 1,
                    activeAdminCount: userRole === 'admin' ? prev.activeAdminCount - 1 : prev.activeAdminCount
                }))
            toast.error('User profile deleted successfully');


        }



    }

    //handles updating a user
    const handleEditUser = (e) => {
        e.preventDefault();
        if (!editingUser.username || !editingUser.email) {
            toast.error('Identity fields cannot be blank!!!')
            return;
        }
        //find that user
        const prevUser = usersList.find(u => u._id === editingUser._id);
        //1. update the user record in the registry state
        setUsersList(prev => prev.map(u => u._id === editingUser._id ? editingUser : u));
        //2. dynamically re-adjust administrator metrics if roels were modified
        if (prevUser && prevUser.role !== editingUser.role) {
            setMetrics(
                prev => ({
                    ...prev,
                    activeAdminCount: editingUser.role === 'admin' ? prev.activeAdminCount + 1 : prev.activeAdminCount - 1
                })
            )
        }

        toast.success(`Profile properties updated for ${editingUser.username}.`)
        setEditingUser(null);
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

    //handling Notes section
    const handleDeleteNote = (noteId , noteTitle) =>{
        if(window.confirm(`Are you sure you want to moderate and delete this note: ${noteTitle}`)){
            setNotesList(prev => prev.filter(n=> n._id !== noteId));

            setMetrics(prev =>({
                ...prev,
                totalNotes: prev.totalNotes-1
            }))
            toast.error('Note deleted successfully!!')
        }
    }
    // search filter for notes
    const filteredNotes = notesList.filter( note =>
        note.title.toLowerCase().includes(noteSearchQuery.toLowerCase())||
        note.content.toLowerCase().includes(noteSearchQuery.toLowerCase())||
        note.creator.toLowerCase().includes(noteSearchQuery.toLowerCase())
    )



    return (
        <div className='w-full min-h-screen flex-1 flex flex-col p-6 bg-slate-100'>
            <div className='max-w-6xl w-full mx-auto space-y-6'>

                {/* Header Block Control Matrix */}
                <div className='flex items-center gap-3 border-b bg-linear-to-l from-green-200 to-white p-4'>
                    <ShieldAlert className='h-8 w-8 text-indigo-600 shrink-0' />
                    <div>
                        <h1 className='text-3xl font-bold text-slate-800 tracking-tight'>Admin Panel.</h1>
                        <p className='text-sm text-slate-500'>Monitor MERN stack metrics data and manage system control access parameters.</p>
                        <p className='text-sm text-slate-500'>This is a mock Admin Panel for others users to interact with so they can see how it works, only Admin level users are allowed access to the data in the database.</p>
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
                                                            <div className='inline-flex items-center justify-center gap-3 w-full'>
                                                                {/* Role Toggle Button */}
                                                                <Button
                                                                    onClick={() => handleRoleToggle(account._id, account.role, account.username)}
                                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer bg-white ${account.role === 'admin'
                                                                        ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                                                                        : 'border-red-200 text-red-600 hover:bg-red-50'
                                                                        }`}
                                                                >
                                                                    <ShieldCheck className='h-3.5 w-3.5' />
                                                                    {account.role === 'admin' ? 'Demote User' : 'Make Admin'}
                                                                </Button>

                                                                {/* Update Button */}
                                                                <Button
                                                                    onClick={() => {
                                                                        setEditingUser(account);
                                                                        setTimeout(() => {
                                                                            editAreaRef.current?.focus()
                                                                        }, 100);
                                                                    }}





                                                                    className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-200 text-amber-600 hover:bg-amber-50 bg-white transition-all cursor-pointer'
                                                                >
                                                                    <Pen className='h-3.5 w-3.5' />
                                                                </Button>

                                                                {/* Delete Button */}
                                                                <Button
                                                                    onClick={() => handleDeleteUser(account._id, account.role, account.username)}
                                                                    className='inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all bg-white cursor-pointer shadow-2xs'
                                                                >
                                                                    <Trash2 className='h-4 w-4' />
                                                                </Button>
                                                            </div>
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
                                <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center mt-auto p-4 z-40 animate-fade-in'>
                                    <div className='bg-linear-to-l from-green-200  w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hiiden transform scale-100 transition-transform'>
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

                        {/* Updat User Model dialog wrapper */}

                        {
                            editingUser && (
                                <div
                                    className='fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-40 animate-fade-in'
                                >
                                    <div className='w-full max-w-md bg-linear-to-l from-green-200 rounded-2xl shadow-2xl border border-slate-100 overflow-hiden transform scale-100 transition-colors'>

                                        {/* Header for edit model */}
                                        <div className='p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 '>
                                            <h3 className='font-bold text-slate-800 text-lg'>Update User Profile.</h3>
                                            <Button onClick={() => setEditingUser(null)}
                                                className='p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer bg-transparent shadow-none border-none '>
                                                <X className='h-4 w-4' />
                                            </Button>
                                        </div>

                                        {/* Form  content controls */}
                                        <form onSubmit={handleEditUser}
                                            className='p-5 space-y-5'
                                        >
                                            <div className='space-y-1'>
                                                <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Username</label>
                                                <Input ref={editAreaRef}
                                                    type='text' required value={editingUser.username} onChange={(e) => setEditingUser(prev => ({ ...prev, username: e.target.value }))} className='w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50/50' />
                                            </div>
                                            <div className='space-y-1'>
                                                <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Email</label>
                                                <Input type='email' required value={editingUser.email} onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))} className='w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50/50' />
                                            </div>
                                            <div className='space-y-1'>
                                                <label className='text-xs font-bold text-slate-600 uppercase tracking-wider'>Role Privilege</label>
                                                <select value={editingUser.role} onChange={(e) => setEditingUser(prev => ({ ...prev, role: e.target.value }))} className='w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 bg-slate-50/50 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden' >
                                                    <option value='user'>👤 User</option>
                                                    <option value='admin'>🛡️ Admin</option>
                                                </select>
                                            </div>
                                            <div className='flex gap-3 pt-3 border-t border-slate-100 justify-end'>
                                                <Button type='button' onClick={() => setEditingUser(null)} className='px-4 py-2 border border-slate-300 text-slate-700 hover:text-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 bg-white transition-colors cursor-pointer' >Cancel</Button>
                                                <Button type='submit' className='px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs' >Save Changes</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )
                        }
                       
                        

                    </div>
                )}
                  {/*Notes panel   */}
                <div className='space-y-6 p-4 border-2 border-slate-200 shadow-xl rounded-xl'>
                    <div className='flex flex-col  sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <h1 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
                            <FileText className='h-5 w-5 text-slate-500' /> Global Notes Registry.
                        </h1>
                        {/* search bar real-time */}
                        <div className='relative w-full max-w-xs bg-white flex items-center rounded-lg shadow-2xs'>
                            <Search className='absolute left-3 h-4 w-4 text-slate-400' />
                            <Input type='text'
                                   placeholder='Search notes data...'
                                   value={noteSearchQuery}
                                   onChange={(e)=>setNoteSearchQuery(e.target.value)}
                                   className='pl-9 w-full border border-slate-200 rounded-lg'/>
                        </div>

                    </div>
                    {/* Notes table */}
                    <div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full text-left border-collapse text-sm'>
                                <thead>
                                    <tr className='bg-slate-50 text-slate-600 font-semibold border-b border-slate-200'>
                                        <th className='p-4 w-[20%]'>Title.</th>
                                        <th className='p-4 w-[45%]'>Content.</th>
                                        <th className='p-4 w-[15%]'>Author.</th>
                                        <th className='p-4 w-[20%]'>Moderation Operations.</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-linear-to-l from-green-200 to-white'>
                                    {
                                        filteredNotes.length === 0? 
                                        (
                                            <tr className='border-b border-slate-100 last:border-0 '>
                                                <td className='p-4 font-semibold w-full'>
                                                    No systematic notes match your search filter??? or no Notes in the cloud yet.
                                                </td>

                                            </tr>
                                        )
                                        :
                                        ( filteredNotes.map((note) =>(
                                            <tr key={note._id}
                                                className='hover:bg-slate-50/70 transition-colors border-b border-slate-100 last:border-0 align-top'
                                                >
                                                <td className='p-4 font-bold text-slate-900'>{note.title}</td> 
                                                <td className='p-4 text-slate-600 wrap-break-word max-w-prose whitespace-pre-line'>{note.content}</td>
                                                <td className='p-4 font-medium text-indigo-600'>@{note.creator}</td>   
                                                <td className='p-4 text-center'>
                                                    <Button className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 text-slate-900 hover:text-red-700 hover:bg-white transition-all bg-green-200 cursor-pointer shadow-xs text-xs font-semibold'
                                                           onClick={()=>handleDeleteNote(note._id , note.title)}
                                                          >
                                                        <Trash2 className='h-3.5 w-3.5' />DeleteNote.
                                                    </Button>
                                                </td>         

                                            </tr>
                                        )

                                        )
                                            
                                        )
                                    }

                                </tbody>
                            </table>

                        </div>

                    </div>
                  
                </div>

            </div>
        </div>
    )
}
