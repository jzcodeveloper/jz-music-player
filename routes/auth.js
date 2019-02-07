const express = require("express");
const router = express.Router();

const Auth = require("../controllers/AuthController");

//Login user
router.post("/login", (req, res) => {
  Auth.loginUser(req, res);
});

//Register user
router.post("/register", (req, res) => {
  Auth.registerUser(req, res);
});

module.exports = router;
