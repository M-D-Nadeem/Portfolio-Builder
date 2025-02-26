import express from "express"
import { login, logout, signup } from "../controllers/authController.js";
import { addProjectToUser, deployProfile, getUserWithProjects } from "../controllers/userController.js";
const router=express.Router()


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/profile/finalize/:projectId', addProjectToUser);
router.post('/profile/deploy/:projectId', deployProfile);

router.get('/profile/getAll/:userId', getUserWithProjects);


export default router

