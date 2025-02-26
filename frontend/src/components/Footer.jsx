import React from 'react';
import { motion } from 'framer-motion';
import { Bug, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="w-full bg-gray-900 text-white h-14 py-4 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <motion.div 
            className="text-xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-blue-400">Dev</span>
            <span className="text-white">Folio</span>
          </motion.div>
          <motion.p 
            className="text-sm text-gray-400 flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Crafted with magic <Sparkles className="ml-1 text-yellow-400 h-4 w-4" />
          </motion.p>
        </div>
        
        <div className="flex items-center space-x-6">
          <motion.button
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "mailto:nadeem9748525905@gmail.com?subject=Bug Report&body=Describe the issue here..."}
          >
            <Bug className="mr-1 h-4 w-4" /> Report Bug
          </motion.button>
          
          <motion.div 
            className="text-sm text-gray-400 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Heart className="mr-1 h-4 w-4 text-red-500" /> © {currentYear} DevFolio. All rights reserved.
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;