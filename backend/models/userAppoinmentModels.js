const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  symptoms: { type: String },
  doctor: { type: String, required: true },
  department: { type: String, required: true },
  gender: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String },
});

const User = mongoose.model("Appoinment", appointmentSchema);

module.exports = User;
