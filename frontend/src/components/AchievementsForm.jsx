import { motion } from "framer-motion";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { BsChevronDown, BsPlus } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";

const AchievemetComponent = forwardRef((props, ref) => {
  const [isBasicAchievementsOpen, setBasicAchievementsOpen] = useState(true);

  const [achievements, setAchievement] = useState([
    {
      id: 1,
      title: "",
      issuer: "",
      date: "",
      description: "",
      url: "",
    },
  ]);

  const addAchievement = () => {
    const newId =
    achievements.length > 0
        ? Math.max(...achievements.map((exp) => exp.id)) + 1
        : 1;
    setAchievement([
      ...achievements,
      {
        id: newId,
        title: "",
      issuer: "",
      date: "",
      description: "",
      url: "",
      },
    ]);
  };

  const removeAchievement = (id) => {
    if (achievements.length > 0) {
      setAchievement(achievements.filter((exp) => exp.id !== id));
    }
  };

  const updateAchievement = (id, field, value) => {
    setAchievement(
        achievements.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

   useImperativeHandle(ref, () => ({
        getData: () => ({
            achievements
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
            <FaTrophy
                              size={12}
                              className="text-gray-400 "
                            />
          <span className="text-lg font-semibold">Achievements</span>
        </div>

        <motion.button
          initial={false}
          animate={{
            height:  isBasicAchievementsOpen ? "auto" : 0,
            opacity:  isBasicAchievementsOpen ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={addAchievement}
          className="text-white ml-auto flex items-center hover:text-blue-500 hover:drop-shadow-glow"
        >
          <BsPlus className="text-[25px]" />
        </motion.button>
        <motion.div
          onClick={() => setBasicAchievementsOpen(! isBasicAchievementsOpen)}
          animate={{ rotate:  isBasicAchievementsOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3"
        >
          <BsChevronDown className="text-xl hover:text-blue-500 hover:drop-shadow-glow" />
        </motion.div>
      </motion.button>

      {achievements.map((achievement) => (
        <motion.div
          key={achievement.id}
          initial={false}
          animate={{
            height:  isBasicAchievementsOpen ? "auto" : 0,
            opacity:  isBasicAchievementsOpen ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pr-10">
            <input
              type="text"
              placeholder="Achievement title"
              value={achievement.title}
              onChange={(e) =>
                updateAchievement(achievement.id, "title", e.target.value)
              }
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Issuer"
              value={achievement.issuer}
              onChange={(e) =>
                updateAchievement(achievement.id, "issuer", e.target.value)
              }
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

              <input
                type="date"
                placeholder="Date"
                value={achievement.date}
                onChange={(e) =>
                  updateAchievement(achievement.id, "date", e.target.value)
                }
                className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />


            <textarea
              placeholder="Description"
              value={achievement.description}
              onChange={(e) =>
                updateAchievement(achievement.id, "description", e.target.value)
              }
              rows={4}
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

<input
              type="text"
              placeholder="URL"
              value={achievement.url}
              onChange={(e) =>
                updateAchievement(achievement.id, "url", e.target.value)
              }
              className="w-full bg-gray-800 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => removeAchievement(achievement.id)}
              className="text-red-400 hover:text-red-300 font-medium"
            >
              Remove Achievement
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
});

export default AchievemetComponent;
