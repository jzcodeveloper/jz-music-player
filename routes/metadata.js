const express = require("express");
const router = express.Router();
const passport = require("passport");

const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

//Sends the amount of songs stored in the DB
router.get("/count/songs", async (req, res) => {
  const count = await Song.find({}).countDocuments();
  res.json(count);
});

//Sends albums/artists/songs metadata with limit
router.get(
  "/metadata",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const limit = Number(req.query.limit);

    const albumsInfo = await Album.find({})
      .sort({ favoritesLength: -1 })
      .limit(limit)
      .populate("albumArt");

    const artistsInfo = await Artist.find({})
      .sort({ favoritesLength: -1 })
      .limit(limit)
      .populate("albumArt");

    const songsInfo = await Song.find({})
      .sort({ favoritesLength: -1 })
      .limit(limit)
      .populate("albumArt");

    res.json({
      albumsInfo,
      artistsInfo,
      songsInfo
    });
  }
);

//Sends albums metadata with from and limit
router.get(
  "/albums",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const query = new RegExp(req.query.query, "i");
    const from = Number(req.query.from);
    const limit = Number(req.query.limit);

    const albumsInfo = {
      count: await Album.find({ album: query }).countDocuments(),
      info: await Album.find({ album: query })
        .skip(from)
        .limit(limit)
        .populate("albumArt")
    };

    res.json(albumsInfo);
  }
);

//Sends artists metadata with from and limit
router.get(
  "/artists",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const query = new RegExp(req.query.query, "i");
    const from = Number(req.query.from);
    const limit = Number(req.query.limit);

    const artistsInfo = {
      count: await Artist.find({ artist: query }).countDocuments(),
      info: await Artist.find({ artist: query })
        .skip(from)
        .limit(limit)
        .populate("albumArt")
    };

    res.json(artistsInfo);
  }
);

//Sends songs metadata with from and limit
router.get(
  "/songs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const query = new RegExp(req.query.query, "i");
    const from = Number(req.query.from);
    const limit = Number(req.query.limit);

    const songsInfo = {
      count: await Song.find({ title: query }).countDocuments(),
      info: await Song.find({ title: query })
        .skip(from)
        .limit(limit)
        .populate("albumArt")
    };

    res.json(songsInfo);
  }
);

//Sends songs metadata for a given album
router.get(
  "/albums/:album",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const album = req.params.album;
    const songs = await Song.find({ album });
    res.json(songs);
  }
);

//Sends song metadata for a given song
router.get(
  "/songs/:title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const title = req.params.title;
    const song = await Song.find({ title });
    res.json(song);
  }
);

//Sends songs metadata for a given artist
router.get(
  "/artists/:artist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artist = req.params.artist;
    const songs = await Song.find({ artist });
    res.json(songs);
  }
);

module.exports = router;
