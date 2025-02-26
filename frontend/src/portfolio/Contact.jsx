import React, { useState, useEffect } from "react";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineMail,
  AiOutlineTwitter,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { SiGeeksforgeeks, SiGithub, SiGmail, SiLeetcode, SiLinkedin, SiMediamarkt } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

const StatsCard = ({ number, label }) => {
  const [count, setCount] = useState(0);
  const targetNumber = parseInt(number);

  useEffect(() => {
    let startTime;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 2000; // 2 seconds duration

      if (progress < 1) {
        setCount(Math.min(Math.floor(targetNumber * progress), targetNumber));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stats-${label}`);
    if (element) observer.observe(element);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [targetNumber]);

  return (
    <motion.div
      id={`stats-${label}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-purple-900/40 to-purple-800/30
               border border-purple-500/30 p-6 rounded-xl text-center
               hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]
               transition-all duration-300"
    >
      <motion.h4 className="text-3xl font-bold text-white mb-1">
        {count}
        {number.includes("+") ? "+" : ""}
      </motion.h4>
      <p className="text-purple-300 text-sm">{label}</p>
    </motion.div>
  );
};

const FormInput = ({ type, placeholder, name }) => (
  <motion.input
    whileFocus={{ scale: 1.02 }}
    type={type}
    placeholder={placeholder}
    name={name}
    className="w-full rounded-xl border border-purple-500/50 bg-purple-900/20
             py-3 px-4 text-gray-100 placeholder:text-gray-400
             focus:border-purple-400 focus:outline-none focus:ring-2 
             focus:ring-purple-500/20 transition-all duration-300"
  />
);

const FormTextarea = ({ placeholder, name }) => (
  <motion.textarea
    whileFocus={{ scale: 1.02 }}
    placeholder={placeholder}
    name={name}
    rows="4"
    className="w-full rounded-xl border border-purple-500/50 bg-purple-900/20
             py-3 px-4 text-gray-100 placeholder:text-gray-400
             focus:border-purple-400 focus:outline-none focus:ring-2 
             focus:ring-purple-500/20 transition-all duration-300
             resize-none"
  />
);

const Contact = ({data}) => {
  const platformIcons = {
      GeeksForGeeks: SiGeeksforgeeks,
      Leetcode: SiLeetcode,
      Email: SiGmail,
      Twitter:FaTwitter,
      Linkedin: SiLinkedin,
      GitHub: SiGithub,
      Other: SiMediamarkt, // Generic icon for 'Other' platforms
    };
    
    // Convert original data with corresponding icons
    const socialLinksWithIcons = data.basicProfile.socialLinks.map((link) => ({
      icon: platformIcons[link.platform] || SiMediamarkt, // Default to a globe icon if no match
      platform: link.platform,
      username: link.platform === "Email" ? `mailto:${link.username}` : link.username, // Ensure mailto: for email
    }));
    
   console.log(socialLinksWithIcons);
   
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
    <div className="relative min-h-screen py-20 px-4 pb-0" id="About">
      <Particles
        id="contactParticles"
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
        <div className="text-center mb-5">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            About me
          </motion.h2>
          
        </div>

        <div className=" gap-12 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div
              className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 backdrop-blur-md
                          border border-purple-500/30 p-8 rounded-2xl
                          transform hover:-translate-y-1 transition-all duration-300
                          hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] grid gap-4"
            >
              {/* <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </h3> */}
              <p className="text-gray-300 leading-relaxed">
                {data.basicProfile.bio}
              </p>
            

            <div className="flex flex-wrap gap-4 justify-center">
              {socialLinksWithIcons.map(({ platform, username, icon: Icon }, index) => (
                <motion.a
                  key={index}
                  title={platform}
                  href={username}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gradient-to-br from-purple-900/40 to-purple-800/30
                           border border-purple-500/30 p-4 rounded-xl
                           text-purple-400 text-2xl
                           hover:text-purple-300 transition-all duration-300
                           hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
          <Icon className="w-6 h-6 text-white group-hover:text-purple-500 transition-colors" />
          </motion.a>
              ))}
            </div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
            >
              <StatsCard number={data.basicProfile.noOfProjects!=null?data.basicProfile.noOfProjects+"+" : "0"} label="Projects" />
              <StatsCard number={data.basicProfile.yearOfExp!=null?data.basicProfile.yearOfExp+"+" : "0"} label="Years Experience" />
            </motion.div>
            </div>
          </motion.div>

          
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
