// Role-Based Access Control utilities based on backend security configuration

export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  TRAINER: 'ROLE_TRAINER',
  COORDINATOR: 'ROLE_COORDINATOR',
  STUDENT: 'ROLE_STUDENT'
};

// Permissions based on backend WebSecurityConfig.java
export const PERMISSIONS = {
  // Dashboard access
  DASHBOARD_READ: 'DASHBOARD_READ',
  
  // Student permissions
  STUDENT_READ: 'STUDENT_READ',
  STUDENT_CREATE: 'STUDENT_CREATE',
  STUDENT_UPDATE: 'STUDENT_UPDATE',
  STUDENT_DELETE: 'STUDENT_DELETE',
  
  // Batch permissions
  BATCH_READ: 'BATCH_READ',
  BATCH_CREATE: 'BATCH_CREATE',
  BATCH_UPDATE: 'BATCH_UPDATE',
  BATCH_DELETE: 'BATCH_DELETE',
  
  // Event permissions
  EVENT_READ: 'EVENT_READ',
  EVENT_CREATE: 'EVENT_CREATE',
  EVENT_UPDATE: 'EVENT_UPDATE',
  EVENT_DELETE: 'EVENT_DELETE',
  
  // Trainer permissions
  TRAINER_READ: 'TRAINER_READ',
  TRAINER_CREATE: 'TRAINER_CREATE',
  TRAINER_UPDATE: 'TRAINER_UPDATE',
  TRAINER_DELETE: 'TRAINER_DELETE',
  
  // Coordinator permissions
  COORDINATOR_READ: 'COORDINATOR_READ',
  COORDINATOR_CREATE: 'COORDINATOR_CREATE',
  COORDINATOR_UPDATE: 'COORDINATOR_UPDATE',
  COORDINATOR_DELETE: 'COORDINATOR_DELETE',
  
  // Classroom permissions
  CLASSROOM_READ: 'CLASSROOM_READ',
  CLASSROOM_CREATE: 'CLASSROOM_CREATE',
  CLASSROOM_UPDATE: 'CLASSROOM_UPDATE',
  CLASSROOM_DELETE: 'CLASSROOM_DELETE',
  
  // Slot permissions
  SLOT_READ: 'SLOT_READ',
  SLOT_CREATE: 'SLOT_CREATE',
  SLOT_UPDATE: 'SLOT_UPDATE',
  SLOT_DELETE: 'SLOT_DELETE',
  
  // Reports permissions
  REPORTS_READ: 'REPORTS_READ'
};

// Role permissions mapping based on backend WebSecurityConfig.java
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Admin has all permissions
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.STUDENT_READ, PERMISSIONS.STUDENT_CREATE, PERMISSIONS.STUDENT_UPDATE, PERMISSIONS.STUDENT_DELETE,
    PERMISSIONS.BATCH_READ, PERMISSIONS.BATCH_CREATE, PERMISSIONS.BATCH_UPDATE, PERMISSIONS.BATCH_DELETE,
    PERMISSIONS.EVENT_READ, PERMISSIONS.EVENT_CREATE, PERMISSIONS.EVENT_UPDATE, PERMISSIONS.EVENT_DELETE,
    PERMISSIONS.TRAINER_READ, PERMISSIONS.TRAINER_CREATE, PERMISSIONS.TRAINER_UPDATE, PERMISSIONS.TRAINER_DELETE,
    PERMISSIONS.COORDINATOR_READ, PERMISSIONS.COORDINATOR_CREATE, PERMISSIONS.COORDINATOR_UPDATE, PERMISSIONS.COORDINATOR_DELETE,
    PERMISSIONS.CLASSROOM_READ, PERMISSIONS.CLASSROOM_CREATE, PERMISSIONS.CLASSROOM_UPDATE, PERMISSIONS.CLASSROOM_DELETE,
    PERMISSIONS.SLOT_READ, PERMISSIONS.SLOT_CREATE, PERMISSIONS.SLOT_UPDATE, PERMISSIONS.SLOT_DELETE,
    PERMISSIONS.REPORTS_READ
  ],
  
  [ROLES.TRAINER]: [
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.STUDENT_READ,
    PERMISSIONS.BATCH_READ,
    PERMISSIONS.EVENT_READ,
    PERMISSIONS.CLASSROOM_READ, PERMISSIONS.CLASSROOM_CREATE, PERMISSIONS.CLASSROOM_UPDATE,
    PERMISSIONS.SLOT_READ, PERMISSIONS.SLOT_CREATE, PERMISSIONS.SLOT_UPDATE,
    PERMISSIONS.REPORTS_READ
  ],
  
  [ROLES.COORDINATOR]: [
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.STUDENT_READ, PERMISSIONS.STUDENT_CREATE, PERMISSIONS.STUDENT_DELETE,
    PERMISSIONS.BATCH_READ, PERMISSIONS.BATCH_CREATE,
    PERMISSIONS.EVENT_READ, PERMISSIONS.EVENT_CREATE, PERMISSIONS.EVENT_DELETE,
    PERMISSIONS.CLASSROOM_READ, PERMISSIONS.CLASSROOM_CREATE, PERMISSIONS.CLASSROOM_DELETE,
    PERMISSIONS.SLOT_READ, PERMISSIONS.SLOT_CREATE, PERMISSIONS.SLOT_DELETE,
    PERMISSIONS.REPORTS_READ
  ],
  
  [ROLES.STUDENT]: [
    PERMISSIONS.DASHBOARD_READ,
    PERMISSIONS.STUDENT_READ,
    PERMISSIONS.BATCH_READ,
    PERMISSIONS.EVENT_READ,
    PERMISSIONS.CLASSROOM_READ,
    PERMISSIONS.SLOT_READ
  ]
};

