import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Plus, Trash2 } from "lucide-react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { BsChevronDown, BsPlus } from "react-icons/bs";
import { FaAngular, FaNode, FaProjectDiagram, FaPython, FaReact, FaVuejs } from "react-icons/fa";
import {
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import axiosInstance from "../helper/axiosInstance";

const ProjectsComponent = forwardRef((props, ref) => {
  const [isBasicProjectOpen, setBasicProjectOpen] = useState(true);
  const [uploadErrors, setUploadErrors] = useState({}); // Object to track errors per project
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "",
      description: "",
      imageUrl: "",
      technologies: [],
      githubUrl: "",
      demoUrl: "",
      showTechDropdown: false,
      isUploading: false, // Track uploading state per project
    },
  ]);

  // Tech stack with icons
  const techStack = {
    React: <FaReact />,
    "Node.js": <FaNode />,
    "Vue.js": <FaVuejs />,
    Angular: <FaAngular />,
    Python: <FaPython />,
    "Tailwind CSS": <SiTailwindcss />,
    TypeScript: <SiTypescript />,
    JavaScript: <SiJavascript />,
    MongoDB: <SiMongodb />,
    Firebase: <SiFirebase />,
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now(),
        title: "",
        description: "",
        imageUrl: "",
        technologies: [],
        githubUrl: "",
        demoUrl: "",
        showTechDropdown: false,
        isUploading: false, // Initialize upload state for new project
      },
    ]);
  };

  const removeProject = (id) => {
    if (projects.length > 1) {
      setProjects(projects.filter((project) => project.id !== id));
      
      // Also remove any upload errors for this project
      const newUploadErrors = { ...uploadErrors };
      delete newUploadErrors[id];
      setUploadErrors(newUploadErrors);
    } else {
      // Reset the project instead of removing it
      setProjects([
        {
          id: Date.now(),
          title: "",
          description: "",
          imageUrl: "",
          technologies: [],
          githubUrl: "",
          demoUrl: "",
          showTechDropdown: false,
          isUploading: false,
        },
      ]);
      setUploadErrors({});
    }
  };

  const toggleTechDropdown = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].showTechDropdown =
      !updatedProjects[index].showTechDropdown;
    setProjects(updatedProjects);
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const setProjectUploadingState = (index, isUploading) => {
    const updatedProjects = [...projects];
    updatedProjects[index].isUploading = isUploading;
    setProjects(updatedProjects);
  };

  const addTechnology = (projectIndex, tech) => {    
    const updatedProjects = [...projects];
    if (!updatedProjects[projectIndex].technologies.includes(tech)) {
      updatedProjects[projectIndex].technologies.push(tech);
    }
    updatedProjects[projectIndex].showTechDropdown = false;
    setProjects(updatedProjects);
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies.splice(techIndex, 1);
    setProjects(updatedProjects);
  };

  useImperativeHandle(ref, () => ({
        getData: () => ({
          projects: projects.map(({ isUploading, showTechDropdown, newTech, ...rest }) => rest) // Remove internal state properties
        }),
      }));    
  console.log(projects);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 bg-opacity-50 mb-4 overflow-hidden text-white p-4 rounded-lg "
    >
      <motion.button className="w-full flex items-center justify-between text-left mb-4">
        <div className="flex items-center gap-2">
            <FaProjectDiagram
                              size={16}
                              className="text-gray-400 "
                            />
          <span className="text-lg font-semibold">Projects</span>
        </div>

        <motion.button
          initial={false}
          animate={{
            height: isBasicProjectOpen ? "auto" : 0,
            opacity: isBasicProjectOpen ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={addProject}
          className="text-white ml-auto flex items-center hover:text-blue-500 hover:drop-shadow-glow"
        >
          <BsPlus className="text-[25px]" />
        </motion.button>
        <motion.div
          onClick={() => setBasicProjectOpen(!isBasicProjectOpen)}
          animate={{ rotate: isBasicProjectOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3"
        >
          <BsChevronDown className="text-xl hover:text-blue-500 hover:drop-shadow-glow" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={false}
            animate={{
              height: isBasicProjectOpen ? "auto" : 0,
              opacity: isBasicProjectOpen ? 1 : 0,
            }}
            className="mb-12 pr-10 border-b border-gray-700 pb-8 "
          >
            <div className="space-y-4">
              {/* Project Title */}
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => updateProject(index, "title", e.target.value)}
                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg   focus:border-blue-500 focus:outline-none"
              />

              {/* Project Description */}
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                rows={4}
                className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg   focus:border-blue-500 focus:outline-none resize-none"
              />

              {/* Project Image Upload */}
              <label className="block text-sm text-gray-300">Project Image URL</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full mb-1 bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      try {
                        // Set uploading state for this specific project
                        setProjectUploadingState(index, true);
                        
                        // Clear any previous errors for this project
                        const newUploadErrors = { ...uploadErrors };
                        delete newUploadErrors[project.id];
                        setUploadErrors(newUploadErrors);
                        
                        // Create a FormData object to send the file
                        const formData = new FormData();
                        formData.append("image", file);
    
                        // Send the image to your backend
                        const response = await axiosInstance.post(
                          "/api/helper/upload",
                          formData,
                          {
                            headers: {
                              "Content-Type": "multipart/form-data",
                            },
                          }
                        );
    
                        const { imageUrl } = response.data;
                        updateProject(index, "imageUrl", imageUrl);

                      } catch (error) {
                        console.error("Error uploading image:", error);
                        // Set error for this specific project
                        setUploadErrors({
                          ...uploadErrors,
                          [project.id]: error.response?.data?.error || 
                            "Failed to upload image. Please try again."
                        });
                      } finally {
                        // Reset uploading state for this specific project
                        setProjectUploadingState(index, false);
                      }
                    }
                  }}
                  disabled={project.isUploading}
                />
                {project.isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                      <span className="text-sm text-white">Uploading...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Display error if any */}
              {uploadErrors[project.id] && (
                <div className="text-red-500 text-sm mt-1 mb-2">{uploadErrors[project.id]}</div>
              )}

              {/* Preview the uploaded image */}
              {project.imageUrl && !project.isUploading && (
                <img
                  src={project.imageUrl}
                  alt="Project Preview"
                  className="mt-2 w-24 h-24 rounded-lg mb-4 object-cover border border-gray-700"
                />
              )}


              {/* Technologies Section */}
              <div className="mt-4">
                <h3 className="text-sm text-gray-400 mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span className="text-blue-400">{techStack[tech]}</span>
                      <span>{tech}</span>
                      <button
                        onClick={() => removeTechnology(index, techIndex)}
                        className="ml-1 text-gray-500 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Technology dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleTechDropdown(index)}
                    className="flex items-center gap-1 text-gray-400 hover:text-[#aa51fe] transition-colors"
                  >
                    <Plus size={16} />
                    Add Technology
                  </button>

                  {project.showTechDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-10 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
                    >
                      {/* Input for adding new technology */}
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Add new technology"
                          className="w-full bg-gray-700 bg-opacity-50 rounded-lg p-3 px-0 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-non"
                          value={project.newTech || ""}
                          onChange={(e) =>
                            updateProject(index, "newTech", e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && project.newTech?.trim()) {
                              techStack[project.newTech.trim()] = null; // Add new tech (without an icon initially)
                              addTechnology(
                                index,
                                project.newTech.trim()
                              );
                              updateProject(index, "newTech", ""); // Clear input after adding
                            }
                          }}
                        />
                      </div>

                      {/* Existing Technologies */}
                      <div className="p-2 max-h-48 overflow-y-auto">
                        {Object.keys(techStack).map((tech) => (
                          <div
                            key={tech}
                            onClick={() => addTechnology(index, tech)}
                            className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
                          >
                            <span className="text-blue-400">
                              {techStack[tech] || "🔹"}
                            </span>
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Project GitHub URL */}
              <div className="flex items-center gap-2">
                <Github
                  size={16}
                  className="text-gray-400 hover:text-white hover:drop-shadow-glow"
                />
                <input
                  type="text"
                  placeholder="Project GitHub URL"
                  value={project.githubUrl}
                  onChange={(e) =>
                    updateProject(index, "githubUrl", e.target.value)
                  }
                  className="flex-1 p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg   focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Demo URL */}
              <div className="flex items-center gap-2">
                <ExternalLink
                  size={16}
                  className="text-gray-400 hover:text-white hover:drop-shadow-glow"
                />
                <input
                  type="text"
                  placeholder="Demo URL"
                  value={project.demoUrl}
                  onChange={(e) =>
                    updateProject(index, "demoUrl", e.target.value)
                  }
                  className="flex-1 p-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg   focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Remove Project Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => removeProject(project.id)}
                className="text-red-400 hover:text-red-300 mt-4 transition-colors"
              >
                Remove Project
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
});

export default ProjectsComponent;