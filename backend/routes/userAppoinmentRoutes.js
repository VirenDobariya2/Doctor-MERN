const express = require("express");
const Appoinment = require("../models/userAppoinmentModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const Doctor = require("../models/userDoctorModels");
const { appoinments, appoinmentdata, approve, approves, appoinment,getDoctorlots,bookSlot, getNotifications } = require("../controller/appointmentController");
// const mongoose = require("mongoose");

router.post("/appoinments", appoinments);

// Doctor appoinment Page in the data

router.get("/appoinment-data", authMiddleware,appoinmentdata);

// Approve Button Click and Show
router.patch("/approve", authMiddleware, approve);

// notification
router.get('/getNotifications', authMiddleware, getNotifications);

// Apporove
router.get("/approve", authMiddleware, approves);

// Delete appointment
router.delete("/appoinment", appoinment);

//get slots according to doctor id

router.get("/docSlots/:id",authMiddleware,getDoctorlots)


router.patch('/bookslot',authMiddleware,bookSlot)







module.exports = router;
