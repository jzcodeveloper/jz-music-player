const express = require("express");
const router = express.Router();
const passport = require("passport");

const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

const Metadata = require("../controllers/MetadataController");

//Sends the amount of songs stored in the DB
router.get("/count/songs", (req, res) => {
  Metadata.countDocuments(req, res, Song);
});

//Sends albums/artists/songs metadata with limit
router.get(
  "/metadata",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendTopMetadata(req, res, Album, Artist, Song);
  }
);

//Sends albums metadata with from and limit
router.get(
  "/albums",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendMetadata(req, res, Album, "album");
  }
);

//Sends artists metadata with from and limit
router.get(
  "/artists",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendMetadata(req, res, Artist, "artist");
  }
);

//Sends songs metadata with from and limit
router.get(
  "/songs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendMetadata(req, res, Song, "title");
  }
);

//Sends songs metadata for a given album
router.get(
  "/albums/:album",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendAllMetadata(req, res, Song, "album");
  }
);

//Sends song metadata for a given song
router.get(
  "/songs/:title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendAllMetadata(req, res, Song, "title");
  }
);

//Sends songs metadata for a given artist
router.get(
  "/artists/:artist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Metadata.sendAllMetadata(req, res, Song, "artist");
  }
);

//Deletes a song using Artist + Song Title
router.get("/deleteSong/:id", async (req, res) => {
  Metadata.deleteDocument(req, res, Song);
});

module.exports = router;
