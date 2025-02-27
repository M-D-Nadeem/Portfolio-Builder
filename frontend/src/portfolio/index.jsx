
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hero from "./Hero";
import Skills from "./Skills";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Cursor from "./Cursor";
import CodingStats from "./CodingStats";
import { motion, useScroll, useSpring } from "framer-motion";
import Loading from "./Loading";
import Experience from "./Experience";
import "../App.css"
import axiosInstance from "../helper/axiosInstance";
import Education from "./Education";

export default function PortfolioMain() {
        const { name } = useParams();
  const { id } = useParams(); // Extract the portfolio ID from URL
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // let name="";
    if(user){
      name=user.fullName
    }   
    console.log(name);
    
    const fetchPortfolio = async () => {
      try {
        const response = await axiosInstance.get(`/profile/deployed/get/${name}/${id}`);
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

  if (loading) {
    return <Loading />;
  }

  return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
          style={{ scaleX }}
        />
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
  );
}
