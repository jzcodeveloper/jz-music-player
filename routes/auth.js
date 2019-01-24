const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateLogin = require("../validation/login");
const validateRegister = require("../validation/register");

const User = require("../models/User");

// Post routes
router.post("/login", async (req, res) => {
  //Validating all the fields
  const { errors, isValid } = validateLogin(req.body);
  //If invalid...
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Extracting fields
  const { email, password } = req.body;
  //Find user by email
  const user = await User.findOne({ email });
  //If not found...
  if (!user) {
    errors.email = "User not found";
    return res.status(404).json(errors);
  } else {
    //Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (isMatch) {
      const payload = { id: user.id, name: user.name };
      const token = await jwt.sign(payload, keys.secretOrKey, {
        expiresIn: keys.expiresIn
      });
      res.json({ token: "Bearer " + token });
    } else {
      errors.password = "Password incorrect";
      res.status(400).json(errors);
    }
  }
});

// Post routes
router.post("/register", async (req, res) => {
  //Validating all the fields
  const { errors, isValid } = validateRegister(req.body);
  //If invalid...
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Extracting fields
  const { name, email, password } = req.body;
  //Find user by email
  const user = await User.findOne({ email });
  //If found...
  if (user) {
    errors.email = "Email already exists";
    res.status(400).json(errors);
  } else {
    //Create new User
    const newUser = new User({
      name,
      email,
      password: bcryptjs.hashSync(password, 10)
    });
    res.json(await newUser.save());
  }
});

module.exports = router;
