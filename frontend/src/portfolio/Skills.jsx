import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TechCard = ({ item, index }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  const handleInteraction = () => {
    if (isTouchDevice) {
      setIsActive(!isActive);
    }
  };

  const isAnimated = isTouchDevice ? isActive : undefined;
  console.log(item.bgColor);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!isTouchDevice ? { y: -5, scale: 1.05 } : undefined}
      animate={isAnimated ? { y: -5, scale: 1.05 } : { y: 0, scale: 1 }}
      onClick={handleInteraction}
      className={`relative group p-6 rounded-xl backdrop-blur-sm
                  border border-white/10 ${item.bgColor} 
                  hover:border-white/20 transition-all duration-300
                  flex flex-col items-center gap-3 cursor-pointer`}
    >
      <motion.div
        whileHover={!isTouchDevice ? { rotate: 360 } : undefined}
        animate={isAnimated ? { rotate: 360 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className={`text-5xl md:text-6xl ${item.color}`}
      >
        {item.icon}
      </motion.div>
      <span className={`font-medium ${item.color} text-sm md:text-base`}>
        {item.name}
      </span>
    </motion.div>
  );
};

const Skills = ({ data }) => {
 const getRandomColor = () => {
  // More beautiful, harmonious tech-inspired colors with improved contrast
  const colors = [
    "#E34F26",  // HTML5 orange
    "#1572B6",  // CSS3 blue
    "#61DAFB",  // React light blue
    "#3776AB",  // Python blue
    "#06B6D4",  // Tailwind cyan
    "#F05032",  // Git orange-red
    "#FF6F00",  // TensorFlow orange
    "#007396",  // Java blue
    "#00599C",  // C++ blue
    "#F7DF1E",  // JavaScript yellow
    "#47A248",  // MongoDB green
    
       "#CB3837",  // npm red
  ];
  
  // Return a random color from our expanded curated palette
  return colors[Math.floor(Math.random() * colors.length)];
};

  // Flatten skills from categories and format them
  const formattedSkills = data.flatMap(category => 
    category.selectedSkills.map(skill => {
      const color = getRandomColor();
      return {
        name: skill.name,
        icon: skill.emoji,
        color: `text-[${color}]`,
        bgColor: `bg-[${color}]/10`
      };
    })
  );

  return (
    <div className="relative  min-h-screen py-20 px-4" id="Skills">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I love working with these technologies to build amazing things.
            Always excited to learn and explore more!
          </p>
        </motion.div>

        <div className="grid px-12 grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {formattedSkills.map((item, index) => (
            <TechCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
