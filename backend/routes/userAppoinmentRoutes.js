const express = require("express");
const Appoinment = require("../models/userAppoinmentModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/appoinments", async (req, res) => {
  const {
    name,
    phone,
    email,
    date,
    symptoms,
    doctor,
    department,
    gender,
    time,
    message,
  } = req.body;

  try {
    const newAppointment = new Appoinment({
      name,
      phone,
      email,
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

router.get("/appoinment-data", authMiddleware, async( req, res)=>{
  const userId = req.userId
  console.log("userId",userId)

  try {
    const appoinments  = await Appoinment.find({});
    console.log(appoinments)
    res.status(200).json(appoinments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error })
  }
})


module.exports = router;
