import { motion } from "framer-motion";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { BsChevronDown, BsPlus } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";

const EducationForm = forwardRef((props, ref) => {
  const [ isBasicEducationOpen,  setBasicEducationOpen] = useState(true);

  const [educations, setEducation] = useState([
    {
      id: 1,
      degree: "",
      school: "",
      startYear: "",
      endYear: "",
      location: "",
      grade: "",
      description: "",
    },
  ]);

  const addEducation = () => {
    const newId =
    educations.length > 0
        ? Math.max(...educations.map((exp) => exp.id)) + 1
        : 1;
    setEducation([
      ...educations,
      {
        id: newId,
        degree: "",
      school: "",
      startYear: "",
      endYear: "",
      location: "",
      grade: "",
      description: "",
      },
    ]);
  };

  const removeEducation = (id) => {
    if (educations.length > 0) {
      setEducation(educations.filter((exp) => exp.id !== id));
    }
  };

  const updateEducation = (id, field, value) => {
    setEducation(
        educations.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  useImperativeHandle(ref, () => ({
        getData: () => ({
          educations
        }),
      }));        

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-4 overflow-hidden"
    >

      <motion.button className="w-full flex items-center justify-between text-left mb-4">
        <div className="flex items-center gap-2">
        <FaGraduationCap
                  size={16}
                  className="text-gray-400 "
                />
          <span className="text-lg font-semibold">Educations</span>
        </div>

        <motion.button
          initial={false}
          animate={{
            height:  isBasicEducationOpen ? "auto" : 0,
            opacity:  isBasicEducationOpen ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={addEducation}
          className="text-white ml-auto flex items-center hover:text-blue-500 hover:drop-shadow-glow"
        >
          <BsPlus className="text-[25px]" />
        </motion.button>
        <motion.div
          onClick={() =>  setBasicEducationOpen(! isBasicEducationOpen)}
          animate={{ rotate:  isBasicEducationOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3"
        >
          <BsChevronDown className="text-xl hover:text-blue-500 hover:drop-shadow-glow" />
        </motion.div>
      </motion.button>

      {educations.map((education) => (
        <motion.div
          key={education.id}
          initial={false}
          animate={{
            height:  isBasicEducationOpen ? "auto" : 0,
            opacity:  isBasicEducationOpen ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pr-10">
            <input
              type="text"
              placeholder="Degree/Course"
              value={education.degree}
              onChange={(e) =>
                updateEducation(education.id, "degree", e.target.value)
              }
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="School/Institution"
              value={education.school}
              onChange={(e) =>
                updateEducation(education.id, "school", e.target.value)
              }
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-10">
              <input
                type="text"
                placeholder="Start Year"
                value={education.startYear}
                onChange={(e) =>
                  updateEducation(education.id, "startYear", e.target.value)
                }
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />

              <input
                type="text"
                placeholder="End Year"
                value={education.endYear}
                onChange={(e) =>
                  updateEducation(education.id, "endYear", e.target.value)
                }
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <input
                type="text"
                placeholder="Location"
                value={education.location}
                onChange={(e) =>
                  updateEducation(education.id, "location", e.target.value)
                }
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Grade/Score"
                value={education.grade}
                onChange={(e) =>
                  updateEducation(education.id, "grade", e.target.value)
                }
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />

            <textarea
              placeholder="Description"
              value={education.description}
              onChange={(e) =>
                updateEducation(education.id, "description", e.target.value)
              }
              rows={4}
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => removeEducation(education.id)}
              className="text-red-400 hover:text-red-300 font-medium"
            >
              Remove Education
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
});

export default EducationForm;
