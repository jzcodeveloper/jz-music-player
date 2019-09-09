const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const Auth = require("../controllers/AuthController");

//Get user
router.get("/user", auth, (req, res) => {
  Auth.getUser(req, res);
});

//Login user
router.post("/login", (req, res) => {
  Auth.loginUser(req, res);
});

//Register user
router.post("/register", (req, res) => {
  Auth.registerUser(req, res);
});

module.exports = router;
