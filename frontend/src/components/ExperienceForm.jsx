import { motion } from "framer-motion";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { BsChevronDown, BsPersonVcardFill, BsPlus } from "react-icons/bs";

const ExperienceForm = forwardRef((props, ref) => {
  const [isBasicExperienceOpen, setBasicExperienceOpen] = useState(true);

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const addExperience = () => {
    const newId =
      experiences.length > 0
        ? Math.max(...experiences.map((exp) => exp.id)) + 1
        : 1;
    setExperiences([
      ...experiences,
      {
        id: newId,
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (id) => {
    if (experiences.length > 0) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    }
  };

  const updateExperience = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };
  useImperativeHandle(ref, () => ({
    getData: () => ({
      experiences,
    }),
  }));

  return (
    <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-4 "
    >
      <motion.button className="w-full flex items-center justify-between text-left mb-4">
        <div className="flex items-center gap-2">
          <BsPersonVcardFill size={16} className="text-gray-400 " />
          <span className="text-lg font-semibold">Experiences</span>
        </div>

        <motion.button
          initial={false}
          animate={{
            height: isBasicExperienceOpen ? "auto" : 0,
            opacity: isBasicExperienceOpen ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={addExperience}
          className="text-white ml-auto flex items-center hover:text-blue-500 hover:drop-shadow-glow"
        >
          <BsPlus className="text-[25px]" />
        </motion.button>
        <motion.div
          onClick={() => setBasicExperienceOpen(!isBasicExperienceOpen)}
          animate={{ rotate: isBasicExperienceOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3"
        >
          <BsChevronDown className="text-xl hover:text-blue-500 hover:drop-shadow-glow" />
        </motion.div>
      </motion.button>

      {experiences.map((experience) => (
        <motion.div
          key={experience.id}
          initial={false}
          animate={{
            height: isBasicExperienceOpen ? "auto" : 0,
            opacity: isBasicExperienceOpen ? 1 : 0,
          }}
          className=""
        >
          <div className="space-y-4 pr-10">
            <input
              type="text"
              placeholder="Role"
              value={experience.role}
              onChange={(e) =>
                updateExperience(experience.id, "role", e.target.value)
              }
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Company"
              value={experience.company}
              onChange={(e) =>
                updateExperience(experience.id, "company", e.target.value)
              }
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-10">
              <input
                type="date"
                placeholder="Start Date"
                value={experience.startDate}
                onChange={(e) =>
                  updateExperience(experience.id, "startDate", e.target.value)
                }
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />

              <input
                type="date"
                placeholder="End Date"
                value={experience.endDate}
                onChange={(e) =>
                  updateExperience(experience.id, "endDate", e.target.value)
                }
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <textarea
              placeholder="Description"
              value={experience.description}
              onChange={(e) =>
                updateExperience(experience.id, "description", e.target.value)
              }
              rows={4}
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => removeExperience(experience.id)}
              className="text-red-400 hover:text-red-300 font-medium"
            >
              Remove Experience
            </motion.button>
          </div>
        </motion.div>
      ))}
      </div>
  );
});

export default ExperienceForm;
