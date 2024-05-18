import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import Razorpay from 'razorpay';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.APP_SECRET 
});



export const  razorpay=new Razorpay({
   key_id:process.env.RAZORPAY_KEY_ID,
   key_secret:process.env.Key_SECRET
})


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


  export async function deleteCloudinary(localFilePath) {
    try {
      
        // Extract filename without extension
        const localFile = localFilePath.split('/').pop().split('.')[0];
        console.log("Local file:", localFile);

        // Delete file from Cloudinary
        const response = await cloudinary.uploader.destroy(localFile);

        // Log success message
        console.log(`File ${localFile} deleted successfully from Cloudinary`);
    } catch (err) {
        // Log error message
        console.error(`Failed to delete file from Cloudinary: ${err.message}`);
    }
}
