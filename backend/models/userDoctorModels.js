const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  role: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  gender: { type: String, required: true },
  doctorField: { type: String },
  doctorExperience: { type: String },
  password: { type: String, required: true },
  status: { type: String, default: "pending" },
  profilePic: { type: String },
  slots: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot'
}]

});


  


const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;
