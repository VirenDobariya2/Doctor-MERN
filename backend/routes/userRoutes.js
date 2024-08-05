const express = require("express");
const User = require("../models/userModels");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
require("dotenv").config();

// Register Data In User side
router.post("/register", async (req, res) => {
  console.log('register')
  const { role, firstName, lastName, email, number, gender, password,doctorExperience,doctorField } =
    req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      role,
      firstName,
      lastName,
      email,  
      number,
      gender,
      doctorField,
      doctorExperience,
      password: hashedPassword,
      status: 'pending',
    });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Registering User", error });
  }
});

// Login Data In User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
   
    const isMatch = await bcrypt.compare(password, user.password);
    const role = user.role
    
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    } else {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      return res
        .status(200)
        .json({ message: "Login Successful", success: true, data: token,role});
    }
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Login Failed", success: false, error });
  }
});

// Get Doctor Info by ID In the Doctor data Profile Page 

router.get("/get-user-info-by-id", authMiddleware, async (req,res ) => {
  const userId  = req.userId;

  try {
    const user = await User.findById( userId ).select('-password');;
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    } else {
      res.status(200).json({
        success: true,
        data: user,
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
const id = req.userId
console.log(id)

try{
  const appoinment = await User.findById(id)
  if(!appoinment) {
    return res.status(200).json({message:"User Appoinment is Not found", success: false})

  }else{
    res.status(200).json({
      success: true,
      data: appoinment,
    })
  }
} catch(error) {
  res.status(500).json({message:"Appoinment Error", success:false, error})
}
})


module.exports = router;
