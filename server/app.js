const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
require("dotenv").config();

const storageConfigure = multer.diskStorage({
    filename: (req, file, cb) => {
      const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, suffix + "-" + file.originalname);
    },
  });
  
  const filterConfigure = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, undefined);
    }
  };
  
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");

const app = express();

app.use(cors({ origin: "https://shopxchange.onrender.com/" }));
app.use(bodyParser.json());

app.use(
    multer({ storage: storageConfigure, fileFilter: filterConfigure }).array(
      "product_images"
    )
  );

app.use(userRoutes);
app.use(productRoutes);
app.use(adminRoutes);
app.use("/api", publicRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(4000);
  console.log("Server is running on port: 4000.");
});
