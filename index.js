const express = require("express");
const path = require('path');

// const config = require("./config/config");

require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname))); // Static files should be served first
app.use(express.static("public"));



const myRoutes = require("./routes/myRoutes");
app.use("/", myRoutes);

const port = process.env.PORT;

// app.listen not required for vercel
// app.listen(port, async () => {
//   console.log(`server is running on http://localhost:${port}`);
// });

// Export the app for Vercel
module.exports = app;