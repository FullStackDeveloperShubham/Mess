import express, { urlencoded } from "express";
import connectDB from "./DB/DB.connection.js";
import dotenv from "dotenv";
dotenv.config();

const port = 3000 || process.env.PORT;

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// define the routes
import user from './Routes/user.routes.js'
app.use('/api/v1',user)

// listen the server
app.listen(port, () => {
  // connect to MongoDB
  connectDB()
    .then(() => console.log(`http://localhost:${port}`))
    .catch((error) =>
      console.error("Error connecting to MongoDB:", error.message)
    );
});
