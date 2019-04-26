const validatePlaylists = require("../validation/playlists");

//Returns all playlists
exports.getAll = async (req, res, Playlist) => {
  const userId = req.params.userId;
  const playlists = await Playlist.find({ user: userId }).populate({
    path: "songs",
    populate: { path: "albumArt" }
  });
  if (playlists) {
    res.json(playlists);
  } else {
    res.status(404).json("There are no playlists");
  }
};

//Returns a playlist by id
exports.getById = async (req, res, Playlist) => {
  const playlistId = req.params.playlistId;
  const playlist = await Playlist.findById(playlistId).populate("songs");
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).json("Playlist not found");
  }
};

//Creates a new playlist
exports.createPlaylist = async (req, res, Playlist) => {
  //Validating all the fields
  const { errors, isValid } = validatePlaylists(req.body);
  //If invalid...
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const playlist = await Playlist.findOne({
    name: req.body.name,
    user: req.body.user
  });
  if (playlist) {
    errors.name = "Playlist Name already exists";
    res.status(400).json(errors);
  } else {
    const newPlaylist = new Playlist({
      name: req.body.name,
      description: req.body.description,
      count: 0,
      duration: 0,
      songs: [],
      user: req.body.user
    });
    await newPlaylist.save();
    res.json(newPlaylist);
  }
};

//Updates both the name and description of a given playlist
exports.editPlaylist = async (req, res, Playlist) => {
  //Validating all the fields
  const { errors, isValid } = validatePlaylists(req.body);
  //If invalid...
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const playlistId = req.params.playlistId;
  const playlists = await Playlist.find({});
  const playlist = playlists.find(el => el._id.toString() === playlistId);
  if (playlist) {
    if (playlists.find(el => el.name === req.body.name)) {
      errors.name = "Playlist Name already exists";
      return res.status(400).json(errors);
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
  } else {
    res.status(404).json({ message: "Playlist not found" });
  }
};

//Appends a given song/album/artist to a given playlist
exports.addToPlaylist = async (req, res, Playlist, Model, type = "") => {
  const playlistId = req.params.playlistId;
  const itemId = req.params.itemId;
  const playlist = await Playlist.findById(playlistId);
  if (playlist) {
    const info =
      type === 'song'
        ? await Model.findById(itemId)
        : await Model.findById(itemId).populate("songs");
    if (info) {
      const updatedFields = {
        count: playlist.count,
        duration: playlist.duration,
        songs: [...playlist.songs]
      };

      if (type === "song") {
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
    } else {
      res.status(404).json({ message: "Info not found" });
    }
  } else {
    res.status(404).json({ message: "Playlist not found" });
  }
};

//Removes a song from a given playlist
exports.removeSong = async (req, res, Playlist, Song) => {
  const playlistId = req.params.playlistId;
  const songId = req.params.songId;
  const playlist = await Playlist.findById(playlistId);
  if (playlist) {
    const song = await Song.findById(songId);
    const updatedFields = {
      count: playlist.count - 1,
      duration: playlist.duration - song.duration,
      songs: [...playlist.songs]
    };
    const index = updatedFields.songs.findIndex(el => el.toString() === songId);
    if (index > -1) {
      updatedFields.songs.splice(index, 1);

      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        updatedFields,
        { new: true }
      ).populate({ path: "songs", populate: { path: "albumArt" } });
      res.json(updatedPlaylist);
    } else {
      res.status(404).json({ message: "Song not found in this Playlist" });
    }
  } else {
    res.status(404).json({ message: "Playlist not found" });
  }
};

//Removes a playlist
exports.removePlaylist = async (req, res, Playlist) => {
  const playlistId = req.params.playlistId;
  const playlist = await Playlist.findByIdAndRemove(playlistId);
  if (playlist) {
    res.json(playlist);
  } else {
    res.status(404).json({ message: "Playlist not found" });
  }
};
