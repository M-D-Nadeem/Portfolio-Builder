
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import AchievemetComponent from "../components/AchievementsForm";
import BasicProfileContainer from "../components/BasicProfileForm";
import EducationForm from "../components/EducationForm";
import ExperienceForm from "../components/ExperienceForm";
import Header from "../components/Header";
import ProjectsComponent from "../components/ProjectForm";
import SkillsComponent from "../components/SkillsForm";
import axiosInstance from "../helper/axiosInstance";
import Footer from "../components/Footer";


export default function InputForm() {
  const navigate = useNavigate();
  const [isPreviewLocked, setIsPreviewLocked] = useState(false);
  // Refs to access child components
  const basicProfileRef = useRef();
  const experienceRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const achievementsRef = useRef();
  const educationRef = useRef();

  const handleSubmit = () => {
    // Collect data from child components
    const basicProfileData = basicProfileRef.current?.getData();
    const experienceData = experienceRef.current?.getData();
    const skillsData = skillsRef.current?.getData();
    const projectsData = projectsRef.current?.getData();
    const achievementsData = achievementsRef.current?.getData();
    const educationData = educationRef.current?.getData();

    // Combine all data
    const formData = {
            basicProfile: basicProfileData,
            ...experienceData,
            skills: skillsData,
            ...projectsData,
            ...achievementsData,
            ...educationData,
          };    
     
    // Save to localStorage
    localStorage.setItem("portfolioData", JSON.stringify(formData));

    toast.success("Your response has been recorded, please preview portfolio!", {
      // position: "top-center",
      // autoClose: 3000,
      // hideProgressBar: false,
      closeOnClick: true,
      // pauseOnHover: true,
      draggable: true,
    });


  };
  

  const handlePreviewPortfolio = async () => {
    // if (!isPreviewLocked) {
      if (
        window.confirm("⚠️ You can't update after this action. Click OK to proceed.")
      ) {
        setIsPreviewLocked(true);

    const basicProfileData = basicProfileRef.current?.getData();
    const experienceData = experienceRef.current?.getData();
    const skillsData = skillsRef.current?.getData();
    const projectsData = projectsRef.current?.getData();
    const achievementsData = achievementsRef.current?.getData();
    const educationData = educationRef.current?.getData();

    // Combine all data
    const formData = {
            basicProfile: basicProfileData,
            ...experienceData,
            skills: skillsData,
            ...projectsData,
            ...achievementsData,
            ...educationData,
          };    
        // Retrieve saved formData from localStorage
        const savedFormData = formData;
        console.log(savedFormData);
        localStorage.setItem("portfolioData", JSON.stringify(formData));
        console.log(savedFormData);
        
        try {
          const response=await axiosInstance.post("/profile/create", savedFormData);
          console.log(response);
          
          if(response?.data?.success){
            const profileId = response?.data?.profile?._id; // Extract _id from response
          toast.success("🚀 Portfolio submitted successfully!", {
            position: "top-center",
            // autoClose: 2000,
            // hideProgressBar: false,
            closeOnClick: true,
            // pauseOnHover: true,
            draggable: true,
          });

          setTimeout(() => navigate(`/previewProfile/${profileId}`), 2000);
        }else{
          toast.error("Error submitting portfolio!", {
            
            closeOnClick: true,
            draggable: true,
          });
        }
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Error submitting portfolio!", {
            
            closeOnClick: true,
            draggable: true,
          });
        // }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle,theme(colors.purple.900)_0%,theme(colors.gray.900)_35%)] text-white">
      <Header />
      <div className="min-h-screen p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Edit Portfolio</h1>

          <BasicProfileContainer ref={basicProfileRef} />
          <ExperienceForm ref={experienceRef} />
          <SkillsComponent ref={skillsRef} />
          <ProjectsComponent ref={projectsRef} />
          <AchievemetComponent ref={achievementsRef} />
          <EducationForm ref={educationRef} />

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            onClick={handleSubmit}
            disabled={isPreviewLocked}
          >
            Submit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 mt-4 ml-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            onClick={handlePreviewPortfolio}
          >
            Preview Portfolio
          </motion.button>
        </motion.div>

      </div>
      <Footer />

    </div>
  );
}
