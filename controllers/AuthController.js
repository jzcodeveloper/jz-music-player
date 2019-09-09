const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const validateLogin = require("../validation/login");
const validateRegister = require("../validation/register");

const User = require("../models/User");

//Get current user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

//Login user, generates token
exports.loginUser = async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      errors.password = "Password incorrect";
      return res.status(400).json(errors);
    }

    user = { _id: user._id, name: user.name, email: user.email };

    const jwtSecret = config.get("jwtSecret");

    const expiresIn = config.get("expiresIn");

    const token = await jwt.sign(user, jwtSecret, { expiresIn });

    res.json({ token, user, expiresIn: Date.now() / 1000 + expiresIn });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Register user
exports.registerUser = async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    }

    user = new User({
      name,
      email,
      password,
      favoriteAlbums: [],
      favoriteArtists: [],
      favoriteSongs: [],
      playlists: []
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    user = { _id: user._id, name: user.name, email: user.email };

    const jwtSecret = config.get("jwtSecret");

    const expiresIn = config.get("expiresIn");

    const token = await jwt.sign(user, jwtSecret, { expiresIn });

    res.json({ token, user, expiresIn: Date.now() / 1000 + expiresIn });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
