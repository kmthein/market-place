const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(4000, () => {
        console.log("Server is running on port: 4000.");
    })
})