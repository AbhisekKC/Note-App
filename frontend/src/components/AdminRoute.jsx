import {getData} from '@/context/userContext';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import {toast} from 'sonner'

function AdminRoute() {
  const { user } = getData();

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  if (user.role !== 'admin') {
    toast.error('Access denied. Admins only.');
    return <Navigate to={'/*'} />;
  }

  return <Outlet />;
}

export default AdminRoute;