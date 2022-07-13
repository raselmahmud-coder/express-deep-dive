const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const router = express.Router();

const User = new mongoose.model("User", userSchema);

router.post("/", async (req, res) => {
  const { name, userName, status } = req.body;
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    console.log("hey pass", password);
    const newUser = new User({
      name,
      userName,
      password,
      status,
    });
    const result = await newUser.save();
    res.send(result);
  } catch (error) {
    res.send({ error: error });
  }
});
module.exports = router;
