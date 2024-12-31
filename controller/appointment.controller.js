const Appointment = require("../model/appointment.model");

// create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, date, time } = req.body;

    // Create new appointment
    const appointment = new Appointment({
      user_id: req.user,
      name,
      date,
      time,
    });

    await appointment.save();

    return res.status(201).json({
      status: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to create appointment",
      error: err.message,
    });
  }
};

// get user all appointmetns
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user_id: req.user });

    return res.status(200).json({
      status: true,
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch appointments",
      error: err.message,
    });
  }
};
