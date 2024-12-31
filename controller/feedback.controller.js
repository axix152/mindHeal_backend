const Feedback = require("../model/feedback.model");

// Submit Feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { feedback_text } = req.body;

    if (!feedback_text) {
      return res.status(400).json({
        status: false,
        message: "Feedback text is required",
      });
    }

    // Create new feedback
    const feedback = new Feedback({
      user_id: req.user,
      feedback_text,
    });

    await feedback.save();

    return res.status(201).json({
      status: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to submit feedback",
      error: err.message,
    });
  }
};

// Get Feedback
exports.getFeedback = async (req, res) => {
  try {
    // Fetch feedback submitted by the user
    const feedbacks = await Feedback.find({ user_id: req.user });

    return res.status(200).json({
      status: true,
      message: "Feedback fetched successfully",
      feedbacks,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch feedback",
      error: err.message,
    });
  }
};
