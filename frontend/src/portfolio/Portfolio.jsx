import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineGithub, AiOutlineLink, AiOutlineEye } from 'react-icons/ai';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";



const ProjectButton = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ 
      scale: 1.05,
      y: -2,
      boxShadow: "0 15px 30px -5px rgba(147, 51, 234, 0.4)"
    }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-5 py-3 rounded-xl
             bg-gradient-to-r from-purple-600 to-pink-600
             hover:from-purple-500 hover:to-pink-500
             text-white font-semibold
             shadow-lg shadow-purple-900/30
             hover:shadow-xl hover:shadow-purple-600/40
             border border-purple-500/20
             backdrop-blur-md z-50
             group [&>*]:text-white" // Added [&>*]:text-white to force white text on all children
  >
    <span className="text-xl group-hover:scale-110 transition-transform text-white">
      {icon}
    </span>
    <span className="text-white">{label}</span>
  </motion.a>
);

const ProjectCard = ({ project, index, isHovered, onHover }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  const handleInteraction = () => {
    if (isTouchDevice) {
      setIsActive(!isActive);
    }
  };

  const showOverlay = isTouchDevice ? isActive : isHovered;

  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  onHoverStart={() => !isTouchDevice && onHover(index)}
  onHoverEnd={() => !isTouchDevice && onHover(null)}
  onClick={handleInteraction}
  className="group relative rounded-2xl 
             bg-[#030014]/80
             border border-purple-500/30
             hover:border-purple-500/50
             transition-all duration-500 
             min-h-[200px] w-full " // Added flex-col
>
  <div className="relative w-full">
    <motion.div
      className="w-full"
      initial={{ scale: 1 }}
      whileHover={!isTouchDevice && { scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-[250px]  bg-[#030014]/80 p-4"
        loading="lazy"
      />
    </motion.div>

  {/* Portfolio Details Section */}
  <motion.div className="bg-[#030014]/80 w-full p-4 flex flex-col">
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-xl font-bold text-blue-400">{project.title}</h2>
    </div>
    <p className="text-gray-300 mb-4 line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
  {project.description}
</p>

    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech, i) => (
        <span key={i} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm">
          {tech}
        </span>
      ))}
    </div>
  </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showOverlay ? 1 : 0,
            y: showOverlay ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t 
                     from-[#030014]/95 via-[#030014]/90 to-transparent
                     flex flex-col justify-end p-6
                     backdrop-blur-[2px]"
        >
          <h3 className="text-2xl font-bold mb-2 
                       bg-gradient-to-r from-purple-400 to-pink-400 
                       bg-clip-text text-transparent">
            {project.title}
          </h3>
          {/* <p className="text-gray-200 mb-6 text-base">
            {project.description}
          </p> */}
          <div className="flex gap-3">
            <ProjectButton 
              href={project.links.site} 
              icon={<AiOutlineEye />} 
              label="Demo" 
            />
            <ProjectButton 
              href={project.links.github} 
              icon={<AiOutlineGithub />} 
              label="Code" 
            />
          </div>

          
        </motion.div>
  
        {isTouchDevice && (
          <div className="absolute top-2 right-2 text-sm text-purple-400 bg-[#030014]/80 px-2 py-1 rounded">
            Tap to {isActive ? 'close' : 'view'} details
          </div>
        )}


      </div>
    </motion.div>
  );
};

const Portfolio = ({data}) => {
  const transformProjects = (data) => {
    return data.map((project, index) => ({
      img: project.imageUrl, // Assigning a dynamic variable name (you can modify this if needed)
      title: project.title,
      description: project.description,
      links: {
        site: project.demoUrl || "", // If demoUrl is empty, set as empty string
        github: project.githubUrl || "",
      },
      technologies: project.technologies || [], // Ensure technologies is always an array
    }));
  };
  const projects = transformProjects(data);
  
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesConfig = {
    particles: {
      color: { value: "#6b21a8" },
      links: {
        enable: true,
        color: "#6b21a8",
        opacity: 0.1,
      },
      move: {
        enable: true,
        speed: 0.6,
      },
      opacity: {
        value: 0.3,
      },
      size: {
        value: 2,
      },
    },
  };

  return (
    <div className="relative min-h-screen py-16 px-12" id="Projects">
      <Particles
        id="portfolioParticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 -z-10"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-[1200px] mx-auto"
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-6
                     bg-gradient-to-r from-purple-400 to-pink-400 
                     bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>
      

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isHovered={hoveredProject === index}
              onHover={setHoveredProject}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;