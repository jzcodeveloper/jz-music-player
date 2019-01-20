const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const validateLogin = require("../validation/login");
const validateRegister = require("../validation/register");

/*

// Get routes
router.get("/example", (req, res) => {
  res.json(body);
});

// Post routes
router.post("/example", (req, res) => {
  res.json(body);
});

// Put routes
router.put("/example/:id", (req, res) => {
  res.json(body);
});

// Delete routes
router.delete("/example/:id", (req, res) => {
  res.json(body);
});

*/

// Post routes
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.body);
  res.json(req.body);
});

// Post routes
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
