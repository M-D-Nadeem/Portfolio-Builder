import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import { useAuth } from './AuthContext';
import Footer from './Footer';

// Sign Up Component
export const SignUp = () => {
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Basic form validation
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    // if (formData.password.length < 6) {
    //   setFormError('Password must be at least 6 characters');
    //   return;
    // }
    
    // Submit registration data
    try {
      // Remove confirmPassword field for API request
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4 relative">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-indigo-600/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-md z-10"
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-400">Create Account</h1>
            <p className="text-gray-300 mt-1">Join the PortDev community 💜</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg p-8 shadow-xl w-full"
          >
            {(error || formError) && (
              <div className="mb-4 p-3 bg-red-900/60 border border-red-500 rounded-md text-white">
                {error || formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-2 gap-4 mb-4 w-full">
                <div className="w-full">
                  <label htmlFor="firstName" className="block text-gray-300 mb-1">First Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border"
                    placeholder="John"
                    required
                  />
                </div>
                
                <div className="w-full">
                  <label htmlFor="lastName" className="block text-gray-300 mb-1">Last Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 w-full">
                <div className="flex justify-between items-center">
                  <label htmlFor="username" className="block text-gray-300 mb-1">Username</label>
                  <span className="text-yellow-500 text-xs">✨ Cannot be changed later</span>
                </div>
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border"
                    placeholder="Choose a username"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">This will be your unique identifier: portdev.com/username</p>
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              <div className="mb-6 w-full">
                <label htmlFor="confirmPassword" className="block text-gray-300 mb-1">Confirm Password</label>
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition-colors duration-300 font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account? 
                <motion.span whileHover={{ color: '#a78bfa' }}>
                  <Link to="/signin" className="text-indigo-400 ml-1 hover:underline">
                    Sign in
                  </Link>
                </motion.span>
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center text-gray-500 text-sm mt-4">
            Built with 💜 by PortDev
          </motion.div>
        </motion.div>
      </div>
      <Footer />

    </div>
  );
};

// Sign In Component
export const SignIn = () => {
  const { login, error, loading } = useAuth();
  const [credentials, setCredentials] = useState({
    emailOrUsername: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4 relative">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 -right-20 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-md z-10"
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-400">Welcome back</h1>
            <p className="text-gray-300 mt-1">Enter your credentials to access your portfolio</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg p-8 shadow-xl w-full"
          >
            {error && (
              <div className="mb-4 p-3 bg-red-900/60 border border-red-500 rounded-md text-white">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4 w-full">
                <label htmlFor="emailOrUsername" className="block text-gray-300 mb-1">Email or Username</label>
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="emailOrUsername"
                    name="emailOrUsername"
                    value={credentials.emailOrUsername}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border"
                    placeholder="Enter email or username"
                    required
                  />
                </div>
              </div>

              <div className="mb-6 w-full">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-gray-300">Password</label>
                </div>
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 box-border"
                    placeholder="Your password"
                    required
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <motion.span whileHover={{ color: '#a78bfa' }}>
                    <Link to="/forgot-password" className="text-indigo-400 text-sm hover:underline">
                      Forgot password?
                    </Link>
                  </motion.span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md transition-colors duration-300 font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account? 
                <motion.span whileHover={{ color: '#a78bfa' }}>
                  <Link to="/signup" className="text-indigo-400 ml-1 hover:underline">
                    Create one now
                  </Link>
                </motion.span>
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center text-gray-500 text-sm mt-4">
            Built with 💜 by PortDev
          </motion.div>
        </motion.div>
      </div>
      <Footer />

    </div>
  );
};