const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Playlist = require("../models/Playlist");

const validatePlaylists = require("../validation/playlists");

//Returns all playlists
exports.getAll = async (req, res) => {
  try {
    const { id } = req.user;
    const playlists = await Playlist.find({ user: id }).populate({
      path: "songs",
      populate: { path: "albumArt" }
    });

    if (!playlists) {
      return res.status(404).json("There are no playlists");
    }

    res.json(playlists);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Returns a playlist by id
exports.getById = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await Playlist.findById(playlistId).populate("songs");

    if (!playlist) {
      return res.status(404).json("Playlist not found");
    }

    res.json(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Creates a new playlist
exports.createPlaylist = async (req, res) => {
  try {
    const { errors, isValid } = validatePlaylists(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const playlist = await Playlist.findOne({
      name: req.body.name,
      user: req.user.id
    });

    if (playlist) {
      errors.name = "Playlist Name already exists";
      return res.status(400).json(errors);
    }

    const newPlaylist = new Playlist({
      name: req.body.name,
      description: req.body.description,
      count: 0,
      duration: 0,
      songs: [],
      user: req.user.id
    });

    await newPlaylist.save();

    res.json(newPlaylist);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Updates both the name and description of a given playlist
exports.editPlaylist = async (req, res) => {
  try {
    const { errors, isValid } = validatePlaylists(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    const updatedFields = {
      name: req.body.name,
      description: req.body.description
    };

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      updatedFields,
      { new: true }
    ).populate({ path: "songs", populate: { path: "albumArt" } });

    res.json(updatedPlaylist);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Appends a given song/album/artist to a given playlist
exports.addToPlaylist = async (req, res, model) => {
  try {
    let Model = null;
    if (model === "Album") Model = Album;
    if (model === "Artist") Model = Artist;
    if (model === "Song") Model = Song;

    const { playlistId, itemId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    const info =
      model === "Song"
        ? await Model.findById(itemId)
        : await Model.findById(itemId).populate("songs");

    if (!info) {
      return res.status(404).json({ msg: "Info not found" });
    }

    const updatedFields = {
      count: playlist.count,
      duration: playlist.duration,
      songs: [...playlist.songs]
    };

    if (model === "Song") {
      if (
        !updatedFields.songs.find(el => el.toString() === info._id.toString())
      ) {
        updatedFields.count++;
        updatedFields.duration += info.duration;
        updatedFields.songs.push(info._id);
      }
    } else {
      info.songs.map(song => {
        if (
          !updatedFields.songs.find(el => el.toString() === song._id.toString())
        ) {
          updatedFields.count++;
          updatedFields.duration += song.duration;
          updatedFields.songs.push(song);
        }
      });
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      updatedFields,
      { new: true }
    ).populate({ path: "songs", populate: { path: "albumArt" } });

    res.json(updatedPlaylist);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Removes a song from a given playlist
exports.removeSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    const song = await Song.findById(songId);

    const updatedFields = {
      count: playlist.count - 1,
      duration: playlist.duration - song.duration,
      songs: [...playlist.songs]
    };

    const index = updatedFields.songs.findIndex(el => el.toString() === songId);

    if (index < 0) {
      return res.status(404).json({ msg: "Song not found in this Playlist" });
    }

    updatedFields.songs.splice(index, 1);

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      updatedFields,
      { new: true }
    ).populate({ path: "songs", populate: { path: "albumArt" } });

    res.json(updatedPlaylist);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//Removes a playlist
exports.removePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findByIdAndRemove(playlistId);

    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    res.json(playlist);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
