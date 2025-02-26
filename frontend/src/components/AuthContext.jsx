import React, { useState, useEffect, createContext, useContext } from 'react';
import axiosInstance from '../helper/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Add auth token to requests
  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check for token expiration on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem('token');
        const expiration = localStorage.getItem('tokenExpiration');

        if (storedToken && expiration) {
          if (Date.now() > parseInt(expiration)) {
            await logout();
          } else {
            const timeLeft = parseInt(expiration) - Date.now();
            setupAutoLogout(timeLeft);
            const userData = JSON.parse(localStorage.getItem('user'));
            setUser(userData);
            setToken(storedToken);
          }
        }
      } catch (err) {
        console.error('Auth status check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Auto logout setup
  const setupAutoLogout = (timeLeft) => {
    setTimeout(() => {
      logout();
    }, timeLeft);
  };

  // Register new user
  const register = async (userData) => {
    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post('/user/signup', userData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('tokenExpiration', Date.now() + response.data.expiresIn);

        setToken(response.data.token);
        setUser(response.data.user);
        setupAutoLogout(response.data.expiresIn);

        toast.success('Signup successful!');
        navigate('/');
        return true;
      }
    } catch (err) {
      const errorMessage =err.response.data.message || 'Signup failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post('/user/login', credentials);

      if (response.data.success) {
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('tokenExpiration', Date.now() + response.data.expiresIn);

        setToken(response.data.token);
        setUser(response.data.user);
        setupAutoLogout(response.data.expiresIn);

        toast.success('Login successful!');
        navigate('/');
        return true;
      }else{
        setError(response.data.message);
        return false
      }
    } catch (err) {      
      const errorMessage =err.response.data.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      if (token) {
        const response=await axiosInstance.post('/user/logout');
        console.log(response);
        
      }
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem("portfolioData")
      setUser(null);
      setToken(null);

      toast.success('Logout successful!');
      navigate('/');
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
