const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  symptoms: { type: String },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slots",
    required: true,
  },
  department: { type: String, required: true },
  gender: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
});

const Appoinment = mongoose.model("Appoinment", appointmentSchema);

module.exports = Appoinment;
