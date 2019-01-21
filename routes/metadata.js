const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

//Sends albums/artists/songs metadata with limit
router.get("/metadata", (req, res) => {
  const limit = Number(req.query.limit);

  let promises = [];

  let albumsInfo = null;
  let artistsInfo = null;
  let songsInfo = null;

  promises.push(
    Album.find({})
      .sort({ count: -1 })
      .limit(limit)
      .populate("albumArt")
      .then(albums => {
        albumsInfo = albums;
        //albumsInfo.sort((a, b) => b.count - a.count);
        //albumsInfo.splice(limit);
      })
  );

  promises.push(
    Artist.find({})
      .sort({ count: -1 })
      .limit(limit)
      .populate("albumArt")
      .then(artists => {
        artistsInfo = artists;
        //artistsInfo.sort((a, b) => b.count - a.count);
        //artistsInfo.splice(limit);
      })
  );

  promises.push(
    Song.find({})
      .sort({ duration: -1 })
      .limit(limit)
      .populate("albumArt")
      .then(songs => {
        songsInfo = songs;
        //songsInfo.sort((a, b) => b.duration - a.duration);
        //songsInfo.splice(limit);
      })
  );

  Promise.all(promises).then(() => {
    res.json({
      albumsInfo,
      artistsInfo,
      songsInfo
    });
  });
});

//Sends albums metadata with from and limit
router.get("/albums", (req, res) => {
  const from = Number(req.query.from);
  const limit = Number(req.query.limit);

  let promises = [];

  let albumsInfo = null;

  promises.push(
    Album.find({})
      .skip(from)
      .limit(limit)
      .populate("albumArt")
      .then(info => {
        albumsInfo = {
          count: 26,
          //info: info.slice(from, from + limit)
          info
        };
      })
  );

  Promise.all(promises).then(() => {
    res.json(albumsInfo);
  });
});

//Sends artists metadata with from and limit
router.get("/artists", (req, res) => {
  const from = Number(req.query.from);
  const limit = Number(req.query.limit);

  let promises = [];

  let artistsInfo = null;

  promises.push(
    Artist.find({})
      .skip(from)
      .limit(limit)
      .populate("albumArt")
      .then(info => {
        artistsInfo = {
          count: 1179,
          //info: info.slice(from, from + limit)
          info
        };
      })
  );

  Promise.all(promises).then(() => {
    res.json(artistsInfo);
  });
});

//Sends songs metadata with from and limit
router.get("/songs", (req, res) => {
  const from = Number(req.query.from);
  const limit = Number(req.query.limit);

  let promises = [];

  let songsInfo = null;

  promises.push(
    Song.find({})
      .skip(from)
      .limit(limit)
      .populate("albumArt")
      .then(info => {
        songsInfo = {
          count: 3551,
          //info: info.slice(from, from + limit)
          info
        };
      })
  );

  Promise.all(promises).then(() => {
    res.json(songsInfo);
  });
});

//Sends songs metadata for a given album
router.get("/albums/:album", (req, res) => {
  const album = req.params.album;
  Song.find({ album }).then(songs => {
    res.json(songs);
  });
});

//Sends song metadata for a given song
router.get("/songs/:title", (req, res) => {
  const title = req.params.title;
  Song.find({ title }).then(song => {
    res.json(song);
  });
});

//Sends songs metadata for a given artist
router.get("/artists/:artist", (req, res) => {
  const artist = req.params.artist;
  Song.find({ artist }).then(songs => {
    res.json(songs);
  });
});

module.exports = router;
