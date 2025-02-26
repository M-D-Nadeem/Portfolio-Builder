// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { BsPersonCircle } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// export default function Header() {
//   const {user,isAuthenticated,token}=useAuth()
  
//   console.log(user);
  
  
  
//   const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated); // Change based on auth logic
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
//   useEffect(()=>{
//     setIsLoggedIn(isAuthenticated)
//   },[isAuthenticated])
 
//   return (
//     <div className="relative">
//       <nav className="p-4 text-white">
//         <div className="container mx-auto flex justify-between items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-2"
//           >
//             <span className="text-2xl font-bold text-indigo-400">
//               <code className="mr-2">&lt;/&gt;</code>
//               PortDev
//             </span>
//           </motion.div>

//           {!isLoggedIn ? (
//             <div className="flex gap-4 items-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="px-4 py-2 rounded-lg hover:text-gray-300 transition-all"
//               >
//                 <Link to="/signin">Login</Link>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-700 transition-all"
//               >
//                 <Link to="/signup">Get Started</Link>
//               </motion.button>
//             </div>
//           ) : (
//             /* If logged in, show user icon with dropdown */
//             <div className="relative">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
//               >
//                 <BsPersonCircle className="text-2xl" />
//                 <span className="text-sm font-medium">{user!=null?user.username:""}</span>
//               </motion.button>

//               {isDropdownOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
//                 >
//                   <ul className="text-sm">
//                     <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
//                       Profile
//                     </li>
//                     <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
//                       Settings
//                     </li>
//                     <li
//                       className="px-4 py-2 hover:bg-red-600 cursor-pointer text-red-400"
//                       onClick={() => setIsLoggedIn(false)} // Handle logout logic
//                     >
//                       Logout
//                     </li>
//                   </ul>
//                 </motion.div>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>
      
//       {/* Horizontal line at the bottom of the header */}
//       <div className="h-px w-full bg-purple-500"></div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Update login state when authentication changes
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout function from auth context
      await logout();
      setIsDropdownOpen(false);
      navigate("/");      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <div className="relative z-30">
      <nav className="p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Link to="/" className="text-2xl font-bold text-indigo-400 flex items-center">
              <code className="mr-2">&lt;/&gt;</code>
              PortDev
            </Link>
          </motion.div>

          {!isLoggedIn ? (
            <div className="flex gap-4 items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg hover:text-gray-300 transition-all"
              >
                <Link to="/signin">Login</Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-700 transition-all"
              >
                <Link to="/signup">Get Started</Link>
              </motion.div>
            </div>
          ) : (
            /* If logged in, show user icon with dropdown */
            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
              >
                <BsPersonCircle className="text-2xl" />
                <span className="text-sm font-medium">
                  {user?.username || "User"}
                </span>
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <ul className="text-sm">
                      <li className="hover:bg-gray-700 cursor-pointer">
                        <Link to="/inputForm" className="block px-4 py-2">
                          Create Portfolio
                        </Link>
                      </li>
                      
                      <li className="hover:bg-gray-700 cursor-pointer">
                        <Link to="/examplePortfolio" className="block px-4 py-2">
                        Featured Portfolio
                        </Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-red-600 cursor-pointer text-red-400"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </nav>
      
      {/* Horizontal line at the bottom of the header */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </div>
  );
}