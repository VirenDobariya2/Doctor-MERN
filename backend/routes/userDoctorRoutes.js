const express = require("express");
const Doctor = require("../models/userDoctorModels");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/doctor-data", authMiddleware, async (req, res) => {
  try {
    console.log("data", req.query);
    const { data } = req.query;

    let doctors;

    if (data === "approved") {
      doctors = await Doctor.find({ status: "approved" });
    } else {
      doctors = await Doctor.find();
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
  try {
    await Doctor.findByIdAndDelete(req.query.docid);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(err);
  }
});

module.exports = router;
