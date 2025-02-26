import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { CheckCircle, Rocket } from "lucide-react";
import Hero from "./Hero";
import Skills from "./Skills";
import Portfolio from "./Portfolio";
import Contact from "./Contact"
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

import Footer from "./Footer";
import Navbar from "./Navbar";
import Cursor from "./Cursor";
import CodingStats from "./CodingStats";
import Loading from "./Loading";
import Experience from "./Experience";
import axiosInstance from "../helper/axiosInstance";
import Education from "./Education";
import { useAuth } from "../components/AuthContext";
import { toast } from "react-toastify";

export default function PortfolioPreview() {
  const {user}=useAuth()
  console.log(user);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);
  const [finalizing, setFinalizing] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axiosInstance.get(`/profile/get/${id}`);
        console.log(response);
        
        if (response?.data?.success) {
          setPortfolioData(response.data.profile);
        } else {
          console.error("Error fetching portfolio data");
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolio();
    }
  }, [id]);

  const handleFinalize = async () => {
    console.log(user);
    
    setFinalizing(true);
    try {
      const response = await axiosInstance.post(`/user/profile/finalize/${id}`,user);
      console.log(response);
      
      if (response?.data?.success) {

        navigate(`/`);
        toast.success("🚀 Portfolio submitted successfully!", {
                    position: "top-center",
                    // autoClose: 2000,
                    // hideProgressBar: false,
                    closeOnClick: true,
                    // pauseOnHover: true,
                    draggable: true,
                  });
      }
    } catch (error) {
      console.error("Error finalizing portfolio:", error);
      toast.error("Error submitting portfolio!", {
                  
                  closeOnClick: true,
                  draggable: true,
                });
    } finally {
      setFinalizing(false);
    }
  };

  const handleDeploy = async () => {
    console.log(user);
    setDeploying(true);
    try {
      const response = await axiosInstance.post(`/user/profile/deploy/${id}`,user);
      console.log(response);
      
      if (response?.data?.success) {
        // Handle successful deployment
        const deployLink = response.data.deployedLink;

        // Custom toast with button
        toast.info(
          <div>
            <p>Your deploy link is:</p>
            <a 
              href={deployLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 font-bold underline"
            >
              {deployLink}
            </a>
            <button
              onClick={() => window.open(deployLink, "_blank")}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            >
              Open
            </button>
          </div>,
          {
            position: "top-center",
            autoClose: 11000, // Keeps the toast open until the user interacts
            closeOnClick: true,
            draggable: false,
          }
        );    
        setTimeout(() => navigate("/"), 10000);

        }
    } catch (error) {
      console.error("Error deploying portfolio:", error);
      toast.error("Error deploying portfolio!", {
                  
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      setDeploying(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      {/* Fixed action buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDeploy}
          disabled={deploying}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white rounded-full shadow-lg hover:shadow-purple-500/20 
                     transition-all duration-300 disabled:opacity-70"
        >
          <Rocket className="w-5 h-5" />
          {deploying ? "Deploying..." : "Deploy Site"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFinalize}
          disabled={finalizing}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600
                     text-white rounded-full shadow-lg hover:shadow-blue-500/20
                     transition-all duration-300 disabled:opacity-70"
        >
          <CheckCircle className="w-5 h-5" />
          {finalizing ? "Saving..." : "Deploy later(Save)"}
        </motion.button>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-40"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <div className="glassmorphism px-10 pb-10">
        <div className="min-h-screen bg-[#0f0f0f]">
          <Cursor />
          <Navbar data={portfolioData?.basicProfile}/>
          <Hero data={portfolioData} />
          <Contact data={portfolioData} />
          <Education data={portfolioData?.educations}/>
          <Skills data={portfolioData?.skills} />
          <Experience data={portfolioData?.experiences} />
          <Portfolio data={portfolioData?.projects} />
          <CodingStats data={portfolioData?.basicProfile} />
          <Footer data={portfolioData?.basicProfile} />
        </div>
      </div>
    </div>
  );
}