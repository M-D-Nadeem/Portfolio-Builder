import { uploadImage } from "../controllers/helperController.js";
import express from 'express';
const helperRouter = express.Router();
import multer from 'multer';

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Route for image upload
helperRouter.post('/upload', upload.single('image'), uploadImage);

export default helperRouter