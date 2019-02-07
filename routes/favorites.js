const express = require("express");
const router = express.Router();
const passport = require("passport");

const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

const Favorites = require("../controllers/FavoritesController");

//Updates the favorites array in the Album model
router.get(
  "/albums/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favorites.updateFavorites(req, res, Album);
  }
);

//Updates the favorites array in the Artist model
router.get(
  "/artists/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favorites.updateFavorites(req, res, Artist);
  }
);

//Updates the favorites array in the Song model
router.get(
  "/songs/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favorites.updateFavorites(req, res, Song);
  }
);

//Sends user favorite albums/artists/songs metadata
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Favorites.sendMetadata(req, res, Album, Artist, Song);
  }
);

module.exports = router;
