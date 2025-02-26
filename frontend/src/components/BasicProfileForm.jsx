import { motion } from "framer-motion";
import { forwardRef, useImperativeHandle, useState } from "react";
import { BsChevronDown, BsGithub, BsPlus } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import axiosInstance from "../helper/axiosInstance";

const InputField = ({ label, placeholder, value, onChange, multiline }) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-300 mb-2">{label}</label>
    {multiline ? (
      <textarea
        className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
      />
    ) : (
      <input
        type="text"
        className="w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

const BasicProfileContainer = forwardRef((props, ref) => {
  const [isBasicProfileOpen, setBasicProfileOpen] = useState(true);
  const [getHubUserName, setGetHubUserName] = useState("");
  const [leetcodeUserName, setLeetcodeUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [yearOfExp, setYearOfExp] = useState(0);
  const [noOfProjects, setNoOfProjects] = useState(0);

  const [titles, setTitles] = useState([{ id: Date.now(), value: "" }]);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  const [socialLinks, setSocialLinks] = useState([
    { id: Date.now(), platform: "GeeksForGeeks", username: "" },
  ]);

  const addSocialLink = () => {
    setSocialLinks([
      ...socialLinks,
      { id: Date.now(), platform: "GeeksForGeeks", username: "" },
    ]);
  };

  const removeSocialLink = (id) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

  const updateSocialLink = (id, field, value) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const addProfessionalTitle = () => {
    setTitles([...titles, { id: Date.now(), value: "" }]);
  };

  const removeProfessionalTitle = (id) => {
    if (titles.length > 1) {
      setTitles(titles.filter((title) => title.id !== id));
    }
  };

  const updateTitle = (id, value) => {
    setTitles(
      titles.map((title) => (title.id === id ? { ...title, value } : title))
    );
  };

  useImperativeHandle(ref, () => ({
    getData: () => ({
      fullName,
      email,
      yearOfExp,
      noOfProjects,
      titles: titles.map((t) => t.value),
      bio,
      avatar,
      getHubUserName,
      leetcodeUserName,
      socialLinks,
    }),
  }));

  console.log(avatar);

  return (
    <motion.div className="bg-gray-800  bg-opacity-50 pr-6 rounded-lg mb-4 ">
      <motion.button
        className="w-full p-4 flex  items-center justify-between text-left"
        onClick={() => setBasicProfileOpen(!isBasicProfileOpen)}
      >
        <div className="flex items-center gap-2">
          <IoPersonAdd size={16} className="text-gray-400 " />
          <span className="text-lg font-semibold">Basic Profile</span>
        </div>
        <motion.div
          animate={{ rotate: isBasicProfileOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className=""
        >
          <BsChevronDown className="text-xl hover:text-blue-500 hover:drop-shadow-glow" />
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isBasicProfileOpen ? "auto" : 0,
          opacity: isBasicProfileOpen ? 1 : 0,
        }}
        className=" "
      >
        <div className="p-4 pt-0">
          <InputField
            label="Full Name"
            placeholder="Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <InputField
            label="Email id"
            placeholder="Exter your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Professional Title with Add Button */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-gray-300">
                Professional Title {"(provide atleast 2)"}
              </label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-blue-500 hover:bg-gray-800 hover:border-gray-700 hover:rounded-lg"
                onClick={addProfessionalTitle}
              >
                <BsPlus className="text-2xl" />
              </motion.button>
            </div>
          </div>

          {/* Professional Title Fields */}
          {titles.map((titleItem) => (
            <div key={titleItem.id} className="flex items-center gap-2 mb-4">
              <input
                type="text"
                className="flex-1 bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
                placeholder="Enter Professional Title"
                value={titleItem.value}
                onChange={(e) => updateTitle(titleItem.id, e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-red-500 hover:bg-gray-800 hover:border-gray-700 hover:rounded-lg p-2"
                onClick={() => removeProfessionalTitle(titleItem.id)}
                disabled={titles.length <= 1}
              >
                <BsPlus className="text-2xl rotate-45" />
              </motion.button>
            </div>
          ))}

          <InputField
            label="Bio"
            placeholder="Some bio or not"
            multiline
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <label className="block text-sm text-gray-300 mb-2">Avatar</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="w-full mb-1 bg-gray-800 rounded-lg p-3 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  try {
                    setIsUploading(true);
                    setUploadError("");
                    
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
                    setAvatar(imageUrl);
                  } catch (error) {
                    console.error("Error uploading image:", error);
                    setUploadError(
                      error.response?.data?.error || 
                      "Failed to upload image. Please try again."
                    );
                  } finally {
                    setIsUploading(false);
                  }
                }
              }}
              disabled={isUploading}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 rounded-lg">
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                  <span className="text-sm text-white">Uploading...</span>
                </div>
              </div>
            )}
          </div>
          
          {uploadError && (
            <div className="text-red-500 text-sm mt-1 mb-2">{uploadError}</div>
          )}

          {/* Preview the uploaded image */}
          {avatar && !isUploading && (
            <img
              src={avatar}
              alt="Avatar Preview"
              className="mt-2 w-24 h-24 rounded-full mb-4 object-cover border border-gray-700"
            />
          )}

          {/* GitHub Username Input with Icon */}
          <label className="block text-sm text-gray-300 mb-2">
            GitHub Username
          </label>
          <div
            className="flex mb-4 items-center focus-within:border-blue-500 focus-within:outline-none gap-2 border border-gray-700 rounded-lg p-3 bg-gray-800"
            tabIndex={0}
          >
            <input
              type="text"
              placeholder="Your GitHub Username(Ex: M-D-Nadeem)"
              className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              value={getHubUserName}
              onChange={(e) => setGetHubUserName(e.target.value)}
            />
            {getHubUserName && (
              <BsGithub className="text-2xl text-gray-500 transition-all hover:text-white hover:drop-shadow-glow" />
            )}
          </div>
          {/* Leetcode username */}
          <label className="block text-sm text-gray-300 mb-2">
            Leetcode Username
          </label>
          <div className="flex mb-4 focus-within:border-blue-500 focus-within:outline-none items-center gap-2 border border-gray-700 rounded-lg p-3 bg-gray-800">
            <input
              type="text"
              placeholder="Your Leetcode Username(Ex: M-D-Nadeem)"
              className="w-full bg-transparent outline-none text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              value={leetcodeUserName}
              onChange={(e) => setLeetcodeUserName(e.target.value)}
            />
            {leetcodeUserName && (
              <SiLeetcode className="text-2xl text-gray-500 transition-all hover:text-white hover:drop-shadow-glow" />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Years of experience
            </label>
            <input
              type="number"
              className="flex-1 w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="Enter years of experience you have"
              value={yearOfExp}
              onChange={(e) => setYearOfExp(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Number of projects worked on
            </label>
            <input
              type="number"
              className="flex-1 w-full bg-gray-800 rounded-lg p-3 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="Enter number of projects you worked on"
              value={noOfProjects}
              onChange={(e) => setNoOfProjects(e.target.value)}
            />
          </div>

          {/* Social Links Section */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Social Links</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-blue-500 hover:bg-gray-800 hover:border-gray-700 hover:rounded-lg"
              onClick={addSocialLink}
            >
              <BsPlus className="text-2xl" />
            </motion.button>
          </div>

          {socialLinks.map((link) => (
            <div key={link.id} className="flex items-center gap-4 mb-2">
              <select
                className="bg-gray-800 rounded-lg p-2 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                value={link.platform}
                onChange={(e) =>
                  updateSocialLink(link.id, "platform", e.target.value)
                }
              >
                <option>GitHub</option>
                <option>Leetcode</option>
                <option>GeeksForGeeks</option>
                <option>Linkdin</option>
                <option>Email</option>
                <option>Twitter</option>
                <option>Other</option>
              </select>
              <input
                type="text"
                className="flex-1 bg-gray-800 rounded-lg p-2 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
                placeholder={`Enter the link`}
                value={link.username}
                onChange={(e) =>
                  updateSocialLink(link.id, "username", e.target.value)
                }
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-red-500 hover:bg-gray-800 hover:border-gray-700 hover:rounded-lg"
                onClick={() => removeSocialLink(link.id)}
              >
                <BsPlus className="text-2xl rotate-45" />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
});

export default BasicProfileContainer;