import express from "express"
import { createProfile, deleteProfile, getAllProfiles, getProfileById } from "../controllers/profileControllers.js"
const ProfileRouter=express.Router()

 
ProfileRouter.post("/create",createProfile)
ProfileRouter.get("/get",getAllProfiles) 
ProfileRouter.get("/get/:id",getProfileById)
ProfileRouter.get("/deployed/get/:name/:id",getProfileById)

ProfileRouter.delete("/delete",deleteProfile)  

export default ProfileRouter