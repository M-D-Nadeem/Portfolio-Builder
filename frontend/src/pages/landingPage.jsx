import { motion } from "framer-motion";
import { BsPalette2, BsLightning, BsGear, BsSpeedometer } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { useAuth } from "../components/AuthContext";
import Loading from "../portfolio/Loading";
import { useEffect, useState } from "react";
import axiosInstance from "../helper/axiosInstance";
import Footer from "../components/Footer";

const FeatureCard = ({ icon: Icon, title, features, className }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`relative p-6 rounded-2xl border border-white/20 shadow-md overflow-hidden ${className}`}
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80 z-0"
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
    />
    
    <div className="absolute inset-0 opacity-20">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, 10, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="text-4xl text-white opacity-90" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-2 text-gray-300">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white opacity-80" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

// Portfolio Popup Component
const PortfolioPopup = ({ isOpen, onClose, portfolios }) => {
  const navigate=useNavigate()
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-white/10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">My Portfolios</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {portfolios.length === 0 ? (
          <p className="text-gray-400 py-4 text-center">No portfolios found. Create your first portfolio!</p>
        ) : (
          <div className="max-h-96 overflow-y-auto pr-2">
            {portfolios.map((portfolio) => (
              <div 
                key={portfolio._id} 
                className="bg-gray-800/50 rounded-lg p-4 mb-3 border border-white/5 hover:border-purple-500/30 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    {/* <h3 className="font-medium text-white">{portfolio.name || `Portfolio #${portfolio.id}`}</h3> */}
                    <p className="text-sm text-gray-400">ID: {portfolio._id}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${portfolio.deployed ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <span className="text-sm text-gray-300">
                      {portfolio.deployed ? 'Deployed' : 'Not Deployed'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => portfolio.deployed?window.open(portfolio.deployedLink, "_blank"):navigate(`/previewProfile/${portfolio._id}`)}
                    className="text-xs bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 px-3 py-1 rounded-md transition-colors"
                  >
                    View
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => navigate("/inputForm")}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-2 rounded-lg font-medium transition-all hover:shadow-lg"
          >
            Create New Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const PortfolioLanding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
  const [fetchingPortfolios, setFetchingPortfolios] = useState(false);
  
  useEffect(() => {
    const preloadResources = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error('Loading error:', error);
        setLoading(false); // Ensure content shows even if there's an error
      }
    };

    preloadResources();
  }, []);

  const handleViewPortfolios = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      toast.error("Please sign in to view your portfolios");
      setTimeout(() => navigate("/signin"), 1000); 
      return;
    }
    const userId=user._id

    try {
      setFetchingPortfolios(true);
      
      // Fetch portfolios from backend
      const response = await axiosInstance.get(`/user/profile/getAll/${userId}`);
      console.log(response);
      
      if (response.data.success) {
        setPortfolios(response.data.user.projects);
        setPopupOpen(true);
      } else {
        toast.warn("No portfolios found or invalid response format");
        setPortfolios([]);
        setPopupOpen(true);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      toast.error(error.response?.data?.message || "Failed to fetch portfolios");
    } finally {
      setFetchingPortfolios(false);
    }
  };

  const handleCreatePortfolios = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      toast.error("Please sign in to create your portfolios");
      setTimeout(() => navigate("/signin"), 1000); 
      return;
    }else{
      navigate("/inputForm")
    }
  };

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="relative min-h-screen bg-black">
      {/* <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
      
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-900"/>
        
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl"
          animate={{
            x: [-50, 50],
            y: [-30, 30],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-700/20 blur-3xl"
          animate={{
            x: [60, -60],
            y: [40, -40],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-cyan-700/20 blur-3xl"
          animate={{
            x: [-30, 30],
            y: [50, -50],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="relative z-20">
          <Header />
        </div>
        
        <main className="container mx-auto px-6 py-16 text-center flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-lg mb-4 text-gray-400 tracking-wide">Welcome to PortDev 👋</h2>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Create Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                Developer Portfolio
              </span>
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto mb-10 text-lg">
              Showcase your skills and projects with a stunning portfolio website—quick, easy, and elegant.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={ handleCreatePortfolios}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 border border-purple-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg backdrop-blur-md hover:bg-purple-600 transition-all"
              >
                Create Portfolio
              </motion.button>
              <motion.button
                onClick={handleViewPortfolios}
                whileHover={{ scale: 1.05 }}
                disabled={fetchingPortfolios}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-lg font-medium shadow-lg transition-all hover:shadow-xl disabled:opacity-70"
              >
                {fetchingPortfolios ? 'Loading...' : 'View My Portfolios'}
              </motion.button>
              <motion.button
                onClick={() => navigate("/examplePortfolio")}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 border border-gray-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg backdrop-blur-md hover:bg-gray-800 transition-all"
              >
                View Examples
              </motion.button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={BsPalette2}
              title="Modern Design"
              features={["Responsive Layout", "Dark Mode", "Animated UI"]}
              className="border-purple-500"
            />
            <FeatureCard
              icon={BsLightning}
              title="Easy to Use"
              features={["Quick Setup", "Simple Interface", "Live Preview"]}
              className="border-blue-500"
            />
            <FeatureCard
              icon={BsGear}
              title="Customizable"
              features={["Custom Themes", "Layout Options", "Font Choices"]}
              className="border-green-500"
            />
            <FeatureCard
              icon={BsSpeedometer}
              title="SEO Optimized"
              features={["Meta Tags", "Fast Loading", "Best Practices"]}
              className="border-red-500"
            />
          </div>
        </main>
        <Footer />

      </div>
      
      <PortfolioPopup 
        isOpen={popupOpen} 
        onClose={() => setPopupOpen(false)} 
        portfolios={portfolios} 
      />
    </div>
  );
};

export default PortfolioLanding;