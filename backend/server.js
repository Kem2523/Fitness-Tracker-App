const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongo: ", process.env.ATLAS_URI);
  }
);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
