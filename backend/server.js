const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const userRoutes = require("./routes/userRoutes");
const userAppoinmentRoutes = require("./routes/userAppoinmentRoutes");
const userDoctorRoutes = require("./routes/userDoctorRoutes");
// const userSlotRoutes = require("./routes/")



const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.use("/api/users", userRoutes);
app.use("/api/appoinment", userAppoinmentRoutes);
app.use("/api/doctors", userDoctorRoutes);
app.use('/uploads', express.static('uploads'));
// app.use("/api/slot", userSlotRoutes)


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
