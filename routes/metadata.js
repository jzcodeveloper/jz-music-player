const express = require("express");
const router = express.Router();
const passport = require("passport");

const Metadata = require("../controllers/MetadataController");

//Sends the amount of songs stored in the DB
router.get("/count/songs", (req, res) => {
  Metadata.countDocuments(req, res, "Song");
});

//Sends albums/artists/songs metadata with limit
router.get(
  "/metadata",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendTopMetadata(req, res);
  }
);

//Sends albums metadata with from and limit
router.get(
  "/albums",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendMetadata(req, res, "album");
  }
);

//Sends artists metadata with from and limit
router.get(
  "/artists",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendMetadata(req, res, "artist");
  }
);

//Sends songs metadata with from and limit
router.get(
  "/songs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendMetadata(req, res, "title");
  }
);

//Sends songs metadata for a given album
router.get(
  "/albums/:album",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendAllMetadata(req, res, "album");
  }
);

//Sends songs metadata for a given artist
router.get(
  "/artists/:artist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendAllMetadata(req, res, "artist");
  }
);

//Sends song metadata for a given song
router.get(
  "/songs/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendAllMetadata(req, res, "title");
  }
);

//Sends song metadata for a given song
router.get(
  "/playlists/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendAllMetadata(req, res, "name");
  }
);

//Deletes a song by id
router.delete(
  "/songs/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.deleteSong(req, res);
  }
);

module.exports = router;
