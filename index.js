const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const app = express();

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("DB is connectd");
  } catch (error) {
    console.log(error);
  }
};

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://sage-biscotti-f406fc.netlify.app",
    credentials: true,
  })
);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);

//Image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    // fn(null, "image1.png");
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

app.listen(process.env.PORT, () => {
  mongodb();
  console.log(`app is up and running in port ${process.env.PORT}`);
});

//m8MWi7SYpsCclST5
