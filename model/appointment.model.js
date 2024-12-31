const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tbl_user",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      match: [
        /^(?:[01]\d|2[0-3]):[0-5]\d$/,
        "Please provide a valid time in HH:mm format",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("tbl_appointment", appointmentSchema);

module.exports = Appointment;
