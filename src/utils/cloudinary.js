import fs from 'fs';
import cloudinary from '../config/setupCloudinary.js';

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: 'products',
        });


        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error('Cloudinary upload error:', error);
        return null;
    }
}; 

export const deleteFromCloudinary = async (publicUrl) => {
  try {
    
    if (!publicUrl) return null;
    
    const publicId = publicUrl.split('/').slice(-2).join('/').split('.')[0];
    
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};