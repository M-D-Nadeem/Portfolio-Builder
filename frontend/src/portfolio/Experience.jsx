import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';

const Experience = ({ data }) => {
  const transformExperiences = (data) => {
    return data.map((exp) => ({
      company: exp.company,
      start: formatDate(exp.startDate),
      end: exp.endDate ? formatDate(exp.endDate) : "Present",
      description: exp.description.trim(),
    }));
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const experiences = transformExperiences(data);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div id='Experience'  className="min-h-screen px-8 pt-0 pb-0 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 gap-2 flex items-center"
        >
          <div className="p-2 rounded-lg bg-purple-500/10 ">
            <Briefcase className="w-8 h-8 text-purple-500" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h1>
        </motion.div>

        {/* Experience cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col items-center w-full"
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block" />

          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative w-full max-w-[500px] mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 -ml-2 top-6 w-4 h-4 rounded-full bg-purple-500 hidden md:block" />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glassmorphism border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm
                         hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 className="text-2xl font-bold text-purple-400">
                    {experience.company}
                  </h2>
                  <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{experience.start} - {experience.end}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {experience.description}
                </p>
                
                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;