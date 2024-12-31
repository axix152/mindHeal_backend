const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// register user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // find existing user
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User with email already registered" });
    }

    // create new user in database
    user = new User({
      username,
      email,
      password,
    });

    // save user to db
    await user.save();

    return res
      .status(201)
      .json({ status: true, message: "User registered successfully", user });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to register user",
      error: err.message,
    });
  }
};

// login user
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate user request
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ status: true, message: "User login successfully", token, user });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to login user",
      error: err.message,
    });
  }
};
