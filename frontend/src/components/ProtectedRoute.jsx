import { getData } from '@/context/userContext'
import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'

function ProtectedRoute() {
    const {user} = getData()
   
  return (
    <div>
        {

        user ? <Outlet /> : <Navigate to ={'/login'} />
        }

    </div>
  )
}

export default ProtectedRoute