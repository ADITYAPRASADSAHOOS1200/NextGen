// Define error handling middleware function
export const errormiddleWare = (err, req, res, next) => {
    // Set status code of the error (default to 500 if not provided)
    err.statusCode = err.statusCode || 500;
    // Set error message (default to "Something went wrong" if not provided)
    err.message = err.message || "Something went wrong ";

    // Send error response with status code, message, and stack trace (if available)
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack, // Stack trace of the error (useful for debugging, but not recommended to expose in production)
    });
};
