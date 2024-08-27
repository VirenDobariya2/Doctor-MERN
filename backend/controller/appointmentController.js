const express = require("express");
const Appoinment = require("../models/userAppoinmentModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const Doctor = require("../models/userDoctorModels");
const Slots = require("../models/sloatsModel");
const { default: mongoose } = require("mongoose");

const appoinments = async (req, res) => {
  console.log("req",req.body)
  const userId = req.userId;

  const {
    name,
    date,
    slotId,
    symptoms,
    doctor,
    department,
    gender,
  } = req.body;


    const doctorsSLots = await Slots.findByIdAndUpdate(
      slotId,
      { userId: userId, status: "booked" },
      { new: true }
    );
    const newAppointment = new Appoinment({
      name,
      slotId,
      symptoms,
      doctor,
      gender,
    });

    const savedAppointment = await newAppointment.save();
    res.status(200).json(savedAppointment);

};

const appoinmentdata = async (req, res) => {
  const doctorId = req.userId;

  const docidd = new mongoose.Types.ObjectId(doctorId)
  // console.log("doc",doctorId)
  // const Doctor = req.userId
  try {
    const doctor = await Doctor.findById({ _id: doctorId });
    if (!doctorId ) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const doctorname = doctor.firstName;

    const appointments = await Appoinment.find({
      doctor: docidd,
      status:"Pending"
    });
   

    if (!appointments) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }

    const appointmentsWithDoctorName = appointments.map((appointment) => ({
      ...appointment._doc,
      doctorname,
    }));

    res.status(200).json(appointmentsWithDoctorName);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments", error });
  }
};

const approve = async (req, res) => {
  const { appid } = req.body;
  try {
    const approvedAppointment = await Appoinment.findByIdAndUpdate(
      appid,
      { status: "approved" },
      { new: true }
    );

    if (!approvedAppointment) {
      return res.status(404).send("Appointment not found");
    }

    res.json(approvedAppointment);
  } catch (error) {
    res.status(500).send(error);
  }
};

const approves = async (req, res) => {
  try {
    const approvedAppointment = await Appoinment.find({ status: "approved" });
    res.json(approvedAppointment);
  } catch (error) {
    res.status(500).send("Failed to fetch approved appointments");
  }
};

const appoinment = async (req, res) => {
  // console.log("Deleting appointment with ID", req.query.appid);
  try {
    await Appoinment.findByIdAndDelete(req.query.appid);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

const getDoctorlots = async (req, res) => {
  try {
    const doctorID = req.params.id;

    const doctorObjectId = new mongoose.Types.ObjectId(doctorID);

    const doctorsSLots = await Slots.find({ doctorId: doctorObjectId });

    res.status(200).send(doctorsSLots);
  } catch (err) {
    return res.status(400).json({ message: "Error" });
  }
};

const bookSlot = async (req, res) => {
  try {
    const userId = req.userId;

    const slotId = req.body.id;
    //check for end cases, if already booked deny
    const doctorsSLots = await Slots.findByIdAndUpdate(
      slotId,
      { userId: userId, status: "booked" },
      { new: true }
    );

    res.status(204).send({ doctorsSLots: doctorsSLots });
  } catch (error) {}
};

module.exports = {
  appoinments,
  appoinmentdata,
  approve,
  approves,
  appoinment,
  getDoctorlots,
  bookSlot,
};