// Helper functions
export const hasRole = (userRoles, role) => {
  return userRoles && userRoles.includes(role);
};

export const hasPermission = (userRoles, permission) => {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  
  return userRoles.some(role => {
    const rolePermissions = ROLE_PERMISSIONS[role];
    return rolePermissions && rolePermissions.includes(permission);
  });
};

export const hasAnyRole = (userRoles, roles) => {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  return roles.some(role => userRoles.includes(role));
};

export const getRoleDisplayName = (role) => {
  const roleNames = {
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.TRAINER]: 'Trainer',
    [ROLES.COORDINATOR]: 'Coordinator',
    [ROLES.STUDENT]: 'Student'
  };
  return roleNames[role] || role;
};

export const getRoleColor = (role) => {
  const roleColors = {
    [ROLES.ADMIN]: 'danger',
    [ROLES.TRAINER]: 'primary',
    [ROLES.COORDINATOR]: 'success',
    [ROLES.STUDENT]: 'info'
  };
  return roleColors[role] || 'secondary';
};

// Navigation items based on permissions
export const getFilteredNavigation = (userRoles) => {
  const allNavItems = [
    {
      title: 'Dashboard',
      path: '',
      icon: '🏠',
      permissions: [PERMISSIONS.DASHBOARD_READ]
    },
    {
      title: 'Students',
      path: 'student',
      icon: '👥',
      permissions: [PERMISSIONS.STUDENT_READ]
    },
    {
      title: 'Add Student',
      path: 'add-student',
      icon: '➕',
      permissions: [PERMISSIONS.STUDENT_CREATE]
    },
    {
      title: 'Batches',
      path: 'batch',
      icon: '📚',
      permissions: [PERMISSIONS.BATCH_READ]
    },
    {
      title: 'Add Batch',
      path: 'add-batch',
      icon: '➕',
      permissions: [PERMISSIONS.BATCH_CREATE]
    },
    {
      title: 'Events',
      path: 'event',
      icon: '📅',
      permissions: [PERMISSIONS.EVENT_READ]
    },
    {
      title: 'Add Event',
      path: 'add-event',
      icon: '➕',
      permissions: [PERMISSIONS.EVENT_CREATE]
    },
    {
      title: 'Trainers',
      path: 'trainer',
      icon: '👨‍🏫',
      permissions: [PERMISSIONS.TRAINER_READ]
    },
    {
      title: 'Add Trainer',
      path: 'add-trainer',
      icon: '➕',
      permissions: [PERMISSIONS.TRAINER_CREATE]
    },
    {
      title: 'Coordinators',
      path: 'coordinator',
      icon: '👩‍💼',
      permissions: [PERMISSIONS.COORDINATOR_READ]
    },
    {
      title: 'Add Coordinator',
      path: 'add-coordinator',
      icon: '➕',
      permissions: [PERMISSIONS.COORDINATOR_CREATE]
    },
    {
      title: 'Classrooms',
      path: 'classroom',
      icon: '🏫',
      permissions: [PERMISSIONS.CLASSROOM_READ]
    },
    {
      title: 'Add Classroom',
      path: 'add-classroom',
      icon: '➕',
      permissions: [PERMISSIONS.CLASSROOM_CREATE]
    },
    {
      title: 'Slots',
      path: 'slot',
      icon: '⏰',
      permissions: [PERMISSIONS.SLOT_READ]
    },
    {
      title: 'Add Slot',
      path: 'add-slot',
      icon: '➕',
      permissions: [PERMISSIONS.SLOT_CREATE]
    },
    {
      title: 'Reports',
      path: 'reports',
      icon: '📊',
      permissions: [PERMISSIONS.REPORTS_READ]
    }
  ];

  return allNavItems.filter(item => {
    return item.permissions.some(permission => hasPermission(userRoles, permission));
  });
};
