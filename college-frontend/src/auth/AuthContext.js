import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import API_BASE_URL from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('auth_token');
        const role = localStorage.getItem('user_role');
        const id = localStorage.getItem('user_id');
        const name = localStorage.getItem('user_name');
        
        if (token && role && id) {
          setIsAuthenticated(true);
          setUser({ 
            role, 
            id, 
            name: name || undefined,
            token 
          });
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        
        // Store auth data in localStorage
        localStorage.setItem('auth_token', data.token || `token:${email}`);
        localStorage.setItem('user_role', data.role);
        localStorage.setItem('user_id', data.id);
        
        // Optional: Store additional user info
        if (data.name) localStorage.setItem('user_name', data.name);
        if (email) localStorage.setItem('user_email', email);
        
        // Update state
        setIsAuthenticated(true);
        setUser({ 
          role: data.role, 
          id: data.id, 
          name: data.name,
          email: email,
          token: data.token || `token:${email}`
        });
        
        return { 
          role: data.role, 
          id: data.id,
          name: data.name 
        };
      } else {
        const errorText = await response.text();
        let errorMessage = 'Login failed';
        
        switch (response.status) {
          case 400:
            errorMessage = 'Invalid email or password';
            break;
          case 401:
            errorMessage = 'Unauthorized';
            break;
          case 404:
            errorMessage = 'User not found';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = errorText || `Error: ${response.status}`;
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please check your connection.');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    try {
      // Clear all auth-related items from localStorage
      const itemsToRemove = [
        'auth_token',
        'user_role',
        'user_id',
        'user_name',
        'user_email'
      ];
      
      itemsToRemove.forEach(item => localStorage.removeItem(item));
      
      // Reset state
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const checkBackendHealth = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  // Check if user has specific role
  const hasRole = useCallback((requiredRole) => {
    return user?.role === requiredRole;
  }, [user]);

  const value = useMemo(() => ({ 
    isAuthenticated, 
    user, 
    loading,
    login, 
    logout, 
    checkBackendHealth,
    hasRole
  }), [isAuthenticated, user, loading, logout, hasRole]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};