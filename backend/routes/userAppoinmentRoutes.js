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
  const doctorId = req.userId; 
  console.log("docrot", doctorId)

  try {
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const appointments = await Appoinment.findOne({
      // doctor: doctorId,
     
    })
    console.log("Appointments found:", appointments);

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error });
  }
});


// Approve Button Click and Show
router.patch("/approve", authMiddleware, async (req, res) => {
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
});


// Apporove
router.get("/approve", authMiddleware, async (req, res) => {
  try {
    const approvedAppointment = await Appoinment.find({ status: "approved" });
    res.json(approvedAppointment);
  } catch (error) {
    res.status(500).send("Failed to fetch approved appointments");
  }
});

// Delete appointment
router.delete("/appoinment", async (req, res) => {
  // console.log("Deleting appointment with ID", req.query.appid);
  try {
    await Appoinment.findByIdAndDelete(req.query.appid);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
