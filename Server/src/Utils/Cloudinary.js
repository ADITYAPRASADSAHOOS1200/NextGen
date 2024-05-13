import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.APP_SECRET 
});

export async function uploadcloudinary(localFilePath) {
    try {
        if (!localFilePath) {
            throw new Error("Local file path is missing.");
        }

        const response = await cloudinary.uploader.upload(localFilePath, { 
            resource_type: "auto",
            fetch_format: 'auto',
            quality: 'auto',
            crop: 'fill',
            gravity: 'auto',
            width: 500,
            height: 500
        });

        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log("Error uploading to Cloudinary", error);

        // Properly handle errors
        fs.unlink(localFilePath, (unlinkerr) => {
            console.error("Error deleting temporary file:", unlinkerr);
        });

        // Return null or error message
        return null;
    }
}
