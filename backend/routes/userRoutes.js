const express = require("express");
// const User = require("../models/userModels");
const router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
// const Doctor = require("../models/userDoctorModels");
// const Slots = require("../models/sloatsModel");
const { register, login, getuserinfo, approvedoctor } = require("../controller/userlog");
require("dotenv").config();

// const  { register } = require('../controller/userlog')

// Register Data In User side
router.post("/register",register);


// Login Data In User
router.post("/login", login);

// Get Doctor Info by ID In the Doctor data Profile Page

router.get("/get-user-info-by-id", authMiddleware, getuserinfo);

// Admin Approval for the Doctor

router.get("/approve-doctor", authMiddleware, approvedoctor);

module.exports = router;
