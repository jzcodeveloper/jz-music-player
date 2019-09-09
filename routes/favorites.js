const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const Favorites = require("../controllers/FavoritesController");

//Updates the favorites array in the Album model
router.get("/albums/:id", auth, (req, res) => {
  Favorites.updateFavorites(req, res, "Albums");
});

//Updates the favorites array in the Artist model
router.get("/artists/:id", auth, (req, res) => {
  Favorites.updateFavorites(req, res, "Artists");
});

//Updates the favorites array in the Song model
router.get("/songs/:id", auth, (req, res) => {
  Favorites.updateFavorites(req, res, "Songs");
});

//Sends user favorite albums/artists/songs metadata
router.get("/all", auth, (req, res) => {
  Favorites.sendMetadata(req, res);
});

module.exports = router;
