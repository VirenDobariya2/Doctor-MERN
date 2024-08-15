const mongoose = require("mongoose");

const SlotsSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["available", "booked", "cancelled"],
    default: "available",
  },
});

const Slots = mongoose.model("Slots", SlotsSchema);

module.exports = Slots;
