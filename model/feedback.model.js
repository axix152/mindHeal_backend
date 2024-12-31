const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tbl_user",
      required: true,
    },
    feedback_text: {
      type: String,
      required: [true, "Feedback text is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("tbl_feedback", feedbackSchema);

module.exports = Feedback;
