// controllers/uploadController.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (req, res) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Convert buffer to base64 string for Cloudinary
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileStr, {
      folder: 'profile_images', 
      resource_type: 'auto',
    });

    return res.status(200).json({ 
      imageUrl: uploadResult.secure_url,
      public_id: uploadResult.public_id 
    });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return res.status(500).json({ error: 'Image upload failed' });
  }
};

