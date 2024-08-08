const express = require("express");
const Doctor = require("../models/userDoctorModels");
// const User = require("../models/userModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");

router.get("/doctor-data", authMiddleware, async (req, res) => {
  try {
    const { data } = req.query;

    let doctors;

    if (data === "approved") {
      doctors = await Doctor.find({ status: "approved" });
    } else {
      doctors = await Doctor.find({ status: "pending" });
    }
    
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Doctors", error });
  }
});

router.patch("/approve-doctor", authMiddleware, async (req, res) => {
  const { docid } = req.body;

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.body.docid,
      {
        status: "approved",
      },
      { new: true }
    );
    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }

    await doctor.save();
    res
      .status(200)
      .json({ message: "Doctor approved successfully", success: true });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ message: "Failed to approve doctor", error });
  }
});

router.get("/approve-doctor", authMiddleware, async (req, res) => {
  try {
    const approvedDoctor = await Doctor.find({ status: "approved" });
    res.json(approvedDoctor);
  } catch (error) {
    res.status(500).send(err);
  }
});

router.delete("/doctor-remove", async (req, res) => {
  const { docid } = req.query;
  try {
    await Doctor.findByIdAndDelete(req.query.docid);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(err);
  }
});

// upload the profile img

router.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("storagesssssssssssssss",file)

    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // console.log("storage",file)
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage});

// Route Upload img fro the Profile page

router.post(
  "/upload-profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      // console.log("sscsdsdsdsds")
      const doctor = await Doctor.findById(req.userId);
      if (!doctor) {
        return res
          .status(404)
          .json({ message: "Doctor not Found", success: false });
      }
      doctor.profilePic = `/uploads/${req.file.filename}`;
      await doctor.save();

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        success: true,
        data: doctor,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error uploading profile picture",
        success: false,
        error,
      });
    }
  }
);

// Update Profile Data
router.put("/update-user-info", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const { firstName, lastName, doctorField, doctorExperience } = req.body;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is missing", success: false });
    }

    const doctor = await Doctor.findById(userId);
    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }

    const changes = {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      email: doctor.email,
      number: doctor.number,
      gender: doctor.gender,
      doctorField: doctorField || undefined,
      doctorExperience: doctorExperience || undefined,
      // profilePic:profilePic || undefined,
    };

    // Remove null values
    Object.keys(changes).forEach(
      (key) => changes[key] === undefined && delete changes[key]
    );

    if (Object.keys(changes).length === 0) {
      return res
        .status(200)
        .json({ message: "No changes detected", success: false });
    }

    // Update doctor data
    Object.assign(doctor, changes);
    await doctor.save();

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
