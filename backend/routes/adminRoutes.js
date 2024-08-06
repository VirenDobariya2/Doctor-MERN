const express = require('express');
const Doctor = require('../models/userDoctorModels');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/approve-doctor', authMiddleware, async (req, res) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status: 'approved' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve doctor', error });
  }
});

module.exports = router;
