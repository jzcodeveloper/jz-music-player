const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

//Sends albums/artists/songs metadata with limit
router.get("/metadata", async (req, res) => {
  const limit = Number(req.query.limit);

  const albumsInfo = await Album.find({})
    .sort({ count: -1 })
    .limit(limit)
    .populate("albumArt");

  const artistsInfo = await Artist.find({})
    .sort({ count: -1 })
    .limit(limit)
    .populate("albumArt");

  const songsInfo = await Song.find({})
    .sort({ duration: -1 })
    .limit(limit)
    .populate("albumArt");

  res.json({
    albumsInfo,
    artistsInfo,
    songsInfo
  });
});

//Sends albums metadata with from and limit
router.get("/albums", async (req, res) => {
  const from = Number(req.query.from);
  const limit = Number(req.query.limit);

  const albumsInfo = {
    count: 26,
    info: await Album.find({})
      .skip(from)
      .limit(limit)
      .populate("albumArt")
  };

  res.json(albumsInfo);
});

//Sends artists metadata with from and limit
router.get("/artists", async (req, res) => {
  const from = Number(req.query.from);
  const limit = Number(req.query.limit);

  const artistsInfo = {
    count: 1179,
    info: await Artist.find({})
      .skip(from)
      .limit(limit)
      .populate("albumArt")
  };

  res.json(artistsInfo);
});

//Sends songs metadata with from and limit
router.get("/songs", async (req, res) => {
  const from = Number(req.query.from);
  const limit = Number(req.query.limit);

  const songsInfo = {
    count: 3551,
    info: await Song.find({})
      .skip(from)
      .limit(limit)
      .populate("albumArt")
  };

  res.json(songsInfo);
});

//Sends songs metadata for a given album
router.get("/albums/:album", async (req, res) => {
  const album = req.params.album;
  const songs = await Song.find({ album });
  res.json(songs);
});

//Sends song metadata for a given song
router.get("/songs/:title", async (req, res) => {
  const title = req.params.title;
  const song = await Song.find({ title });
  res.json(song);
});

//Sends songs metadata for a given artist
router.get("/artists/:artist", async (req, res) => {
  const artist = req.params.artist;
  const songs = await Song.find({ artist });
  res.json(songs);
});

module.exports = router;
