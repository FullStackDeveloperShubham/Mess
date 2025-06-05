import express from "express";
import connectDB from "./DB/DB.connection.js";
import dotenv from "dotenv";
dotenv.config();

const port = 3000 || process.env.PORT;

const app = express();

// simple route
app.get("/",(req,res)=>{
res.send("Welcome to the Express.js server!");
})


// listen the server
app.listen(port, () => {
  // connect to MongoDB
  connectDB()
    .then(() => console.log(`http://localhost:${port}`))
    .catch((error) =>
      console.error("Error connecting to MongoDB:", error.message)
    );
});
