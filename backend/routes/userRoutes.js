const express = require("express");
const User = require("../models/userModels");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/userDoctorModels");
const Slots = require("../models/sloatsModel");
require("dotenv").config();

// Register Data In User side
router.post("/register", async (req, res) => {
  const {
    role,
    firstName,
    lastName,
    email,
    number,
    gender,
    password,
    doctorExperience,
    doctorField,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === "doctor") {
      const newDoctor = new Doctor({
        role,
        firstName,
        lastName,
        email,
        number,
        gender,
        password: hashedPassword,
        doctorField,
        doctorExperience,
        status: "pending",
      });
      await newDoctor.save();
      res.status(201).json({
        message: "Doctor registration successful. Awaiting admin approval.",
      });
    } else {
      const newUser = new User({
        role,
        firstName,
        lastName,
        email,
        number,
        gender,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: "User Registration Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error Registering User", error });
  }
});

// Login Data In User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await User.findOne({ email: req.body.email });
    const doctor = await Doctor.findOne({ email: req.body.email });

    const account = patient || doctor;

    if (!patient && !doctor) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    if (doctor && doctor.status !== "approved") {
      return res.status(403).json({
        message: "Your account is not approved by the admin yet.",
        success: false,
      });
    }

    const role =
      patient?.role === "patient"
        ? "patient"
        : patient?.role === "admin"
        ? "admin"
        : "doctor";

    const token = jwt.sign({ id: account._id, role }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ message: "Login Successful", success: true, data: token, role });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Login Failed", success: false, error });
  }
});

// Get Doctor Info by ID In the Doctor data Profile Page

router.get("/get-user-info-by-id", authMiddleware, async (req, res) => {
  const docid = req.userId;

  try {
    
    const doctor = await Doctor.findById(docid).select("-password");
    // console.log("doctor", doctor);

    if (!doctor) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    } else {
      res.status(200).json({
        success: true,
        data: doctor,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user info", success: false, error });
  }
});

// Admin Approval for the Doctor

router.get("/approve-doctor", authMiddleware, async (req, res) => {
  const id = req.userId;
  // console.log(id)

  try {
    
    const appoinment = await User.findById(id);
    if (!appoinment) {
      return res
        .status(200)
        .json({ message: "User Appoinment is Not found", success: false });
    } else {
      res.status(200).json({
        success: true,
        data: appoinment,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Appoinment Error", success: false, error });
  }
});

module.exports = router;
