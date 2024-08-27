const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  gender: { type: String, required: true },
  // time: { type: String, required: true },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
});

const Appoinment = mongoose.model("Appoinment", appointmentSchema);

module.exports = Appoinment;
