const connectDB = require("./db")
const express = require("express");
const router = require("./routes");
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config({
  path: "./.env"
})

// Initializing our app
const app = express();

// To be able parse JSON body
app.use(express.json());

// Connecting to the Database
connectDB()

// Handling CORS
app.use(cors())

// Routes
app.use(router);

// Port declaration
const PORT = process.env.PORT || 9999;

// Listening to port
app.listen(PORT, () => {
  console.log("Server has been connected on PORT", PORT);
});
