import multer from "multer";
import path from "path";

// Set up multer middleware for file uploads
export const upload = multer({
    // Destination folder for storing temporary files
    dest: './public/temp',
    // Maximum file size limit (50 MB)
    limits: { fileSize: 50 * 1024 * 1024 },
    // Disk storage options
    storage: multer.diskStorage({
        // Destination folder for storing files
        destination: './public/temp',
        // Filename function to use the original filename
        filename: (_req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    // File filter function to accept only certain file types
    fileFilter: (_req, file, cb) => {
        // Extract file extension
        let ext = path.extname(file.originalname);

        // Check if the extension is one of the allowed types
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".Webp" && ext !== ".mp4" && ext !== "") {
            // If not allowed, call the callback with an error
            cb(new Error(`Unsupported file type: ${ext}`), false);
            return;
        }

        // If allowed, call the callback without an error
        cb(null, true);
    }
});
