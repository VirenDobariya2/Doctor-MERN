const express = require("express");
const Appoinment = require("../models/userAppoinmentModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/appoinments", async (req, res) => {
  const { name, date, symptoms, doctor, department, gender, time, message } =
    req.body;
  try {
    const newAppointment = new Appoinment({
      name,
      date,
      symptoms,
      doctor,
      department,
      gender,
      time,
      message,
    });

    const savedAppointment = await newAppointment.save();
    res.status(200).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Doctor appoinment Page in the data

router.get("/appoinment-data", authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const appoinments = await Appoinment.find({status: "pending"});
    res.status(200).json(appoinments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error });
  }
});

// Approve Button Click and Show
router.patch("/approve", authMiddleware, async (req, res) => {
  try {
    const approvedAppointment = await Appoinment.findByIdAndUpdate(
      req.body.appid,
      { status: "approved" },
      { new: true }
    );

    res.json(approvedAppointment);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Apporove
router.get("/approve", authMiddleware, async (req, res) => {
  try {
    const approvedAppointment = await Appoinment.find({ status: "approved" });
    res.json(approvedAppointment);
  } catch (error) {
    res.status(500).send(err);
  }
});

// Delete appointment
router.delete("/appoinment", async (req, res) => {
  console.log("Deleting appointment with ID", req.query.appid);
  try {
    await Appoinment.findByIdAndDelete(req.query.appid);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
