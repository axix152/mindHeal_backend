// add env variable to app
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rotue = require("./routes/route");

const connectDb = require("./config/db.config");

// create instance of express
const app = express();
// PORT
const PORT = process.env.PORT || 3000;
// start db connection
connectDb();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", rotue);

// server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
