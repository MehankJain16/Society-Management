require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Set up server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT - ${PORT}`));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Serve Images
const directory = path.join(__dirname, "uploads");
app.use("/uploads", express.static(directory));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log(`Error in connecting to mongodb : ${err.toString()}`);
    return;
  }

  console.log("Connected to mongodb");
});

// Set up routes
app.use("/api/auth", require("./routes/user"));
app.use("/api/event", require("./routes/event"));
app.use("/api/notice", require("./routes/notice"));
app.use("/api/maintenance", require("./routes/maintenance"));
app.use("/api/garbage", require("./routes/garbage"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/invoice", require("./routes/invoice"));
app.use("/api/community", require("./routes/community"));
app.use("/api/donation", require("./routes/donation"));
