import Profile from "../model/profileSchema.js"

const createProfile = async (req, res) => {
    try {
        const profile = new Profile(req.body);
        console.log(req.body);
        
        await profile.save();
        res.status(201).json({success:true,profile});
    } catch (error) {
        res.status(400).json({success:false, error: error.message });
    }
};

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json({success:true,profiles});
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({success:false, message: "Profile not found" });
        }
        res.status(200).json({success:true,profile});
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({success:false, message: "Profile not found" });
        }
        res.status(200).json({success:true, message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({success:false, error: error.message });
    }
};

export { Profile, createProfile, getAllProfiles, getProfileById, deleteProfile };
