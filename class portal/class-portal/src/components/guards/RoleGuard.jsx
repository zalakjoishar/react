import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission } from '../../utils/rbac';
import { toast } from 'react-toastify';

const RoleGuard = ({ children, permissions = [], fallback = null }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // If no permissions required, allow access
  if (!permissions || permissions.length === 0) {
    return children;
  }

  // Check if user has any of the required permissions
  const hasRequiredPermission = permissions.some(permission => 
    hasPermission(user?.roles, permission)
  );

  if (!hasRequiredPermission) {
    toast.error('You do not have permission to access this page.');
    navigate('/');
    return fallback;
  }

  return children;
};

export default RoleGuard;
