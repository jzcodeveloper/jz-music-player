const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const PlaylistsController = require("../controllers/PlaylistsController");

//Returns all playlists
router.get("/all", auth, (req, res) => {
  PlaylistsController.getAll(req, res);
});

//Creates a new playlist
router.post("/create", auth, (req, res) => {
  PlaylistsController.createPlaylist(req, res);
});

//Updates both the name and description of a given playlist
router.put("/edit/:playlistId", auth, (req, res) => {
  PlaylistsController.editPlaylist(req, res);
});

//Appends a given song to a given playlist
router.put("/add-songs/:playlistId/:itemId", auth, (req, res) => {
  PlaylistsController.addToPlaylist(req, res, "Song");
});

//Appends all songs from a given album to a given playlist
router.put("/add-albums/:playlistId/:itemId", auth, (req, res) => {
  PlaylistsController.addToPlaylist(req, res, "Album");
});

//Appends all songs from a given artist to a given playlist
router.put("/add-artists/:playlistId/:itemId", auth, (req, res) => {
  PlaylistsController.addToPlaylist(req, res, "Artist");
});

//Removes a song from a given playlist
router.delete("/remove-song/:playlistId/:songId", auth, (req, res) => {
  PlaylistsController.removeSong(req, res);
});

//Removes a playlist
router.delete("/remove/:playlistId", auth, (req, res) => {
  PlaylistsController.removePlaylist(req, res);
});

module.exports = router;
