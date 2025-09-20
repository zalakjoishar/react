// API utility functions for cookie-based authentication

const API_BASE_URL = 'http://localhost:8080';

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('userData') !== null;
};

// Helper function to get user data from localStorage
const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Create headers for API requests (no Bearer token needed - uses cookies)
const createHeaders = (additionalHeaders = {}) => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...additionalHeaders
  };
};

// Authentication functions
export const authApi = {
  // Login function
  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: createHeaders(),
      credentials: 'include', // Important for cookies
      body: JSON.stringify({
        username: credentials.name, // Use username to match getUsername() method
        password: credentials.password
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(errorData.message || 'Login failed');
    }

    const userData = await response.json();
    
    // Store user data in localStorage (cookie is automatically handled by browser)
    localStorage.setItem('userData', JSON.stringify({
      id: userData.id,
      name: userData.name,
      emailId: userData.emailId,
      roles: userData.roles
    }));

    return userData;
  },

  // Logout function
  async logout() {
    try {
      await fetch(`${API_BASE_URL}/api/auth/signout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage regardless of API call success
      localStorage.removeItem('userData');
    }
  },

  // Get current user details
  async getCurrentUser() {
    if (!isAuthenticated()) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error getting user details:', error);
    }

    return null;
  }
};

// Public GET request (no authentication required)
export const apiGetPublic = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...options.headers
    },
    credentials: 'omit', // No credentials for public endpoints
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Authenticated GET request (uses cookies)
export const apiGet = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: createHeaders(options.headers),
    credentials: 'include', // Include cookies for authentication
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Authenticated POST request (uses cookies)
export const apiPost = async (endpoint, data, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: createHeaders(options.headers),
    credentials: 'include', // Include cookies for authentication
    body: JSON.stringify(data),
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Authenticated PUT request (uses cookies)
export const apiPut = async (endpoint, data, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: createHeaders(options.headers),
    credentials: 'include', // Include cookies for authentication
    body: JSON.stringify(data),
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Authenticated DELETE request (uses cookies)
export const apiDelete = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: createHeaders(options.headers),
    credentials: 'include', // Include cookies for authentication
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Authenticated PATCH request (uses cookies)
export const apiPatch = async (endpoint, data, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'PATCH',
    headers: createHeaders(options.headers),
    credentials: 'include', // Include cookies for authentication
    body: JSON.stringify(data),
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Special function for text/uri-list content type (uses cookies)
export const apiPutUriList = async (endpoint, uriData, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: createHeaders({
      'Content-Type': 'text/uri-list',
      ...options.headers
    }),
    credentials: 'include', // Include cookies for authentication
    body: uriData,
    ...options
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.text();
};

// Helper function to handle pagination (uses cookies for authentication)
export const fetchAllPages = async (baseEndpoint, pageSize = 100) => {
  let allData = [];
  let currentPage = 0;
  let hasMorePages = true;
  
  while (hasMorePages) {
    const response = await apiGet(`${baseEndpoint}?page=${currentPage}&size=${pageSize}`);
    
    if (response && response["_embedded"]) {
      const entityKey = Object.keys(response["_embedded"])[0];
      if (response["_embedded"][entityKey]) {
        allData = [...allData, ...response["_embedded"][entityKey]];
      }
    }
    
    // Check if there are more pages
    const pageInfo = response.page;
    hasMorePages = pageInfo && (currentPage + 1) < pageInfo.totalPages;
    
    if (hasMorePages) {
      currentPage++;
    }
  }
  
  return allData;
};

// Export authentication helpers
export { isAuthenticated, getUserData };