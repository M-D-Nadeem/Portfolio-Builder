import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema({
    platform: String,
    username: String
});

const ExperienceSchema = new mongoose.Schema({
    role: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String
});

const SkillSchema = new mongoose.Schema({
    name: String,
    level: Number,
    emoji: String
});

const SkillCategorySchema = new mongoose.Schema({
    categoryName: String,
    selectedSkills: [SkillSchema]
});

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    technologies: [String],
    githubUrl: String,
    demoUrl: String,
    showTechDropdown: Boolean,
    newTech: String
});

const AchievementSchema = new mongoose.Schema({
    title: String,
    issuer: String,
    date: Date,
    description: String,
    url: String
});

const EducationSchema = new mongoose.Schema({
    degree: String,
    school: String,
    startYear: String,
    endYear: String,
    location: String,
    grade: String,
    description: String
});

const ProfileSchema = new mongoose.Schema({
    basicProfile: {
        fullName: String,
        email:String,
        yearOfExp:Number,
        noOfProjects:Number,
        titles: [String],
        bio: String,
        avatar: String,
        getHubUserName: String,
        leetcodeUserName: String,
        socialLinks: [SocialLinkSchema]
    },
    experiences: [ExperienceSchema],
    skills: [SkillCategorySchema],
    projects: [ProjectSchema],
    achievements: [AchievementSchema],
    educations: [EducationSchema],
    deployed:{type:Boolean,default:false},
    deployedLink:{type:String},
}, { timestamps: true });

export default mongoose.model("Profile", ProfileSchema);
