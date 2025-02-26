import User from '../model/UserSchema.js';
import Profile from "../model/profileSchema.js"


export const addProjectToUser = async (req, res) => {
  try {
    const  user  = req.body;
    const { projectId } = req.params;
    console.log(req.body);
    

    if (!projectId) {
      return res.status(400).json({ success: false, message: 'Project ID is required' });
    }
  
    // Find user by ID and update the projects array
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { projects: projectId } }, // Ensure unique project IDs
      { new: true } // Return the updated document
    ).populate('projects');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Project added successfully', user: updatedUser });
  } catch (error) {
    console.error('Error adding project to user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deployProfile = async (req, res) => {
  try {
    const user  = req.body;
    const { projectId } = req.params;
    console.log(req.body);

    if (!projectId) {
      return res.status(400).json({ success: false, message: "Profile ID is required" });
    }

    // Find profile by ID
    const profile = await Profile.findById(projectId);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    // Update deploy status
    const userName=user.username
    const deployedLink=process.env.FRONTEND_URL+"/"+userName+"/"+projectId+"/"
    console.log(deployedLink);
    
    profile.deployed = true;
    profile.deployedLink=deployedLink
    await profile.save();

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $addToSet: { projects: projectId } }, // Ensure unique project IDs
      { new: true } // Return the updated document
    ).populate('projects');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Profile deployed successfully', user: updatedUser,deployedLink:deployedLink });

  } catch (error) {
    console.error("Error deploying profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getUserWithProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    
    const user = await User.findById(userId).populate('projects');

    if (!user) {
      return res.status(404).json({success:false, message: 'User not found' });
    }

    res.status(200).json({success:true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: 'Internal server error' });
  }
};
