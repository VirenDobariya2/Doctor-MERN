const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  doctordata,
  approvedoctors,
  approvedoctor,
  doctorremove,
  uploadprofilepic,
  updateuserinfo,
  slots,
  slot,
  updateslots,
} = require("../controller/docController");

router.get("/doctor-data", authMiddleware, doctordata);

router.patch("/approve-doctor", authMiddleware, approvedoctors);

router.get("/approve-doctor", authMiddleware, approvedoctor);

router.delete("/doctor-remove", doctorremove);

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
const upload = multer({ storage });

// Route Upload img fro the Profile page

router.post(
  "/upload-profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  uploadprofilepic
);

// Update Profile Data
router.put("/update-user-info", authMiddleware, updateuserinfo);

// doctor slots..................

router.get("/slots", authMiddleware, slots);

// Create or update slots
router.post("/slots", authMiddleware, slot);

// Update the slot
router.patch("/updateslots", authMiddleware, updateslots);

module.exports = router;
