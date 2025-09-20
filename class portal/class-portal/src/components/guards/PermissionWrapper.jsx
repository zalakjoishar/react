import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission } from '../../utils/rbac';

const PermissionWrapper = ({ children, permissions = [], fallback = null }) => {
  const { user } = useAuth();

  // If no permissions required, show children
  if (!permissions || permissions.length === 0) {
    return children;
  }

  // Check if user has any of the required permissions
  const hasRequiredPermission = permissions.some(permission => 
    hasPermission(user?.roles, permission)
  );

  if (!hasRequiredPermission) {
    return fallback;
  }

  return children;
};

export default PermissionWrapper;
