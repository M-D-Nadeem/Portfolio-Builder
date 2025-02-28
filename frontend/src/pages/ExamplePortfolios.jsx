import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCode, FaBriefcase, FaTools } from "react-icons/fa";
import axiosInstance from "../helper/axiosInstance";
import Loading from "../portfolio/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PortfolioCard = ({ portfolio }) => {
  const navigate = useNavigate();
  let totalSelectedSkills = 0;
  
  // Fix: Add proper null/undefined checking
  if (portfolio.skills && portfolio.skills.length > 0) {
    totalSelectedSkills = portfolio.skills.reduce(
      (total, category) => 
        total + (category.selectedSkills ? category.selectedSkills.length : 0), 
      0
    );
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        if (portfolio.deployedLink) {
        window.open(portfolio.deployedLink, "_blank");
      }}}
      className="bg-gray-900/70 rounded-xl hover:cursor-pointer overflow-hidden border border-gray-800 hover:border-blue-500/40 shadow-lg"
    >
      <div className="relative p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={portfolio?.basicProfile?.avatar || "/api/placeholder/50/50"} 
              alt={portfolio?.basicProfile?.fullName || "User"} 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          
          <div className="flex-1">
            {/* Fix: Add proper null checking for feature flag */}
            {/* {portfolio.featured && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-700 to-purple-500 text-xs text-white py-0.5 px-2 rounded-full">
                Featured
              </div>
            )} */}
            <h3 className="font-medium text-white">{portfolio?.basicProfile?.fullName || "User"}</h3>
            <p className="text-sm text-blue-400">
              {portfolio.basicProfile?.titles && portfolio.basicProfile.titles.length > 0 
                ? portfolio.basicProfile.titles[0] 
                : "User"}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-6 text-center">
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">
              <FaCode className="inline-block" />
            </div>
            <p className="text-xl text-white font-medium">{portfolio.projects?.length || 0}</p>
            <p className="text-xs text-gray-400">Projects</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">
              <FaBriefcase className="inline-block" />
            </div>
            <p className="text-xl text-white font-medium">{portfolio.experiences?.length || 0}</p>
            <p className="text-xs text-gray-400">Experience</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">
              <FaTools className="inline-block" />
            </div>
            <p className="text-xl text-white font-medium">{totalSelectedSkills}</p>
            <p className="text-xs text-gray-400">Skills</p>
          </div>
        </div>
        
        <div className="mt-5 text-center">
          {/* Fix: Add proper null check for deployedLink */}
          <button 
            className="text-blue-400 text-sm hover:text-blue-300 transition-colors flex items-center justify-center mx-auto"
            onClick={(e) => {
              e.stopPropagation();
              if (portfolio.deployedLink) {
                window.open(portfolio.deployedLink, "_blank");
              }
            }}
          >
            View Portfolio <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ExamplePortfoliosPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/profile/get');
        console.log(response);
        
        if (response.data.success) {
            const deployedProfiles = response.data.profiles.filter(profile => profile.deployed);
            setPortfolios(deployedProfiles);
        } else {
            setError("Failed to load portfolios. Please try again later.");
            toast.error("Failed to load portfolios");
        }
      } catch (err) {
        console.error("Error fetching portfolios:", err);
        setError("Failed to load portfolios. Please try again later.");
        toast.error("Failed to load portfolios");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolios();
  }, []);
  
  useEffect(() => {
    const preloadResources = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Loading error:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    preloadResources();
  }, []);
  
  if (initialLoading) {
    return <Loading />;
  }
  
  // Sample data for preview purposes with proper structure
  const samplePortfolios = [
    {
      _id: "sample1",
      basicProfile: {
        avatar: "/api/placeholder/50/50",
        fullName: "John Doe",
        titles: ["Software Engineer"]
      },
      projects: ["Project 1", "Project 2"],
      experiences: ["Experience 1", "Experience 2"],
      skills: [{ selectedSkills: ["Skill 1", "Skill 2", "Skill 3"] }],
      deployedLink: "https://example.com",
    //   featured: true
    },
    {
      _id: "sample2",
      basicProfile: {
        avatar: "/api/placeholder/50/50",
        fullName: "Jane Smith",
        titles: ["UX Designer"]
      },
      projects: ["Project 1"],
      experiences: ["Experience 1", "Experience 2", "Experience 3"],
      skills: [{ selectedSkills: ["Skill 1", "Skill 2"] }],
      deployedLink: "https://example.com"
    }
  ];
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
  // Use real data if available, otherwise use sample data
  const displayPortfolios = portfolios.length > 0 ? portfolios : samplePortfolios;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      {/* Background elements */}
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
      
      <Header />
      
      {/* Fix: Uncomment the ToastContainer */}
      {/* <ToastContainer theme="dark" /> */}
      
      <div className="relative z-10 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 bg-gray-800/50 px-4 py-1.5 rounded-full border border-gray-700">
              <span className="text-gray-300 text-sm flex items-center">
                Discover Amazing Portfolios <span className="ml-1 text-yellow-500">✨</span>
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-blue-400">Featured</span>{" "}
              <span className="text-purple-500">Portfolios</span>
            </h1>
            
            {/* <p className="text-gray-400 max-w-2xl mx-auto">
              Discover stunning portfolios crafted by brilliant developers. Get inspired and start building your masterpiece today! 🚀
            </p> */}

            <p className="text-gray-400 max-w-2xl mx-auto">
   Ready to shine? 🌟 Deploy your portfolio now and get a chance to be featured among top developers!
</p>

            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreatePortfolios}
              className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center mx-auto"
            >
              <span className="mr-2 text-white">Create Your Portfolio</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-10">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPortfolios.map((portfolio) => (
                <PortfolioCard 
                  key={portfolio._id || `portfolio-${Math.random()}`} 
                  portfolio={portfolio}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
    
  );
};

export default ExamplePortfoliosPage;