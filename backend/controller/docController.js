const express = require("express");
const Doctor = require("../models/userDoctorModels");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Slots = require("../models/sloatsModel");
const {
  formatTime12Hour,
  createDateWithDayOnly,
  convertTo24Hour,
} = require("../utils/utils");

const doctordata = async (req, res) => {
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
};

const approvedoctors = async (req, res) => {
  const { docid } = req.body;

  //add number of slots perday and if any off days for doctor

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
};
const approvedoctor = async (req, res) => {
  try {
    const approvedDoctor = await Doctor.find({ status: "approved" });
    res.json(approvedDoctor);
  } catch (error) {
    res.status(500).send(err);
  }
};

const doctorremove = async (req, res) => {
  const { docid } = req.query;
  try {
    await Doctor.findByIdAndDelete(req.query.docid);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(err);
  }
};
const uploadprofilepic = async (req, res) => {
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
};

const updateuserinfo = async (req, res) => {
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
};

const slots = async (req, res) => {
  const userId = req.userId;

  try {
    const date = Date.now();
    const slots = await Slots.find({
      doctorId: userId,
    });
    // console.log("slots", slots);
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching slots" });
  }
};
const slot = async (req, res) => {
  const userId = req.userId;

  let { startDate, endDate, workingHours, startingTime } = req.body;
  let startday = startDate.split("-")[2];

  const dateTocreate = createDateWithDayOnly(startday);

  let availableSlots = await Slots.find({
    doctorId: userId,
    date: dateTocreate,
  });

  // console.log(availableSlots);

  if (availableSlots.length > 7) {
    return res.status(402).json({ message: "Max slots booked" });
  }

  // console.log('sdsdsdsds')

  try {
    const slots = [];
    const start = startDate.split("-")[2];
    const end = endDate.split("-")[2];

    const numOfDays = end - start + 1;
    for (let date = start; date <= end; date++) {
      let setStartTime = startingTime || "9:00 am";
      let startTime = convertTo24Hour(setStartTime);

      for (let wrkTime = 1; wrkTime <= workingHours; wrkTime++) {
        let thisDate = createDateWithDayOnly(date);
        let slot = new Slots({
          doctorId: userId,
          date: thisDate,
          time: formatTime12Hour(startTime),
        });
        startTime++;
        await slot.save();
        slots.push(slot);
      }
    }

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Error saving slot" });
  }
};

const updateslots = async (req, res) => {
  const userId = req.userId;
  // const { startDate, endDate, workingHours } = req.body;

  let { slotId, available, date, time } = req.body;
  // console.log('available', slotId, available, date, time )
  if (available === "unavailable") {
    available = "booked";
  } else if (available === "booked") {
    available = "cancelled";
  } else {
    available = "available";
  }

  try {
    const updateObj = {
      date: date,
      time: time,
      status: available,
    };

    const slot = await Slots.findByIdAndUpdate(slotId, updateObj, {
      new: true,
    });
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: "Error updating slot" });
  }
};
module.exports = {
  doctordata,
  approvedoctors,
  approvedoctor,
  doctorremove,
  uploadprofilepic,
  updateuserinfo,
  slots,
  slot,
  updateslots,
};
