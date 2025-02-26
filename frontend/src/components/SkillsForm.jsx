import { motion } from "framer-motion";
import { ChevronDown, LucideBrainCircuit, Plus, Trash2 } from "lucide-react";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import category_skill from "../categories_skills";

const SkillsComponent = forwardRef((props, ref) => {
  const [isBasicExperienceOpen, setBasicExperienceOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [skillSections, setSkillSections] = useState([
    {
      categoryName: "",
      skills: [],
      selectedSkills: [],
    },
  ]);
  const [dropdownStates, setDropdownStates] = useState({
    categories: Array(5).fill(false),
    skills: {},
  });

  useImperativeHandle(ref, () => ({
    getData: () => 
      skillSections
        .filter(section => section.categoryName !== "")
        .map(section => ({
          categoryName: section.categoryName,
          selectedSkills: section.selectedSkills
        }))
  }));
  
  useEffect(() => {
    // Extract categories from the data
    const extractedCategories = Object.keys(category_skill);
    setCategories(extractedCategories);
  }, []);
  

  const toggleCategoryDropdown = (index) => {
    const newDropdownStates = { ...dropdownStates };
    newDropdownStates.categories[index] = !newDropdownStates.categories[index];
    setDropdownStates(newDropdownStates);
  };

  const toggleSkillsDropdown = (sectionIndex) => {
    const newDropdownStates = { ...dropdownStates };
    if (!newDropdownStates.skills[sectionIndex]) {
      newDropdownStates.skills[sectionIndex] = true;
    } else {
      newDropdownStates.skills[sectionIndex] =
        !newDropdownStates.skills[sectionIndex];
    }
    setDropdownStates(newDropdownStates);
  };

  const selectCategory = (sectionIndex, category) => {
    const newSections = [...skillSections];
    newSections[sectionIndex].categoryName = category;
    newSections[sectionIndex].skills = Object.keys(category_skill[category]);
    newSections[sectionIndex].selectedSkills = [];
    setSkillSections(newSections);

    // Close dropdown after selection
    const newDropdownStates = { ...dropdownStates };
    newDropdownStates.categories[sectionIndex] = false;
    setDropdownStates(newDropdownStates);
  };

  const selectSkill = (sectionIndex, skill) => {
    const newSections = [...skillSections];
    const selectedSkillIndex = newSections[
      sectionIndex
    ].selectedSkills.findIndex((s) => s.name === skill);

    if (selectedSkillIndex === -1) {
      // Add skill if not already selected
      const category = newSections[sectionIndex].categoryName;
      const emoji = category_skill[category][skill] || "";
      newSections[sectionIndex].selectedSkills.push({
        name: skill,
        level: 10,
        emoji: emoji,
      });
    }

    setSkillSections(newSections);

    // Close dropdown after selection
    const newDropdownStates = { ...dropdownStates };
    newDropdownStates.skills[sectionIndex] = false;
    setDropdownStates(newDropdownStates);
  };

  const updateSkillLevel = (sectionIndex, skillIndex, level) => {
    const newSections = [...skillSections];
    newSections[sectionIndex].selectedSkills[skillIndex].level = level;
    setSkillSections(newSections);
  };

  const removeSkill = (sectionIndex, skillIndex) => {
    const newSections = [...skillSections];
    newSections[sectionIndex].selectedSkills.splice(skillIndex, 1);
    setSkillSections(newSections);
  };

  const addSkillSection = () => {
    setSkillSections([
      ...skillSections,
      {
        categoryName: "",
        skills: [],
        selectedSkills: [],
      },
    ]);
  };

  const removeCategory = (index) => {
    const newSections = [...skillSections];
    if (newSections.length > 1) {
      newSections.splice(index, 1);
      setSkillSections(newSections);
    } else {
      // Reset the section instead of removing it
      newSections[0] = { categoryName: "", skills: [], selectedSkills: [] };
      setSkillSections(newSections);
    }
  };

  const addSkill = (sectionIndex) => {
    toggleSkillsDropdown(sectionIndex);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-4 ">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
            <LucideBrainCircuit
                                          size={16}
                                          className="text-gray-400 "
                                        />
          <span className="text-lg font-semibold">Skills</span>
        </div>
        <motion.div
          onClick={() => setBasicExperienceOpen(!isBasicExperienceOpen)}
          animate={{ rotate: isBasicExperienceOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3"
        >
          <BsChevronDown className="text-xl hover:text-blue-500 hover:drop-shadow-glow" />
        </motion.div>
      </div>
      <motion.div
        className="mb-4"
        initial={false}
        animate={{
          height: isBasicExperienceOpen ? "auto" : 0,
          opacity: isBasicExperienceOpen ? 1 : 0,
        }}
      >
        {skillSections.map((section, sectionIndex) => (
          <motion.div key={sectionIndex} className="mb-4">
            {/* Category Dropdown */}
            <div className="relative mb-4 ">
              <motion.div
                className="flex items-center focus:border-blue-500 focus:outline-none  justify-between p-3 border border-gray-700 rounded-lg cursor-pointer "
                onClick={() => toggleCategoryDropdown(sectionIndex)}
                tabIndex={0}
              >
                <span className="text-white">
                  {section.categoryName ||
                    "Category Name (e.g., Frontend, Backend)"}
                </span>
                <ChevronDown
                  className={`transition-transform  ${
                    dropdownStates.categories[sectionIndex] ? "rotate-180" : ""
                  }`}
                />
              </motion.div>

              {/* Category Dropdown Menu */}
              {dropdownStates.categories[sectionIndex] && (
                <div className="absolute z-10  w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg max-h-64 overflow-y-auto ">
                  {categories.map((category, idx) => (
                    <div
                      key={idx}
                      className="p-3 hover:bg-gray-700 cursor-pointer text-white"
                      onClick={() => selectCategory(sectionIndex, category)}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Skills */}
            {section.selectedSkills.map((skill, skillIndex) => (
              <div key={skillIndex} className="flex gap-3 items-center mb-3">
                <div className="flex-1">
                  <div className="flex items-center bg-gray-800 p-3 border border-gray-700 rounded-lg">
                    <span className="text-white">
                      {skill.emoji} {skill.name}
                    </span>
                  </div>
                </div>
                <div className="w-24 mr-2">
                  <input
                    type="number"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-center focus:border-blue-500 focus:outline-none"
                    value={skill.level}
                    onChange={(e) =>
                      updateSkillLevel(
                        sectionIndex,
                        skillIndex,
                        parseInt(e.target.value)
                      )
                    }
                    min="0"
                    max="10"
                  />
                </div>
                <button
                  className="p-3 text-red-500 hover:text-red-400"
                  onClick={() => removeSkill(sectionIndex, skillIndex)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {/* Add Skill Button and Dropdown */}
            {section.categoryName && (
              <div className="mb-4 relative">
                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center text-gray-400 hover:text-[#aa51fe]"
                    onClick={() => addSkill(sectionIndex)}
                  >
                    <Plus size={20} className="mr-1" />
                    Add Skill
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeCategory(sectionIndex)}
                    className="text-red-400 hover:text-red-300 font-medium"
                  >
                    Remove Category
                  </motion.button>
                </div>

                {/* Skills Dropdown */}
                {dropdownStates.skills[sectionIndex] &&
                  section.skills.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg max-h-64 overflow-y-auto">
                      {section.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="p-3 hover:bg-gray-700 cursor-pointer flex items-center"
                          onClick={() => selectSkill(sectionIndex, skill)}
                        >
                          <span className="mr-2">
                            {category_skill[section.categoryName][skill]}
                          </span>
                          <span className="text-white">{skill}</span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            )}
          </motion.div>
        ))}
        {/* Add Another Category Section */}
        <button
          className="flex items-center text-gray-400 hover:text-[#aa51fe] mt-6"
          onClick={addSkillSection}
        >
          <Plus size={20} className="mr-1" />
          Add Category
        </button>
      </motion.div>
    </div>
  );
});

export default SkillsComponent;
