import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import "../App.css"

// const educationData = [
//   {
//     degree: "BTECH CSE",
//     institution: "Manipal University Jaipur",
//     duration: "2023 - 2027",
//     location: "Jaipur",
//     rating: "9.4",
//   },
//   {
//     degree: "High School",
//     institution: "Delhi Public School",
//     duration: "2021 - 2023",
//     location: "Delhi",
//     rating: "9.2",
//   },
//   {
//     degree: "High School",
//     institution: "Delhi Public School",
//     duration: "2021 - 2023",
//     location: "Delhi",
//     rating: "9.2",
//   }
// ];

const EducationCard = ({ education, index, isLast }) => {
  return (
    <div className="relative">
      {!isLast && (
        <div 
          className="absolute left-6 top-24 w-1 h-24 
                     bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 
                     rounded-full shadow-lg shadow-purple-500/50 
                     animate-pulse"
        />
      )}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        whileHover={{ scale: 1.03 }}
        className="glassmorphism rounded-xl p-6 relative overflow-hidden group 
                   bg-gray-900/30 backdrop-blur-lg shadow-lg border border-gray-700
                   hover:shadow-purple-500/20 transition-all duration-300"
      >
        <motion.div 
          className="absolute inset-0 bg-purple-500/10 opacity-0 
                     group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className="flex items-start gap-6">
          <div className="bg-blue-900/40 p-3 rounded-xl relative z-10">
            <Building2 className="w-8 h-8 text-blue-400" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 
                className="text-2xl font-bold text-white 
                           bg-gradient-to-r from-purple-400 to-pink-400 
                           bg-clip-text text-transparent drop-shadow-lg tracking-wide"
              >
                {education.degree}
              </h3>
              
            </div>
            
            <h4 className="text-blue-500 text-lg mt-1">{education.institution}</h4>
            
            <div className="flex items-center gap-4 mt-3 text-gray-400">
              <span className="text-sm">{education.startYear} - {education.endYear}</span>
              <span className="text-sm">{education.location}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Education = ({data}) => {
    const transformExperiences = (data) => {
        return data.map((edu) => ({
            degree: edu.degree,
            institution: edu.school,
          location:edu.location,
          start: edu.startYear,
          end: edu.endYear,
          description: edu.description,
        }));
      };
      const educationData = transformExperiences(data);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div id='Education' className="min-h-screen flex  flex-col items-center justify-center px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -left-16 top-0 w-12 h-12 bg-blue-900/40 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30"
        >
          <Building2 className="w-8 h-8 text-purple-500" />
        </motion.div>
        <h1
          className="text-5xl mb-6 font-bold text-center
                     bg-gradient-to-r from-purple-400 to-pink-400 
                     bg-clip-text text-transparent drop-shadow-lg"
        >
          Education
        </h1>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 max-w-2xl w-full"
      >
        {educationData.map((education, index) => (
          <EducationCard 
            key={`${education.degree}-${index}`}
            education={education} 
            index={index}
            isLast={index === educationData.length - 1}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Education;
