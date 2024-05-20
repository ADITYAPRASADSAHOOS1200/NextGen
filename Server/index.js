import { connectMongoDb } from "./src/Connection/index.js";
import app from "./app.js";
import 'dotenv/config';
// import { DB_NAME } from "./src/Constants/DB_NAME.js";

const PORT = process.env.PORT || 5000;

// Construct the MongoDB URI properly
const MONGO_URI =process.env.MONGO_URI

connectMongoDb(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err?.message || "Something went wrong");
    process.exit(1); 
    // Exit the process if there's an error connecting to MongoDB
  });












