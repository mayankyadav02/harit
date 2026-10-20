import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '@/store';

export const Dashboards: React.FC = () => {
  const { currentUser } = useStore();

  switch (currentUser.role) {
    case 'farmer':
      return <Navigate to="/dashboard/farmer" replace />;
    case 'admin':
      return <Navigate to="/dashboard/admin" replace />;
    case 'customer':
    default:
      return <Navigate to="/dashboard/customer" replace />;
  }
};
