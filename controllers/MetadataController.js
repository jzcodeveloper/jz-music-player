const client = require("../redis");

const Song = require("../models/Song");
const Album = require("../models/Album");
const Artist = require("../models/Artist");
const Playlist = require("../models/Playlist");

//Sends albums/artists/songs metadata with limit
exports.sendTopMetadata = async (req, res) => {
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
};

//Sends all albums/artists/songs metadata with from, limit and query
exports.sendMetadata = async (req, res, findByProperty = "") => {
  let Model = null;
  if (findByProperty === "album") Model = Album;
  if (findByProperty === "artist") Model = Artist;
  if (findByProperty === "title") Model = Song;
  const query = new RegExp(req.query.query, "i");
  const from = Number(req.query.from);
  const limit = Number(req.query.limit);
  const fields = {};
  fields[findByProperty] = query;

  const info = {
    count: await Model.find(fields).countDocuments(),
    info: await Model.find(fields)
      .skip(from)
      .limit(limit)
      .populate("albumArt")
  };

  res.json(info);
};

//Sends metadata for a given album/artist/song/playlist
exports.sendAllMetadata = async (req, res, findByProperty = "") => {
  let Model = null;
  if (findByProperty === "album") Model = Album;
  if (findByProperty === "artist") Model = Artist;
  if (findByProperty === "title") Model = Song;
  if (findByProperty === "name") Model = Playlist;
  const param =
    req.params.album ||
    req.params.artist ||
    req.params.title ||
    req.params.name;
  const fields = {};

  //Check whether there is a key already in cache
  const result = await client.getAsync(`player/${param}`);
  if (result) {
    res.json(JSON.parse(result));
  } else {
    if (findByProperty === "title") {
      const [artist, title] = param.split(" - ");
      fields["artist"] = artist;
      fields["title"] = title;
      const info = await Model.find(fields).populate("albumArt");
      //Caching response
      await client.setexAsync(`player/${param}`, 3600, JSON.stringify(info));
      res.json(info);
    } else {
      fields[findByProperty] = param;
      const { songs } = await Model.findOne(fields).populate({
        path: "songs",
        populate: { path: "albumArt" }
      });
      //Caching response
      await client.setexAsync(`player/${param}`, 3600, JSON.stringify(songs));
      res.json(songs);
    }
  }
};

//Count documents for a given Model
exports.countDocuments = async (req, res, model) => {
  let Model = null;
  if (model === "Song") Model = Song;
  //Check whether there is a key already in cache
  const result = await client.getAsync(`count/${model}`);
  if (result) {
    console.log("redis: " + result);
    res.json(JSON.parse(result));
  } else {
    const count = await Model.find({}).countDocuments();
    //Caching response
    await client.setexAsync(`count/${model}`, 3600, JSON.stringify(count));
    res.json(count);
  }
};

//Deletes a song from the database using Artist + Song Title
exports.deleteSong = async (req, res) => {
  const _id = req.params.id;
  const deletedSong = await Song.findByIdAndRemove(_id);

  //Updates duration, count and the songs array of the Album model
  const album = await Album.findOne({ album: deletedSong.album });
  if (album) {
    const updatedFields = {
      duration: album.duration - deletedSong.duration,
      count: album.count - 1,
      songs: album.songs.filter(song => song !== deletedSong._id)
    };
    await Album.findOneAndUpdate(
      { album: deletedSong.album },
      { $set: updatedFields }
    );
  }

  //Updates duration, count and the songs array of the Artist model
  const artist = await Artist.findOne({ artist: deletedSong.artist });
  if (artist) {
    const updatedFields = {
      duration: artist.duration - deletedSong.duration,
      count: artist.count - 1,
      songs: artist.songs.filter(song => song !== deletedSong._id)
    };
    await Artist.findOneAndUpdate(
      { artist: deletedSong.artist },
      { $set: updatedFields }
    );
  }

  res.json(deletedSong);
};
