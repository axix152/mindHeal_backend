const mongoose = require("mongoose");

// connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("Connected to database");
  } catch (err) {
    console.error("Failed to connect to database");
    process.exit(1);
  }
};

// Export the connection function
module.exports = connectDB;
