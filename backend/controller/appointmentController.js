const express = require("express");
const Appoinment = require("../models/userAppoinmentModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const Notification =require("../models/notificationModel")
const Doctor = require("../models/userDoctorModels");
const Slots = require("../models/sloatsModel");
const { default: mongoose } = require("mongoose");

const appoinments = async (req, res) => {
  console.log("req", req.body);
  const userId = req.userId;

  const {
    name,
    slotId,
    symptoms,
    doctor,
    gender,
  } = req.body;

  const doctorsSlots = await Slots.findByIdAndUpdate(
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
  // const Doctor = req.userId
  
  const docid = new mongoose.Types.ObjectId(doctorId);
  try {
    const doctor = await Doctor.findById( docid );
    if (!doctor) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }
    // console.log("doc",doctor)

    const doctorname = doctor.firstName;

    const appointments = await Appoinment.find({
      doctor: docid,
      status: "Pending",
    }).populate('slotId');
// console.log(appointments)

    if (!appointments) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }

    const appointmentsWithDoctorName = appointments.map((appointment) => ({
      ...appointment._doc,
      doctorname,
      // slotId: appointment.slotId 
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
      { new: true },
    ).populate('slotId');
    if (!approvedAppointment) {
      return res.status(404).send("Appointment not found");
    }
    console.log('approvedAppointment',approvedAppointment)

    await Notification.create({
      userId: approvedAppointment.userId, 
      message: `Appointment with ${approvedAppointment.name} has been approved.`,
      appid:appid,
      isRead: false,
    });
    console.log("fech",)

    res.json(approvedAppointment);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getNotifications = async (req, res) => {
  const { userId } = req.body; 
  console.log("id",userId)
  try {
    const notifications = await Notification.find({ appid:appid }).sort({ createdAt: -1 });
    res.json(notifications);
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
    const doctorsSlots = await Slots.find({ doctorId: doctorObjectId });
    res.status(200).send(doctorsSlots);
  } catch (err) {
    return res.status(400).json({ message: "Error" });
  }
};

const bookSlot = async (req, res) => {
  try {
    const userId = req.userId;

    const slotId = req.body.id;
    //check for end cases, if already booked deny
    const doctorsSlots = await Slots.findByIdAndUpdate(
      slotId,
      { userId: userId, status: "booked" },
      // {userId:userId, status:"cancelled"},
      { new: true }
    );

    res.status(204).send({ doctorsSlots: doctorsSlots });
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
  getNotifications
};
