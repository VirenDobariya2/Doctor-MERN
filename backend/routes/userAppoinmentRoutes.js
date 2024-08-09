const express = require("express");
const Appoinment = require("../models/userAppoinmentModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const Doctor = require("../models/userDoctorModels");
// const mongoose = require("mongoose");

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
  // console.log("doc",doctorId)
  // const Doctor = req.userId
  try {
    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }
    const doctor = await Doctor.findById({ _id: doctorId });

    const doctorname = doctor.firstName;

    const appointments = await Appoinment.find({
      doctor: doctorId,
      status: "pending",
      // doctorname:doctorname,
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


// GET available slots for a doctor
// router.get('/doctor-slots', async (req, res) => {
//   const { doctorId, date } = req.query;
  
//   // Fetch doctor's available slots for the given date
//   const doctor = await Doctor.findById(doctorId);
//   const availableSlots = doctor.slots.filter(slot => slot.date === date && !slot.booked);
  
//   res.json(availableSlots);
// });

// POST to create/update slots
// router.post('/doctor-slots', async (req, res) => {
//   const { doctorId, slots } = req.body;
  
//   // Update the doctor's available slots
//   const doctor = await Doctor.findById(doctorId);
//   doctor.slots = slots; // Replace with new slots
//   await doctor.save();
  
//   res.json({ message: 'Slots updated successfully' });
// });

// DELETE to book a slot (mark as booked)
// router.delete('/book-slot', async (req, res) => {
//   const { doctorId, date, time } = req.body;
  
//   // Find and mark the slot as booked
//   const doctor = await Doctor.findById(doctorId);
//   const slot = doctor.slots.find(s => s.date === date && s.time === time);
//   if (slot) {
//     slot.booked = true;
//     await doctor.save();
    
//     // Optionally, create an appointment record
//     await Appointment.create({ doctorId, date, time, userId: req.userId });
    
//     res.json({ message: 'Slot booked successfully' });
//   } else {
//     res.status(404).json({ message: 'Slot not found' });
//   }
// });





module.exports = router;
