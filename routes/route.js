const express = require("express");
const userController = require("../controller/user.controller");
const appointmentController = require("../controller/appointment.controller");
const feedbackController = require("../controller/feedback.controller");

// auth middleware
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// registered user rotue
router.post("/register", userController.registerUser);
// User login route
router.post("/login", userController.logIn);

// create new appointment
router.post(
  "/appointment",
  authMiddleware,
  appointmentController.createAppointment
);

// get user appointment
router.get(
  "/appointment",
  authMiddleware,
  appointmentController.getAppointments
);

// Submit feedback
router.post("/feedback", authMiddleware, feedbackController.submitFeedback);
// Get feedback
router.get("/feedback", authMiddleware, feedbackController.getFeedback);

module.exports = router;
